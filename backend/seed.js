const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/portfolio',
});

const seedDatabase = async () => {
    try {
        await pool.connect();
        console.log('Connected to PostgreSQL');

        // Drop existing table and create new one
        await pool.query('DROP TABLE IF EXISTS projects;');
        await pool.query(`
            CREATE TABLE projects (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                "techStack" TEXT[] NOT NULL,
                "liveLink" VARCHAR(255),
                "codeLink" VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Sample data based on previous placeholders
        const projects = [
            {
                title: "Swaraj Silk (App & Website)",
                description: "Developed the full-stack mobile application and web platform for Swaraj Silk.",
                techStack: ["PostgreSQL", "Express.js", "React.js", "Node.js", "Flutter"],
                codeLink: "https://github.com/rajchakrawarty9999-sketch"
            },
            {
                title: "Kala Mandir (App & Website)",
                description: "Built the full-stack mobile application and web platform for Kala Mandir.",
                techStack: ["PostgreSQL", "Express.js", "React.js", "Node.js", "Flutter"],
                codeLink: "https://github.com/rajchakrawarty9999-sketch"
            },
            {
                title: "Soohagan Silk (App & Website)",
                description: "Developed the full-stack mobile application and web platform for Soohagan Silk.",
                techStack: ["PostgreSQL", "Express.js", "React.js", "Node.js", "React Native"],
                codeLink: "https://github.com/rajchakrawarty9999-sketch"
            }
        ];

        for (const project of projects) {
            await pool.query(
                'INSERT INTO projects (title, description, "techStack", "codeLink") VALUES ($1, $2, $3, $4)',
                [project.title, project.description, project.techStack, project.codeLink]
            );
        }

        console.log('Database seeded successfully');
    } catch (err) {
        console.error('PostgreSQL connection/seeding error:', err);
    } finally {
        await pool.end();
        process.exit();
    }
};

seedDatabase();
