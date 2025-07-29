let express = require('express');
let bodyparser = require('body-parser');
let db = require("../db.js");

require("dotenv").config();

let app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());

module.exports=app;