const MongoClient = require('mongodb').MongoClient;
var getID = require('mongodb').ObjectID();
var url = "mongodb://127.0.0.1:27017/";

let mongoClient = MongoClient(url,{ useUnifiedTopology: true });
let myDB; 

var connect = async function(dbName){
    try{
	    await mongoClient.connect();
	    myDB=mongoClient.db(dbName);
	
	    if (!myDB) {
	        throw new Error("DB Connection Failed to start!");
	    }
	    else {
	    console.log(`Connected to ${dbName}`);
	    return myDB;
	    }
    } 
    catch(e) {
	console.log(e.message);
    }
}

//Call get("<name_of_your_DB"> to initialize the db connection
//after that you can can call get() to just get the connection anywhere
database.get = function(dbName){
    if (myDB){
	return myDB;
    } else {
	return connect(dbName);
    }
}

//call close in your apps when you want to close the DB connection
database.close = async function() {
    try{
	await mongoClient.close();
	return;
    } catch(e){
	console.log(e.message);
    }
 }
    
module.exports = database;
