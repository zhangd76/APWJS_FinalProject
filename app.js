const express = require('express');
const app = express();

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', function(req, res){
    res.render('index');
})

app.get('/login', function(req, res){
    console.log("Accessing login page");
    res.render('login');
})

app.get('/register', function(req, res){
    console.log("Accessing register page");
    res.render('register');
})

app.get('/home', function(req, res){
    console.log("Accessing home page");
    res.render('home');
})

app.get('/game', function(req, res){
    console.log("Accessing game page");
    res.render('game');
})

app.listen(1234, () => {
    console.log("Server is running on 1234");
})

