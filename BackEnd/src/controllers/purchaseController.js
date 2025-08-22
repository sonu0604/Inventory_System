const purchaseModel = require("../models/purchaseModel");
const db=require("../../db.js")
const PDFDocument = require("pdfkit");

const generateInvoiceNo = (lastInvoice) => {
  const year = new Date().getFullYear();
  let newNumber = 1;

  if (lastInvoice) {
    // Extract last number part
    const parts = lastInvoice.split("-");
    const lastYear = parts[1];
    const lastNum = parseInt(parts[2]);

    if (lastYear == year) {
      newNumber = lastNum + 1;
    }
  }

  return `INV-${year}-${String(newNumber).padStart(5, "0")}`;
}

// ✅ Create a new purchase
// ✅ Create a new purchase
const createPurchase = (req, res) => {
  const { product_id, supplier_id, user_id, quantity, unit_price } = req.body;

  if (!product_id || !supplier_id || !user_id || !quantity || !unit_price) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Step 1: Get last invoice
  purchaseModel.getLastInvoiceNo((err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching last invoice", error: err });

    const lastInvoice = results.length > 0 ? results[0].invoice_no : null;
    const newInvoiceNo = generateInvoiceNo(lastInvoice);

    // Step 2: Create purchase entry
    const data = {
      invoice_no: newInvoiceNo,
      product_id,
      supplier_id,
      user_id,
      quantity,
      unit_price,
    };

    purchaseModel.createPurchase(data, (err, result) => {
      if (err) return res.status(500).json({ message: "Insert failed", error: err });

      // ✅ Step 3: Update product stock and price
      const sql = `
        UPDATE products 
        SET quantity_in_stock = quantity_in_stock + ?, 
            unit_price = ?
        WHERE product_id = ?
      `;

      db.query(sql, [quantity, unit_price, product_id], (err2) => {
        if (err2) return res.status(500).json({ message: "Failed to update product stock", error: err2 });

        res.status(201).json({
          message: "✅ Purchase created successfully & stock updated",
          purchase_id: result.insertId,
          invoice_no: newInvoiceNo,
        });
      });
    });
  });
};


// ✅ Get all purchases with product/supplier/user details
// Get all purchases with joins
const getAllPurchases = (req, res) => {
  purchaseModel.getAllPurchases((err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
};

// 🔍 Search Purchases
const searchPurchases = (req, res) => {
  const q = req.query.q || "";
  purchaseModel.searchPurchases(q, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
};

// ✏️ Update Purchase
const updatePurchase = (req, res) => {
  const id = req.params.id;
  const { quantity, unit_price } = req.body;

  purchaseModel.updatePurchase(id, { quantity, unit_price }, (err, result) => {
    if (err) {
      console.error("Update failed:", err);
      return res.status(500).json({ error: "Database error while updating purchase" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    res.json({ message: "Purchase updated successfully" });
  });
};

// ❌ Delete Purchase
const deletePurchase = (req, res) => {
  const id = req.params.id;

  purchaseModel.deletePurchase(id, (err, result) => {
    if (err) {
      console.error("Delete failed:", err);
      return res.status(500).json({ error: "Database error while deleting" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    res.json({ message: "Purchase deleted successfully" });
  });
};
// 📄 Generate Invoice PDF
const downloadInvoice = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT p.purchase_id, p.invoice_no, pr.name as product_name, s.name as supplier_name, u.username,
           p.quantity, p.unit_price, p.purchase_date 
    FROM purchases p
    JOIN products pr ON p.product_id = pr.product_id
    JOIN suppliers s ON p.supplier_id = s.supplier_id
    JOIN users u ON p.user_id = u.user_id
    WHERE p.purchase_id = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Invoice not found" });

    const purchase = results[0];
    const total = purchase.quantity * purchase.unit_price;

    // Create PDF
    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename=invoice_${purchase.invoice_no}.pdf`);
    doc.pipe(res);

    // Header
    doc.fontSize(20).text("Inventory Management System", { align: "center" });
    doc.moveDown();
    doc.fontSize(16).text(`Invoice #${purchase.invoice_no}`);
    doc.moveDown();

    // Purchase details
    doc.fontSize(12).text(`Purchase ID: ${purchase.purchase_id}`);
    doc.text(`Date: ${new Date(purchase.purchase_date).toLocaleDateString()}`);
    doc.text(`Supplier: ${purchase.supplier_name}`);
    doc.text(`Processed By: ${purchase.username}`);
    doc.moveDown();

    // Table
    doc.text("Product Details", { underline: true });
    doc.moveDown(0.5);
    doc.text(`Product: ${purchase.product_name}`);
    doc.text(`Quantity: ${purchase.quantity}`);
    doc.text(`Unit Price: ₹${purchase.unit_price}`);
    doc.text(`Total: ₹${total}`);
    doc.moveDown();

    // Footer
    doc.fontSize(10).text("Thank you for your business!", { align: "center" });

    doc.end();
  });
};

module.exports = {
  createPurchase,
  getAllPurchases,
  updatePurchase,
  deletePurchase,
  searchPurchases,
  generateInvoiceNo,
  downloadInvoice 
};
