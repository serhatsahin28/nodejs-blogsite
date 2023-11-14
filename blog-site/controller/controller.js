const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const mysql = require('mysql');
const db = require('../model/db');


const about = (req, res) => {

    db.query("SELECT * FROM about", (err, result) => {
        if (err) {
            throw err;
        }
        res.render('./main/about', { aa: result });
    });

};


const index = (req, res) => {
    db.query("SELECT * FROM anasayfa", (err, result) => {

        if (err) {
            throw err;
        }

        res.render("./main/index", { bb: result });

    });


};


const post = (req, res) => {

    const id = req.query.id;
    db.query("SELECT * FROM anasayfa WHERE id=?", [id], (err, result) => {
        if (err) {
            throw err;
        }

        res.render("./main/post", { cc: result });
    });


};


const contact = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const mesaj = req.body.message;

    db.query("INSERT INTO contact (name,email,message) VALUES (?,?,?)", [name, email, mesaj], (err, result) => {

        if (err) {
            throw err;
        }

        res.render("./main/contact");
        


    });


};





module.exports = {
    about, index, post, contact
};