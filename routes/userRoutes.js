var express = require("express");
var router = express.Router();
let userModel = require('../models/userSchema');

router.get('/:userID', async (req, res)=> {
    try{
	    let user=await userModel.findOne({_id: req.params.userID});
	    let current;

	    
    catch (err) {
	res.status(500).render('error', {message: err.message})
    }
});

module.exports = router;