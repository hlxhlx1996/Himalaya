var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

//type?????????????
var ProductSchema = new mongoose.Schema({
	pname:{type: String, default:""},
	description: {type:String, default:"This product is fantastic......"},
	quantity: {type:Number ,default:0},
	bit_start_price:Number,
	price:Number,
	bit_end_time:Date,

	supplier_name:String,
	_supplier:{type: Schema.ObjectId, ref: 'User'},
	type:[{type: Schema.Types.ObjectId, ref: 'Category'}],

	created_at: {type: Date, default: Date.now }
});

mongoose.model('Product', ProductSchema);