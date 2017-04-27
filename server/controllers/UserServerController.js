var mongoose = require('mongoose');
var User = mongoose.model('User');
var Card = mongoose.model('Card');

var add_card = function(id, card){

}
module.exports = (function() {
	return{
	user_register: function(req, res){
		console.log("req ",req.body);
		User.findOne({ username:req.body.username }, function(err,user){
			if(user) {
				res.status(401).json({error:'username exists'});
				console.log('route-reg2',user);
			}//ends if
			else {
				// var cardInfo = req.body.card;
				// req.body.card = 0;
				// var userInfo = {
				// 	username:req.body.username,
				// 	account:req.body.account,
				// 	phone:req.body.phone,
				// 	age:req.body.age,
				// 	password:req.body.password
				// } 
				console.log("user name not found create new");
				var newUser = User(req.body);
				newUser.save(function(err,data){
					if(err) {
    					console.log('Error');
    				} else {
    					res.json(data);
    				}
				});
			}//ends else
		} );//ends UserModel.findOne 
	// console.log('route-reg1', req.body);
	},
	get_user_by_name:function(req,res){
		User.findOne({ username : req.params.username }, function(err, results){
			if(err){
				res.send(err);
			} else {
				// console.log("find user by name ",results);
				// results.exp_date =
				res.json(results);
			}
		});
	},
	get_user: function(req, res){
		User.findOne({ _id : req.params.id }, function(err, results){
			if(err){
				res.send(err);
			} else {
				res.json(results);
			}
		});
	},
	get_global_users: function(req, res){
		User.find({}, function(err, results){
			if(err){
				res.send(err);
			} else{
				res.json(results);
			}
		})
	},
	get_user_selling:function(req,res){
		User.findOne({_id:req.params.id})
		.populate('sellings')
		.exec(function(err, user) {
			if(err){
				res.send(err);
			} else {
				res.json(user);
			}
		});;
	}

}
})();
