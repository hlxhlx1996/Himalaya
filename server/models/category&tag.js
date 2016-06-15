var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var CateSchema = new mongoose.Schema({
	text:{type:String,default:"👒"},
	posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
});
mongoose.model('Category', CateSchema);

var TagSchema = new mongoose.Schema({
	text:{type:String,default:"🎩"},
	posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
});
mongoose.model('Tag', TagSchema);
