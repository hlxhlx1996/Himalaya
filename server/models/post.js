var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var PostSchema = new mongoose.Schema({
	_author:{type: Schema.ObjectId, ref: 'User'},
	author_name:{type:String,default:"🎅"},
	title:{type:String,default:"⌚️"},
	content:{type:String,default:"⛷🏂⛸🎿🏹"},

	_cate:{type: Schema.ObjectId, ref: 'Cate'},
	category:{type:String,default:"👒🍜🎼"},

	_tags:[{type: Schema.ObjectId, ref: 'Tag'}],
	tags:[{type:String,default:"🎬🎮🛠"}],
	created_at: { type: Date, default: Date.now },

	up:{type:Number,default:0},
	down:{type:Number,default:0},
	comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]

});
mongoose.model('Post', PostSchema);

var CommentSchema = new mongoose.Schema({
	_post: {type: Schema.ObjectId, ref: 'Post'},
	_author:{type: Schema.ObjectId, ref: 'User'},
	author_name:{type:String,default:"🎅"},
	support:{type:Boolean,default:true},
	text:{type:String,default:"🎮🎻🎺"},
	created_at: { type: Date, default: Date.now },
	likes:{type:Number,default:0}
});
mongoose.model('Comment', CommentSchema);

var NotiSchema = new mongoose.Schema({
	text:{type:String,default:"🎩"},
	_author: {type: Schema.Types.ObjectId, ref: 'User'},
	type:{type:String,default:"private"},
	about:{type:String,default:""},//new post or follow
	created_at: { type: Date, default: Date.now }
});
mongoose.model('Notification', NotiSchema);
