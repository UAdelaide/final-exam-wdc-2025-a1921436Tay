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
        
    }
});