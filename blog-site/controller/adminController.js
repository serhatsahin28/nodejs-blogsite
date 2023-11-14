const express = require('express');
const session = require("express-session");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const mysql = require('mysql');
const Admindb = require('../model/adminModel');






// Session ayarları
app.use(session({
    secret: 'your-secret-key', // Güvenli bir anahtar
    resave: false,
    saveUninitialized: true
}));


const logController = (req, res) => {

    const name = req.body.name;
    const password = req.body.password;

    Admindb.query("SELECT * FROM admin", (err, result) => {

        if (result[0].name == name && result[0].password == password) {

            session.user = { name, password };
            Admindb.query("SELECT * FROM anasayfa", (err, result) => {
                var homee = result;
                res.render("admin/home",{ username: name, password: password, homee: homee });

            });

        }
        else {
            res.redirect('admin/login');
        }


    });

};




const home = (req, res) => {

    Admindb.query("SELECT * FROM anasayfa", (err, result) => {

        res.render('admin/home', { homee: result });


    });


};




const homeEdit = (req, res) => {
    const id = req.query.id;
    Admindb.query("SELECT * FROM anasayfa WHERE id=?", [id], (err, result) => {

        res.render('./admin/homeEdit', { home: result });

    });

};




const homeUpdated = (req, res) => {

    const id = req.query.inputId;
    const title = req.query.inputTitle;
    const subtitle = req.query.inputSubtitle;
    const text = req.query.inputText;
    const title2 = req.query.inputTitle2;
    const text2 = req.query.inputText2;
    const title3 = req.query.inputTitle3;
    const text3 = req.query.inputText3;



    Admindb.query("UPDATE anasayfa SET title=?,subtitle=?,text=?,title2=?,text2=?,title3=?,text3=? WHERE id=?", [title, subtitle, text, title2, text2, title3, text3, id], (err, result) => {

        res.redirect('/home');

    });


};



const homeAdd = (req, res) => {

    const id = req.query.inputId;
    const title = req.query.inputTitle;
    const subtitle = req.query.inputSubtitle;
    const text = req.query.inputText;
    const title2 = req.query.inputTitle2;
    const text2 = req.query.inputText2;
    const title3 = req.query.inputTitle3;
    const text3 = req.query.inputText3;



    Admindb.query("INSERT INTO anasayfa  (title,subtitle,text,title2,text2,title3,text3) VALUES (?,?,?,?,?,?,?)", [title, subtitle, text, title2, text2, title3, text3, id], (err, result) => {

        res.redirect('/home');

    });


};



const homeDelete = (req, res) => {
    const id = req.query.id;
    Admindb.query("DELETE FROM anasayfa WHERE id=?", [id], (err, result) => {



        res.redirect("/home");
    });


};


const about = (req, res) => {

    Admindb.query("SELECT * FROM about", (err, result) => {
        res.render("./admin/about", { about: result });

    });

};





const aboutEdit = (req, res) => {
    Admindb.query("SELECT * FROM about ", (err, result) => {

        res.render('./admin/aboutEdit', { about: result });

    });

};





const aboutUpdate = (req, res) => {
    const title = req.body.inputTitle;
    const subtitle = req.body.inputSubtitle;
    const text = req.body.inputText;
    Admindb.query("UPDATE about SET title=?,subtitle=?,about=? WHERE Id=1", [title, subtitle, text],
        (err, result) => {


            if (err) {

                throw err;
            }
            res.redirect("/about");


        });


};






module.exports = {
    logController, home, homeEdit, homeUpdated, homeAdd, homeDelete, about, aboutUpdate, aboutEdit

}