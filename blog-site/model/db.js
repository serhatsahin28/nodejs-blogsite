const mysql = require("mysql");
const express = require("express");
const app = express();


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "blog"
});



db.connect((err)=> {
    if (err) {

        console.log("error");
    }

    console.log("true");
});


module.exports=db;