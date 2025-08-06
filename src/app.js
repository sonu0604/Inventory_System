let express = require('express');
let bodyparser = require('body-parser');
let db = require("../db.js");
let router=require('../src/routes/route.js')

require("dotenv").config();

let app = express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());
app.use('/', router);
const categoryRoutes = require("./routes/categoryRoute.js");
app.use("/api", categoryRoutes);

const productRoutes=require("./routes/productRoute.js")
app.use("/api",productRoutes);

const supplierRoutes = require("./routes/supplierRoute.js");
app.use("/api",supplierRoutes);

const customerRoutes = require('./routes/customerRoute.js');
app.use("/api", customerRoutes);


module.exports=app;