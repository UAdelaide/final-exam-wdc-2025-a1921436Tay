const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 8080;

let db;

async function start() {
    try {
        db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'DogWalkService'
        });

    } catch (error) {
        console.error('Failed to connect to database:', error.message);
    }
    }

start();

// Routes

app.get('/api/dogs', async (req, res) => {
    try {
        const [rows] = await db.execute(
            `SELECT d.name AS dog_name, d.size, u.username As owner_username
            FROM Dogs d
            JOIN Users u ON d.owner_id = u.user_id`
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.messsage });
    }
});

app.get('/api/walkrequests/open', async (req, res) => {
    try {
        const [rows] = await db.execute(
            `SELECT wr.request.id, d.name AS dog_name, wr.request_time,
            wr.duration_minutes, wr.location, u.username AS owner_username
            FROM WalkRequests wr
            JOIN Dogs d ON wr.dog_id = d.dog_id
            JOIN Users u ON d.owner_id = u.user_id
            WHERE wr.status`
        )
    }
})
app.get('/api/walkers/summary', async (req, res) => {
    try {
        const [rows] = await db.execute(
            `SELECT u.username AS walker_username,
            COUNT (r.rating_id) AS total_ratings,
            ROUND(AVG(r.rating), 1) AS avergae_rating,
            COUNT (DISTINCT wr.request_id) AS completed_walks
            FROM Users u
            LEFT JOIN WalkRatings r ON u:user_id = r.walker_id
            LEFT JOIN WalkRequests wr ON wr.status = 'completed' AND r.request_id = wr.request_id
            WHERE u.role = 'walker'
            GROUP BY u.user_id`
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.messsage });
    }
});

