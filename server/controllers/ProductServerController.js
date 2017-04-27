var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var User = mongoose.model('User');
var Category = mongoose.model('Category');

var cate_list = ['electronics', 'clothing', 'home', 'jewlery', 'kids&babies', 'outdoors', 'books','food'];

module.exports = (function() {
	return{
		add_product:function(req,res){
			Product.findOne({pname: req.body.pname}, function(err,product){
				if (product) {
					res.status(401).json({
						error:'product exists'
					});
				}else{
					req.body.price = req.body.bit_start_price;
					var newProduct = Product(req.body);
					newProduct.save(function(err,data){
						if (err) {
							res.send(err);
						}else{
							res.json(data);
						}
					})
				}
			});
		},
		bid_sold:function(req,res){
			Product.findOne({_id:req.body.products_info[0].product},function(err,product){
				if (err) {
					res.send(err);
				}else{
					product.status="sold";
					// product.quantity =0;
					product.save(function(err){
						if (err) {
							console.log("err");
						}else{
							console.log("update success");
						}
					});
				}
			})
		},
		get_all_products_by_user:function(req,res){
			Product.find({_supplier : req.params.id },function(err,results){
				if (err) {
					res.send(err);
				}else{
					res.json(results);
				}
			});
		},
		get_all_products:function(req,res){
			Product.find({},function(err,results){
				if (err) {
					res.send(err);
				}else{
					res.json(results);
				}
			});
		},
		get_all_category:function(req,res){
			Category.find({},function(err,results){
				if (err) {
					res.send(err);
				}else{
					res.json(results);
				}
			});
		},
		add_to_product_bidding_list:function(req,res){
			Product.findOne({_id:req.body.pid},function(err,product){
				if (err) {
					res.send(err);
				}else{
					var bidInfo = {
						customer: req.body.customer,
						cname: req.body.cname,
						price:req.body.price
					}
					product.bidCustomerList.push(bidInfo);
					User.findOne({_id:req.body.customer},function(err,customer){
						if (product.price<req.body.price) {
							product.price=req.body.price;
							product.max_lord=customer._id;
							product.max_lord_name =customer.username;
						}
						customer.bids.push(req.body.pid);
						customer.save(function(err){
							product.save(function(err1){
								if (err1) {
									res.send(err1);
								}else{
									res.json(product)
								}
							})
						})
					})
				}
			});
		},
		rate_product:function(req,res){
			console.log("req rating ",req.body.rating);
			var newRate = req.body.rating;
			var rate;
			Product.findOne({_id:req.body.product},function(err,product){
				console.log("product info ",product);
				// var rate = product.rate_count*product.rating;
				rate = ((product.rate_count*product.rating)+newRate)/(product.rate_count+1);
				console.log("rate 0",rate);
				console.log("rate_count: ",product.rate_count," rating ",product.rating);
				console.log("rate 1",newRate," 2: ",product.rate_count*product.rating+newRate);
				product.rate_count++;
				product.rating = rate;
				product.save(function(err){
					if (err) {
						res.send(err);
					}else{
						res.json(product)
					}
				})
			})
		}
	}
})();
