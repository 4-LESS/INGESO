const express = require('express');
const path = require('path');
const Database = require('better-sqlite3'); // SQLite client

const app = express();

// Connect to SQLite database
const db = new Database('./database.db');

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from the "build" directory
app.use(express.static(path.join(__dirname, 'build')));

// Get all products
app.get('/api/inventory', (req, res) => {
    const inventory = db.prepare('SELECT * FROM inventory').all();
    res.json(inventory);
});

// Get a product by ID
app.get('/api/inventory/:id', (req, res) => {
    const product = db.prepare('SELECT * FROM inventory WHERE id = ?').get(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: "Producto no encontrado" });
    }
});

// Catch-all route to serve React app for non-API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
