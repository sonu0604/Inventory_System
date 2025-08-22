const salesModel = require("../models/salesModel");
const db=require("../../db.js")
const PDFDocument = require("pdfkit");
// const createSales = (req, res) => {
//     const { product_id, consumer_id, user_id, quantity, unit_price } = req.body;

//     if (!product_id || !consumer_id || !user_id || !quantity || !unit_price) {
//         return res.status(400).json({ message: "All fields are required" });
//     }

//     salesModel.createSale(req.body, (err, result) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ message: "Database error" });
//         }
//         res.status(201).json({ message: "Sale created successfully", sale_id: result.insertId });
//     });
// };

// GET /api/sales/products  -> id, name, unit_price, availableToSell
const listProductsWithAvailability = (req, res) => {
  salesModel.getProductsForSale((err, rows) => {
    if (err) return res.status(500).json({ error: "Database error" });

    const mapped = rows.map((p) => {
      const available = Math.max(0, (p.quantity_in_stock || 0) - (p.minQty || 0));
      return {
        product_id: p.product_id,
        name: p.name,
        unit_price: Number(p.unit_price),
        quantity_in_stock: Number(p.quantity_in_stock || 0),
        minQty: Number(p.minQty || 0),
        available, // available to sell
      };
    });

    res.json(mapped);
  });
};

// GET /api/sales/consumers -> id, name
const listConsumers = (req, res) => {
  salesModel.getConsumers((err, rows) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(rows);
  });
};

// POST /api/sales
// expects: { product_name, consumer_name, user_id, quantity, unit_price }
const createSale = (req, res) => {
  const { product_name, consumer_name, user_id, quantity, unit_price } = req.body;

  if (!product_name || !consumer_name || !user_id || !quantity || !unit_price) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // 1) Get product by name
  salesModel.getProductByName(product_name, (err1, product) => {
    if (err1) return res.status(500).json({ error: "Database error" });
    if (!product) return res.status(404).json({ error: "Product not found" });

    const available = Number(product.quantity_in_stock || 0) - Number(product.minQty || 0);
    if (Number(quantity) > available) {
      return res.status(400).json({
        error: `Insufficient stock. Available to sell: ${Math.max(0, available)}`,
      });
    }

    // 2) Get consumer by name
    salesModel.getConsumerByName(consumer_name, (err2, consumer) => {
      if (err2) return res.status(500).json({ error: "Database error" });
      if (!consumer) return res.status(404).json({ error: "Consumer not found" });

      // 3) Generate invoice
      salesModel.generateInvoiceNo((err3, invoice_no) => {
        if (err3) return res.status(500).json({ error: "Failed to generate invoice" });

        // 4) Insert sale
        salesModel.createSale(
          {
            invoice_no,
            product_id: product.product_id,
            consumer_id: consumer.consumer_id,
            user_id,
            quantity: Number(quantity),
            unit_price: Number(unit_price),
            
          },
          (err4, result) => {
            console.log("📝 Attempting to create sale:", {
  invoice_no,
  product_id: product.product_id,
  consumer_id: consumer.consumer_id,
  user_id: Number(user_id),
  quantity: Number(quantity),
  unit_price: Number(unit_price),
});
            if (err4) return res.status(500).json({ error: "Failed to create sale" });

            // 5) Decrement stock
            salesModel.decrementProductStock(product.product_id, Number(quantity), (err5) => {
              if (err5) return res.status(500).json({ error: "Failed to update stock" });
              res.status(201).json({
                message: "Sale created successfully",
                sale_id: result.insertId,
                invoice_no,
              });
            });
          }
        );
      });
    });
  });
};


// const getAllSales = (req, res) => {
//     salesModel.getAllSales((err, results) => {
//         if (err) return res.status(500).json({ message: "Database error" });
//         res.json(results);
//     });
// };

// const getSaleById = (req, res) => {
//     const { id } = req.params;
//     salesModel.getSaleById(id, (err, results) => {
//         if (err) return res.status(500).json({ message: "Database error" });
//         if (results.length === 0) return res.status(404).json({ message: "Sale not found" });
//         res.json(results[0]);
//     });
// };

// const updateSale = (req, res) => {
//     const { id } = req.params;
//     const { product_id, consumer_id, user_id, quantity, unit_price } = req.body;

//     if (!product_id || !consumer_id || !user_id || !quantity || !unit_price) {
//         return res.status(400).json({ message: "All fields are required" });
//     }

//     salesModel.updateSale(id, req.body, (err, result) => {
//         if (err) return res.status(500).json({ message: "Database error" });
//         if (result.affectedRows === 0) return res.status(404).json({ message: "Sale not found" });
//         res.json({ message: "Sale updated successfully" });
//     });
// };

// const deleteSale = (req, res) => {
//     const { id } = req.params;
//     salesModel.deleteSale(id, (err, result) => {
//         if (err) return res.status(500).json({ message: "Database error" });
//         if (result.affectedRows === 0) return res.status(404).json({ message: "Sale not found" });
//         res.json({ message: "Sale deleted successfully" });
//     });
// };

// const searchSaleByInvoice = (req, res) => {
//     const invoice = req.query.invoice;
//     if (!invoice) return res.status(400).json({ message: "Invoice number required" });

//     salesModel.searchSaleByInvoice(invoice, (err, results) => {
//         if (err) return res.status(500).json({ message: "Database error" });
//         if (results.length === 0) return res.status(404).json({ message: "No sales found" });
//         res.json(results);
//     });
// };

