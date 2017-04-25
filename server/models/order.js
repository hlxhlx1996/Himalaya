var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var OrderSchema = new mongoose.Schema({
	status:{type:String, enum: ['placed','paid', 'delivered','complete'],default:'placed'},

	customer:{type: Schema.Types.ObjectId, ref:'User'},
	cname:String,
	products_info:[{
		supplier:{type: Schema.Types.ObjectId, ref:'User'},
		sname:String,
		product:{type: Schema.Types.ObjectId, ref:'Product'},
		pname:String,
		price:Number,
		quantity:Number
	}],
	coupon:{type: Schema.Types.ObjectId, ref:'Coupon'},
	total_price:Number,
	created_at: {type: Date, default: Date.now }
});
mongoose.model('Order', OrderSchema);

