var mongoose = require('mongoose');
var User = mongoose.model('User');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var Category = mongoose.model('Category');
var Tag = mongoose.model('Tag');

module.exports = (function() {
	return{
	// <----------------| BEGIN || POSTS |------------------------->	
	add_post: function(req, res){
		console.log("add_post in users.js",req.service);
		User.findOne({_id: req.user_id }, function(err, user){
			console.log(user.username," username");
			var cateInfo={
				text:req.cate
			}
			var cate = new Category(cateInfo);
			var tag={
				text:req.tag
			}
			var tag = new Tag(tag);
			var postInfo = {
				_author:req.user_id,
				author_name:req.user_name,
				title: req.title,
				content: req.content,
				category:req.cate,
				_cate:cate._id
			};
			var post = new Post(postInfo);
			post._tags.push(tag);
			post.tags.push(req.tag);
			tag.posts.push(post);
			cate.posts.push(post);
			console.log("post id ",post._id);

			user.posts.push(post);
		        // now save both to the DB
		        cate.save(function(err){
		        	tag.save(function(err){
		        		post.save(function(err){
		        			user.save(function(err){
		        				if(err) {
		        					console.log('Error');
		        				} else {
		        					res.redirect('/');
		        				}
		        			});
		        		});
		        	});
		        });
		    });
	},
	get_posts: function(req, res){
		// just an example route, your routes may look different
		// the popuate method is what grabs all of the comments using their IDs stored in the 
		// comment property array of the post document!
		User.findOne({_id: req.params.id})
		.populate('posts')
		.exec(function(err, user) {
			if(err){
				res.send(err);
			} else {
				res.json(user);
			}
		});
	},
	getPostDetail: function(req, res){
		// just an example route, your routes may look different
		// the popuate method is what grabs all of the comments using their IDs stored in the 
		// comment property array of the post document!
		Post.findOne({_id: req.params.id})
		.populate('comments')
		.exec(function(err, user) {
			if(err){
				res.send(err);
			} else {
				res.json(user);
			}
		});
	},
	up: function(req, res){
		console.log("update in users.js",req.post_id);
		if (req.support==true) {
			Post.update({_id: req.post_id }, {up:++req.currentSupport},function(err, status){
				console.log("up up");
				if(err) {
					res.send(err);
				} 
				else {
					res.json(status);
				}
			});
		}else{
			Post.update({_id: req.post_id }, {down:++req.currentSupport},function(err, status){
				console.log("down down");
				if(err) {
					res.send(err);
				} 
				else {
					res.json(status);
				}
			});
		}

	},
	// <----------------| END || POSTS |------------------------->
	// <----------------| BEGIN || COMMENTS |------------------------->	
	add_comment: function(req, res){
		console.log("add_comment in users.js",req.user_name);
		Post.findOne({_id: req.post_id },function(err, post){
			var comInfo = {
				_post:req.post_id,
				_author:req.user_id ,
				author_name:req.user_name,
				support:req.support,
				text: req.text
			};
			var comment = new Comment(comInfo);
			post.comments.push(comment);
		        // now save both to the DB
		        comment.save(function(err){
		        	post.save(function(err){
		        		if(err) {
		        			console.log('Error');
		        		} else {
		        			res.redirect('/');
		        		}
		        	});
		        });
		    });
	},
	get_comments: function(req, res){
		// just an example route, your routes may look different
		// the popuate method is what grabs all of the comments using their IDs stored in the 
		// comment property array of the post document!
		Post.findOne({_id: req.params.id})
		.populate('comments')
		.exec(function(err, user) {
			if(err){
				res.send(err);
			} else {
				res.json(user);
			}
		});
	},
	likeComment: function(req, res){
		console.log("like com in users.js",req.comment_id,req.comment_likes);
		Comment.update({_id: req.comment_id }, {likes:++req.comment_likes},function(err, status){
			if(err) {
				res.send(err);
			} 
			else {
				res.json(status);
			}
		});
	},
	// <----------------| END || COMMENTS |------------------------->
	getUserDetail: function(req, res){
		User.findOne({ _id : req.params.id }, function(err, results){
			if(err){
				res.send(err);
			} else {
				// console.log(results);
				res.json(results);
			}
		});
	},
	follow: function(req, res){
		// console.log("follow in users.js",req);
			User.findOne({_id: req.user_id },function(err, user){//update current user
				console.log("user info ",user);
				user.following_names.push(req.following_name);
				user.following.push(req.following_user);
				user.save(function(err){
	        		if(err) {
	        			console.log('Error');
	        		} else {
	        			res.json(user);
	        		}
	        	});
			});
			User.findOne({_id: req.following_user },function(err, user){//update current user
				user.followed_names.push(req.user_name);
				user.followed.push(req.user_id);
				user.save(function(err){
	        		if(err) {
	        			console.log('Error');
	        		} else {
	        			res.redirect('/');
	        		}
	        	});
			});
	},





	//getting appointment to specific question
	get_appointments: function(req, res){
		User.find({ _id : req.id }, function(err, results){
			if(err){
				res.send(err);
			} else {
				// console.log(results);
				res.json(results);
			}
		});
	},
	delete_appointment: function(req, res){
		// remove appointment from user in appointment array
		User.find({ _id: req.user_id}, function(err, results){
			for(var i=0; i<results[0].appointments.length; i++) {
				if(req.id == results[0].appointments[i]._id) {
					console.log(req.id);
					results[0].appointments.splice(i, 1)
					var newAppointments = results[0].appointments;
					// console.log("New appointments after deletion", newAppointments);
					User.update({ _id : req.user_id }, {$set: {appointments: newAppointments}}, function(err, results){
						if(err){
							res.send(err);
						} else {
							// remove service from contractors service array
							// User.update({ _id:req.contractor.id}, function(err, results){
								if(err){
									res.send(err);
								} else{
									res.json(results);
								}
							// })
						}
					});
				}
			}
		})
	},
	pay_appointment: function(req, res){
		// remove appointment from user in appointment array
		User.find({ _id: req.user_id}, function(err, results){
			for(var i=0; i<results[0].appointments.length; i++) {
				if(req.id == results[0].appointments[i]._id) {
					// console.log("New appointments after deletion", newAppointments);
					// User.update({ _id : req.user_id }, {$set: {appointments: newAppointments}}, function(err, results){
					// 	if(err){
					// 		res.send(err);
					// 	} else {
					// 		// remove service from contractors service array
					// 		// User.update({ _id:req.contractor.id}, function(err, results){
					// 			if(err){
					// 				res.send(err);
					// 			} else{
					// 				res.json(results);
					// 			}
					// 		// })
					// 	}
					// });
				}
			}
		})
	}
}
})();
