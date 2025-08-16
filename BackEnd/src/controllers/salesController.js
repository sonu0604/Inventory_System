const salesModel = require("../models/salesModel");

const createSales = (req, res) => {
    const { product_id, consumer_id, user_id, quantity, unit_price } = req.body;

    if (!product_id || !consumer_id || !user_id || !quantity || !unit_price) {
        return res.status(400).json({ message: "All fields are required" });
    }

    salesModel.createSale(req.body, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Database error" });
        }
        res.status(201).json({ message: "Sale created successfully", sale_id: result.insertId });
    });
};

const getAllSales = (req, res) => {
    salesModel.getAllSales((err, results) => {
        if (err) return res.status(500).json({ message: "Database error" });
        res.json(results);
    });
};

const getSaleById = (req, res) => {
    const { id } = req.params;
    salesModel.getSaleById(id, (err, results) => {
        if (err) return res.status(500).json({ message: "Database error" });
        if (results.length === 0) return res.status(404).json({ message: "Sale not found" });
        res.json(results[0]);
    });
};

const updateSale = (req, res) => {
    const { id } = req.params;
    const { product_id, consumer_id, user_id, quantity, unit_price } = req.body;

    if (!product_id || !consumer_id || !user_id || !quantity || !unit_price) {
        return res.status(400).json({ message: "All fields are required" });
    }

    salesModel.updateSale(id, req.body, (err, result) => {
        if (err) return res.status(500).json({ message: "Database error" });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Sale not found" });
        res.json({ message: "Sale updated successfully" });
    });
};

const deleteSale = (req, res) => {
    const { id } = req.params;
    salesModel.deleteSale(id, (err, result) => {
        if (err) return res.status(500).json({ message: "Database error" });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Sale not found" });
        res.json({ message: "Sale deleted successfully" });
    });
};

const searchSaleByInvoice = (req, res) => {
    const invoice = req.query.invoice;
    if (!invoice) return res.status(400).json({ message: "Invoice number required" });

    salesModel.searchSaleByInvoice(invoice, (err, results) => {
        if (err) return res.status(500).json({ message: "Database error" });
        if (results.length === 0) return res.status(404).json({ message: "No sales found" });
        res.json(results);
    });
};

module.exports = {
    createSales,
    getAllSales,
    getSaleById,
    updateSale,
    deleteSale,
    searchSaleByInvoice
};
