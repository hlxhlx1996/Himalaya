var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var User = mongoose.model('User');
var Product = mongoose.model('Product');

module.exports = (function() {
	return{
		add_order:function(req,res){
			console.log("plaing order info ",req.body);
			User.findOne({_id: req.body.customer },function(err, customer){
				var order = new Order(req.body);
				customer.orderings.push(order);
				console.log("order info ",order);
				var products_info = req.body.products_info;
				//update suppliers info
				for (var i = 0; i < products_info.length; i++) {
					var proId = products_info[i].product;
					var quan  = products_info[i].quantity;
					User.findOne({_id: products_info[i].supplier },function(err, supplier){
						Product.findOne({_id: proId },function(err, product){
							supplier.sellings.push(order);//add selling history
							product.quantity -= quan;//update product quantity
							if (product.quantity<=0) {
								product.quantity = 0;
							}
							supplier.save(function(err){
								product.save(function(err){
									if(err){
										console.log("error");
									}else{
										console.log("sucess on update supplier and product i==",i);
									}
								});
							});
						});
					});
				}
				//update customer info and order
				customer.save(function(err){
					order.save(function(err){
						if(err){
							console.log("error");
						}else{
							console.log("sucess on placing order");
						}
					});
				});
			});
		},
		get_order_by_user:function(req,res){
			Order.find({customer:req.params.id},function(err,orders){
				if (err) {
					res.send(err);
				}else{
					res.json(orders);
				}
			});
		},
		completeOrder:function(req,res){
			Order.findOne({_id:req.params.id},function(err,order){
				if (err) {
					res.send(err);
				}else{
					order.status="complete";
					order.save(function(err){
						if (err) {
							console.log(" oh no");
						}else{
							console.log("success update order");
						}
					});
				}
			});
		}
	}
})();
