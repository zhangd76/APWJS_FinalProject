let mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	_id: {
		type: String,
		required: [true, 'Please enter in your name'],
        min: 3,
		max: 100,
        unique: true
	},
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        min: 4,
        max: 100,
        unique: true
    },
	email:{
		type: String,
		required: [true, 'Please enter an email'],
        min: 3,
		max: 100,
        unique: true
	},
	
    },
{collections: 'users'}
);
const userModel=mongoose.model('User', userSchema)

module.exports = userCol;