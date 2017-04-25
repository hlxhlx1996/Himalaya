var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
//only one schema for questions with associated answers to these questions
var CategorySchema = new mongoose.Schema({
	category:String
});
mongoose.model('Category', CategorySchema);