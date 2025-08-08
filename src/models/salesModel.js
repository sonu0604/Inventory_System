// models/salesModel.js
const db = require("../../db");

// Create Sale
const createSale = (data, callback) => {
    const sql = `
        INSERT INTO sales (product_id, consumer_id, user_id, quantity, unit_price)
        VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
        data.product_id,
        data.consumer_id,
        data.user_id,
        data.quantity,
        data.unit_price
    ];
    db.query(sql, values, callback);
};

// Get all sales
const getAllSales = (callback) => {
    db.query("SELECT * FROM sales", callback);
};

// Get sale by ID
const getSaleById = (id, callback) => {
    db.query("SELECT * FROM sales WHERE sale_id = ?", [id], callback);
};

// Update sale
const updateSale = (id, data, callback) => {
    const sql = `
        UPDATE sales
        SET product_id = ?, consumer_id = ?, user_id = ?, quantity = ?, unit_price = ?
        WHERE sale_id = ?
    `;
    const values = [
        data.product_id,
        data.consumer_id,
        data.user_id,
        data.quantity,
        data.unit_price,
        id
    ];
    db.query(sql, values, callback);
};

// Delete sale
const deleteSale = (id, callback) => {
    db.query("DELETE FROM sales WHERE sale_id = ?", [id], callback);
};

// Search by invoiceNo → here we adapt to search by sale_id
const searchSaleByInvoice = (invoice, callback) => {
    db.query("SELECT * FROM sales WHERE sale_id = ?", [invoice], callback);
};

module.exports = {
    createSale,
    getAllSales,
    getSaleById,
    updateSale,
    deleteSale,
    searchSaleByInvoice
};
