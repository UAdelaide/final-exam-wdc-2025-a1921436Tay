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
        console.log('Connecting to MySQL');

        //testing port
        app.listen(port, () => {
            console.log(`Server running at port ${port} `);
        });

    } catch (error) {
        console.error('Failed to connect to database:', error.message);
    }
    }

    