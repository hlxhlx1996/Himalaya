var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
//only one schema for questions with associated answers to these questions
var UserSchema = new mongoose.Schema({
	username: String,
	account: {type: String,default:"⛄️"},//email
	password: String,
	age:Number,
	annual_income: Number,
	phone: {type: Number, default: 0000000000},
	type: {type:Number,default: 0}, //Customer = 0 | Supplier =1 

	created_at: {type: Date, default: Date.now },

	card_number: {type: Number, default: 0000000000000000},
	exp_date_m:{type: Number, default: 0},
	exp_date_y:{type: Number, default: 0},
	name: {type: String,default:"MDZZ"},
	cvv:{type: Number, default: 000},

	street:String,
	zip:Number,
	city:String,
	state:String,

	card: [{type: Schema.Types.ObjectId, ref: 'Card'}],
	address:{type: Schema.Types.ObjectId, ref:'Address'},
	products :[{type: Schema.Types.ObjectId, ref: 'Product'}],
	sellings:[{type: Schema.Types.ObjectId, ref: 'Order'}],
	orderings:[{type: Schema.Types.ObjectId, ref: 'Order'}],
	bids:[{type: Schema.Types.ObjectId, ref: 'Product'}]

});
mongoose.model('User', UserSchema);