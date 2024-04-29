const express = require('express');
const app = express();
var http = require("http");
var qString = require("querystring");
let dbManager = require('./dbManager');
var ObjectID = require('mongodb').ObjectId;
let mongoose = require('mongoose');
mongoose.set('bufferCommands', false);

let bp = require('body-parser');
let session = require('express-session');
let crypto = require('crypto');
const userCol = require("./models/userSchema");
//copy the function to here
function genHash(input){
    return Buffer.from(crypto.createHash('sha256').update(input).digest('base32')).toString('hex').toUpperCase();
}

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'));

app.listen(1234, async ()=> {
    //start and wait for the DB connection
    try{
		await mongoose.connect('mongodb://127.0.0.1:27017/chooseYourAdventure', {useNewUrlParser: true, useUnifiedTopology: true });
    } catch (e){
        console.log(e.message);
    }

    console.log("Server is running...");
});

function docifyUser(params){
    let doc = new userCol({_id: params._id, username: params.username, email: params.email, password: params.password });
    return doc;
}

function moveOn(postData){
    let proceed = true;
    postParams = qString.parse(postData);
    //handle empty data
    for (property in postParams){
	if (postParams[property].toString().trim() == ''){
	    proceed = false;
	}
    }

    return proceed;
}

var postParams;

app.use(session({
	secret:'shhhhh',
	saveUninitialized: false,
	resave: false
}));



app.get('/', function(req, res){
    res.render('index');
})

app.get('/login', function(req, res){
    if (req.session.user){
        res.redirect('/home');
    }else{
        res.render('login');
        console.log("Accessing login page");
    }
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

var postData;

app.post('/signup', express.urlencoded({extended:false}), async (req, res, next)=>{
    console.log(req.body.user); 
    if (req.body.uname.split(/[;:,-\s ]+/).length > 1) {
	res.render('signup', {msg: "Username must be one word"})
    }
	let hashPass = genHash(req.body.pword)
    let newUser = docifyUser({username: req.body.uname, password: hashPass, email: req.body.email})
    await newUser.save()
	res.redirect('login')
});

app.post('/login', express.urlencoded({extended:false}), async (req, res, next)=>{
	let untrusted= {user: req.body.uname, password: genHash(req.body.pword)};
	console.log(untrusted.password)
	try{
		let result = await userCol.findOne({username: req.body.uname});
		if (untrusted.password.toString().toUpperCase()==result.password.toString().toUpperCase()){
			let trusted={username: result.username.toString()};
            req.session.username = trusted;
			res.redirect('/home');
		} else{
			res.redirect('/login');
		}
	} catch (err){
		next(err)
	}
});
app.use('*', function(req, res){
    res.writeHead(404);
    res.end(`<h1> ERROR 404. ${req.url} NOT FOUND</h1><br><br>`);
});
app.use((err, req, res, next)=>{
	res.status(500).render('error', {message: err.message})
})