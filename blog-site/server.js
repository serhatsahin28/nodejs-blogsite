const express = require('express');
const session = require("express-session");
const app = express();
const path = require('path');
app.set('view engine', 'ejs');
const controller = require("./controller/controller");
const adminController = require("./controller/adminController");




app.set('views', path.join(__dirname, 'view'));
const router = express.Router();

const bodyParser = require('body-parser');
const { destroy } = require('./model/db');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));


app.get("/", controller.index);


app.get("/index.ejs", controller.index);



app.get('/about.ejs', controller.about);


app.get('/post.ejs', controller.post);



app.get('/contact.ejs', (req, res) => {

    res.render("main/contact");

});

app.post('/contact-form', controller.contact);



//admin yönlendirme kısımları

app.get('/admin', (req, res) => {
    res.render('admin/login');
});



app.post('/admin/control', adminController.logController);


app.get('/admin/logout', (req, res) => {

    req.session = "";

    res.redirect('/admin');

});






app.get('/home', adminController.home);




app.get('/homee', (req, res) => {


    res.render('./admin/home');

});


app.get('/about', adminController.about);







app.get('/home/edit', adminController.homeEdit);



app.get('/home-updated', adminController.homeUpdated);

app.get('/home-add', (req, res) => {


    res.render('admin/homeAdd');

});


app.get('/homeAdd', adminController.homeAdd);
app.get('/homeDelete', adminController.homeDelete);


app.get('/about/edit', (err, res) => {

    res.render("./admin/about");

});


app.get("/aboutEdit", adminController.aboutEdit);

app.post('/about-updated', adminController.aboutUpdate);



const port = 3000;
app.listen(port, () => {
    console.log(`Uygulama http://localhost:${port} adresinde çalışıyor`);
});


