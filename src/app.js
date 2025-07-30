let express = require('express');
let bodyparser = require('body-parser');
let db = require("../db.js");
let router=require('../src/routes/route.js')
require("dotenv").config();


let app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());
app.use('/', router);
const categoryRoutes = require('./routes/categoryRoute');
app.use('/', categoryRoutes);

module.exports=app;