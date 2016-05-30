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

// // just an example route, your routes may look different
// app.get('/posts/:id', function (req, res){
// // the popuate method is what grabs all of the comments using their IDs stored in the 
// // comment property array of the post document!
//     Post.findOne({_id: req.params.id})
//         .populate('comments')
//   .exec(function(err, post) {
//     res.render('post', {post: post});
//         });
// });
//  //  your routes will probably look different.
//  app.put('/posts/:id', function (req, res){
//     Post.findOne({_id: req.params.id}, function(err, post){
//         // data from form on the front end
//         var comment = new Comment(req.body);
//         //  set the reference like this:
//         comment._post = post._id;
//         post.comments.push(comment);
//         // now save both to the DB
//         comment.save(function(err){
//             post.save(function(err){
//         if(err) {
//                    console.log('Error');
//        } else {
//               res.redirect('/');
//               }
//             });
//         });
//     });
//  });