const getAllSales = (req, res) => {
  salesModel.getAllSales((err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
};

// --- Search Sales ---
const searchSales = (req, res) => {
  const q = req.query.q || "";
  salesModel.searchSales(q, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
};

// --- Update Sale + Adjust Stock ---
const updateSale = (req, res) => {
  const id = req.params.id;
  const { quantity, unit_price } = req.body;

  salesModel.updateSale(id, { quantity, unit_price }, (err, result) => {
    if (err) {
      console.error("Update failed:", err);
      return res.status(500).json({ error: "Database error while updating sale" });
    }
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Sale not found" });

    res.json({ message: "Sale updated successfully" });
  });
};

// --- Delete Sale + Adjust Stock ---
const deleteSale = (req, res) => {
  const id = req.params.id;
  salesModel.deleteSale(id, (err, result) => {
    if (err) {
      console.error("Delete failed:", err);
      return res.status(500).json({ error: "Database error while deleting sale" });
    }
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Sale not found" });

    res.json({ message: "Sale deleted successfully" });
  });
};

// --- Download Invoice PDF ---
const downloadInvoice = (req, res) => {
  const { id } = req.params;
  salesModel.getSaleById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ message: "Invoice not found" });

    const sale = results[0];
    const total = sale.quantity * sale.unit_price;

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename=invoice_${sale.invoice_no}.pdf`);
    doc.pipe(res);

    doc.fontSize(20).text("Inventory Management System", { align: "center" });
    doc.moveDown();
    doc.fontSize(16).text(`Invoice #${sale.invoice_no}`);
    doc.moveDown();

    doc.fontSize(12).text(`Sale ID: ${sale.sale_id}`);
    doc.text(`Date: ${new Date(sale.sale_date).toLocaleDateString()}`);
    doc.text(`Customer: ${sale.consumer_name}`);
    doc.text(`Processed By: ${sale.username}`);
    doc.moveDown();

    doc.text("Product Details", { underline: true });
    doc.moveDown(0.5);
    doc.text(`Product: ${sale.product_name}`);
    doc.text(`Quantity: ${sale.quantity}`);
    doc.text(`Unit Price: ₹${sale.unit_price}`);
    doc.text(`Total: ₹${total}`);
    doc.moveDown();

    doc.fontSize(10).text("Thank you for your business!", { align: "center" });
    doc.end();
  });
};

const downloadAllSalesPDF = (req, res) => {
  db.query(
    `SELECT s.sale_id, p.name AS product_name, c.name AS consumer_name, 
            s.quantity, s.unit_price, s.sale_date
     FROM sales s
     JOIN products p ON s.product_id = p.product_id
     JOIN consumers c ON s.consumer_id = c.consumer_id
     ORDER BY s.sale_date DESC`,
    (err, rows) => {
      if (err) {
        console.error("DB error:", err);
        return res.status(500).json({ message: "Database query failed" });
      }

      try {
        const doc = new PDFDocument({ margin: 40, size: "A4" });
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=sales_report.pdf"
        );
        doc.pipe(res);

        // Title
        doc.fontSize(18).fillColor("#000").text("Sales Report", {
          align: "center",
        });
        doc.moveDown(2);

        // Define column positions
        const tableTop = doc.y;
        const colX = {
          id: 40,
          product: 100,
          consumer: 220,
          qty: 360,
          price: 420,
          date: 500,
        };

        // Header row
        doc.fontSize(12).fillColor("black").text("Sale ID", colX.id, tableTop);
        doc.text("Product", colX.product, tableTop);
        doc.text("Consumer", colX.consumer, tableTop);
        doc.text("Qty", colX.qty, tableTop, { width: 40, align: "right" });
        doc.text("Price", colX.price, tableTop, { width: 60, align: "right" });
        doc.text("Date", colX.date, tableTop);

        // Line under header
        doc.moveTo(40, tableTop + 15).lineTo(560, tableTop + 15).stroke();

        // Data rows
        let y = tableTop + 25;
        rows.forEach((row) => {
          const unitPrice = parseFloat(row.unit_price) || 0; // ✅ safe conversion
          const saleDate = row.sale_date
            ? new Date(row.sale_date).toLocaleDateString("en-GB")
            : "";

          doc.fontSize(10);
          doc.text(row.sale_id.toString(), colX.id, y);
          doc.text(row.product_name, colX.product, y, { width: 100 });
          doc.text(row.consumer_name, colX.consumer, y, { width: 120 });
          doc.text(row.quantity.toString(), colX.qty, y, {
            width: 40,
            align: "right",
          });
          doc.text(unitPrice.toFixed(2), colX.price, y, {
            width: 60,
            align: "right",
          });
          doc.text(saleDate, colX.date, y);

          y += 20; // move to next row
        });

        doc.end();
      } catch (pdfErr) {
        console.error("PDF error:", pdfErr);
        if (!res.headersSent) {
          res.status(500).json({ message: "Failed to generate sales PDF" });
        }
      }
    }
  );
};
module.exports = {
  //  createSales,
    // getAllSales,
    // getSaleById,
    // updateSale,
    // deleteSale,
    // searchSaleByInvoice,
    listProductsWithAvailability,
    listConsumers,
    createSale,
    getAllSales,
    searchSales,
    updateSale,
    deleteSale,
    downloadInvoice,
    downloadAllSalesPDF
};
