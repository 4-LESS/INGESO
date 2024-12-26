const express = require('express');
const path = require('path');
const Database = require('better-sqlite3'); // SQLite client

const app = express();

// Connect to SQLite database
const db = new Database('./database.db');

// Create "inventory" table if it doesn't exist
db.prepare(`
    CREATE TABLE IF NOT EXISTS inventory (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        quantity INTEGER NOT NULL,
        category TEXT
    )
`).run();

// Insert initial products if the table is empty
const initialProducts = [
    { name: "Paracetamol 500mg", description: "Analgésico y antipirético", price: 10.5, quantity: 100, category: "Medicamentos" },
    { name: "Ibuprofeno 200mg", description: "Anti-inflamatorio", price: 15.0, quantity: 50, category: "Medicamentos" },
    { name: "Alcohol en gel 70%", description: "Desinfectante de manos", price: 25.0, quantity: 200, category: "Higiene" }
];

const productExists = db.prepare('SELECT COUNT(*) AS count FROM inventory').get().count === 0;

if (productExists) {
    const insertProduct = db.prepare(`
        INSERT INTO inventory (name, description, price, quantity, category)
        VALUES (?, ?, ?, ?, ?)
    `);

    const insertMany = db.transaction((products) => {
        for (const product of products) {
            insertProduct.run(product.name, product.description, product.price, product.quantity, product.category);
        }
    });

    insertMany(initialProducts);
    console.log("Productos de prueba insertados en la base de datos.");
}

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from the "build" directory
app.use(express.static(path.join(__dirname, 'build')));

// API Routes

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

// Insert a new product
app.post('/api/inventory', (req, res) => {
    const { name, description, price, quantity, category } = req.body;
    const result = db.prepare(`
        INSERT INTO inventory (name, description, price, quantity, category)
        VALUES (?, ?, ?, ?, ?)
    `).run(name, description, price, quantity, category);

    res.status(201).json({ success: true, id: result.lastInsertRowid });
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
