var mongoose = require('mongoose');
var Product = mongoose.model('Product');

module.exports = (function() {
	return{
	add_product:function(req,res){
		Product.findOne({pname: req.body.pname}, function(err,product){
			if (product) {
				res.status(401).json({
					error:'product exists'
				});
			}else{
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
	}
}
})();
