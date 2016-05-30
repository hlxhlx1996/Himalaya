var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
//only one schema for questions with associated answers to these questions
var UserSchema = new mongoose.Schema({
	username: String,
	email: {type: String,default:"⛄️"},
	password: String,
	url:String,
	created_at: {type: Date, default: Date.now },
	
	following_names:[{type: String,default:"⛄️"}],
	following:[{type: Schema.Types.ObjectId, ref: 'User'}],
	followed_names:[{type: String,default:"👰"}],
	followed:[{type: Schema.Types.ObjectId, ref: 'User'}],

	posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
});
mongoose.model('User', UserSchema);