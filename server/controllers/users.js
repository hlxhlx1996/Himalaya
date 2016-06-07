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
		// console.log("add_post in users.js",req.tags);
		User.findOne({_id: req.user_id }, function(err, user){
			var cate;
			var tagArr= new Array();
			var count=0;
			Category.findOne({text:req.cate},function(err,category){
				cate = category;
				if (err) {
					res.send(err);
				}else if(category==null){
					var cateInfo={text:req.cate}
					cate = new Category(cateInfo);
					// find tags
					console.log("all tags",req.tags);
					var thisTag;
					for (var i = 0; i < req.tags.length; i++) {
						thisTag=req.tags[i];
						console.log("this tag is ",thisTag);
						(function( thisTag ) {
							//async----callbacks cannot be invoked before loop has ended
							Tag.findOne({text:thisTag.text},function(err,tag){
							//i is undefined in here
							finish=false;
							if (err) {
								console.log("something is wrong");
								res.send(err);
							}else if(tag==null) {
								console.log("tag does not exist",thisTag);
								var tagInfo = {text:thisTag.text};
								var tag = new Tag(tagInfo);
								tagArr.push(tag);
							}
							else{
								tagArr.push(tag);
							}
							console.log(tagArr.length, "  " ,req.tags.length);
							if (tagArr.length==req.tags.length) {///when pushed the last one

								var postInfo = {
									_author:req.user_id,
									author_name:req.user_name,
									title: req.title,
									content: req.content,
									category:cate.text,
									_cate:cate._id
								};
								var post = new Post(postInfo);
								cate.posts.push(post);
								console.log("tagArr now is ",tagArr);
								for (var i = 0; i < tagArr.length; i++) {
									var tag=tagArr[i];
									post._tags.push(tag);
									post.tags.push(tag.text);
									tag.posts.push(post);
								}
								console.log("post info: ",post.tags);
								user.posts.push(post);
						        // now save both to the DB
						        cate.save(function(err){
						        	post.save(function(err){
						        		user.save(function(err){
						        			for (var i = 0; i < tagArr.length; i++) {
						        				var tag=tagArr[i];
						        				tag.save(function(err){
						        					if(err) {
						        						console.log('Error');
						        					} else {
						        						res.redirect('/');
						        					}
						        				});
						        			}	
						        		});
						        	});
						        });
						    }
						    finish=true;
						});
						})(thisTag);
					}
				}else{
					// find tags
					console.log("all tags",req.tags);
					var thisTag;
					for (var i = 0; i < req.tags.length; i++) {
						thisTag=req.tags[i];
						console.log("this tag is ",thisTag);
						(function( thisTag ) {
							//async----callbacks cannot be invoked before loop has ended
							Tag.findOne({text:thisTag.text},function(err,tag){
							//i is undefined in here
							finish=false;
							if (err) {
								console.log("something is wrong");
								res.send(err);
							}else if(tag==null) {
								console.log("tag does not exist",thisTag);
								var tagInfo = {text:thisTag.text};
								var tag = new Tag(tagInfo);
								tagArr.push(tag);
							}
							else{
								tagArr.push(tag);
							}
							console.log(tagArr.length, "  " ,req.tags.length);
							if (tagArr.length==req.tags.length) {///when pushed the last one

								var postInfo = {
									_author:req.user_id,
									author_name:req.user_name,
									title: req.title,
									content: req.content,
									category:cate.text,
									_cate:cate._id
								};
								var post = new Post(postInfo);
								cate.posts.push(post);
								console.log("tagArr now is ",tagArr);
								for (var i = 0; i < tagArr.length; i++) {
									var tag=tagArr[i];
									post._tags.push(tag);
									post.tags.push(tag.text);
									tag.posts.push(post);
								}
								console.log("post info: ",post.tags);
								user.posts.push(post);
						        // now save both to the DB
						        cate.save(function(err){
						        	post.save(function(err){
						        		user.save(function(err){
						        			for (var i = 0; i < tagArr.length; i++) {
						        				var tag=tagArr[i];
						        				tag.save(function(err){
						        					if(err) {
						        						console.log('Error');
						        					} else {
						        						res.redirect('/');
						        					}
						        				});
						        			}	
						        		});
						        	});
						        });
						    }
						    finish=true;
						});
						})(thisTag);
					}
				}
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
	getFollow: function(req, res){
		// just an example route, your routes may look different
		// the popuate method is what grabs all of the comments using their IDs stored in the 
		// comment property array of the post document!
		User.findOne({_id: req.params.id})
		.populate('followed')
		.populate('following')
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
	deletePost:function(req,res){
		Post.findOneAndRemove({_id:req.params.id},function(err,post){
			if (err) {
				console.log("deletePost failed");
				res.send(err);
			}else{
				User.update({ _id: post._author }, { $pull: { 'posts': post._id } },function(err,user){
				  	Category.update({_id:post._cate }, { $pull: {'posts':post._id}},function(err,cate){
						for (var i = 0; i < post._tags.length; i++) {
							var thisTag=post._tags[i];
							console.log("this tag is ",thisTag);
							(function( thisTag ) {
								Tag.update( {_id:thisTag}, {$pull:{'posts':post._id} },function(err,tag){
									console.log("tag is ",tag);
								});
							})(thisTag);
						}
					});
				  }
				);
			}

		});
	},
	unfollow:function(req,res){
		console.log("unfollow user.js",req);
		User.update({_id:req.currentUser},{$pull:{'following':req.followingUser}},function(err,user){
			User.update({_id:req.followingUser},{$pull:{'followed':req.currentUser}},function(err,user){
				if(err){
					res.send(err);
				}else{
					res.send("successfully unfollow");
				}
			});
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

		getTagInfo: function(req, res){
			Tag.findOne({text: req.params.tag})
			.populate('posts')
			.exec(function(err, tag) {
				if(err){
					console.log("wrong");
					res.send(err);
				} else {
					res.json(tag);
				}
			});
		},
		getCateInfo: function(req, res){
			Category.findOne({text: req.params.cate})
			.populate('posts')
			.exec(function(err, cate) {
				if(err){
					console.log("something is wrong");
					res.send(err);
				} else {
					res.json(cate);
				}
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
