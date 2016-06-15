var mongoose = require('mongoose');
var User = mongoose.model('User');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var Category = mongoose.model('Category');
var Tag = mongoose.model('Tag');
var Notification = mongoose.model('Notification');

module.exports = (function() {
	return{
	get_global_tags: function(req, res){
		Tag.find({}, function(err, results){
			if(err){
				res.send(err);
			} else{
				res.json(results);
			}
		})
	},
	get_global_cates: function(req, res){
		Category.find({}, function(err, results){
			if(err){
				res.send(err);
			} else{
				res.json(results);
			}
		})
	},
	get_global_posts: function(req, res){
		Post.find({}, function(err, results){
			if(err){
				res.send(err);
			} else{
				res.json(results);
			}
		})
	},
	get_global_users: function(req, res){
		User.find({_id:{$nin:[req.params.id]}}, function(err, results){
			if(err){
				res.send(err);
			} else{
				res.json(results);
			}
		})
	}

}
})();
