var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var CouponSchema = new mongoose.Schema({
	exp_date:Date,
	discount:Number,

	created_at: {type: Date, default: Date.now }
});
mongoose.model('Coupon', CouponSchema);