let express = require('express');
let bodyparser = require('body-parser');
let db = require("../db.js");
let router=require('../src/routes/route.js')

require("dotenv").config();

let app = express();
const cors = require("cors");

app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());
app.use('/', router);
app.use("/api", require("./routes/route.js"));
const categoryRoutes = require("./routes/categoryRoute.js");
app.use("/api", categoryRoutes);

const productRoutes=require("./routes/productRoute.js")
app.use("/api",productRoutes);

const supplierRoutes = require("./routes/supplierRoute.js");
app.use("/api",supplierRoutes);

const customerRoutes = require('./routes/customerRoute.js');
app.use("/api", customerRoutes);

const purchaseRoutes = require('./routes/purchaseRoute.js');
app.use("/api", purchaseRoutes);

const salesRoutes = require('./routes/salesRoute.js');
app.use("/api", salesRoutes);

const overviewRoutes = require("./routes/overviewRoute.js");
// ✅ Mount the route
app.use("/api/dashboard", overviewRoutes);

const salesReportRoutes = require("./routes/salesReportRoute.js");
// Reports Menu
app.use("/api/reports/sales", salesReportRoutes);

const purchaseReportRoutes = require("./routes/purchaseReportRoute.js");
// Reports Menu
app.use("/api/reports/purchases", purchaseReportRoutes);


module.exports=app;