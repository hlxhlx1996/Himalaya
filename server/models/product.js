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
	isBid:{type: Boolean, default:false},
	bidCustomerList:[{
		customer:{type: Schema.Types.ObjectId, ref:'User'},
		cname:String,
		price:Number,
		created_at: {type: Date, default: Date.now }
	}],
	status:String,
	max_lord:{type: Schema.Types.ObjectId, ref:'User'},
	max_lord_name:String,

	supplier_name:String,
	_supplier:{type: Schema.ObjectId, ref: 'User'},
	type_name:String,
	type:[{type: Schema.Types.ObjectId, ref: 'Category'}],
	rating:{type: Number, default:0},
	rate_count:{type: Number, default:0},

	created_at: {type: Date, default: Date.now }
});

mongoose.model('Product', ProductSchema);