var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
//only one schema for questions with associated answers to these questions
var CardSchema = new mongoose.Schema({
	card_number: {type: Number, default: 0000000000000000},
	exp_date:{type: Date, default: Date.now},
	name: {type: String,default:"MDZZ"},
	cvv:{type: Number, default: 000},
	annual_income: Number,
	
	_user:{type: Schema.ObjectId, ref: 'User'},
	billing_addr:{type: Schema.Types.ObjectId, ref:'Address'},

	created_at: {type: Date, default: Date.now }
});
mongoose.model('Card', CardSchema);