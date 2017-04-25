var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var AddressSchema = new mongoose.Schema({
	zip:Number,
	city:String,
	state:String
});
mongoose.model('Address', AddressSchema);