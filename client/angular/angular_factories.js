// Profile factory
appointments.factory('ProfileFactory', function($http){

	var factory = {};


	// <----------------| BEGIN || POSTS |------------------------->
	factory.user_register = function(userinfo, callback) {
		console.log("userinfo ",userinfo);
		$http.post('/user_register', userinfo).success(function(output){
			callback(output);
		})
	};
	factory.get_user_by_name = function(username, callback) {
		$http.get('/get_user_by_name/'+username).success(function(output){
			var user = output;
			callback(user);
		});
	};
	factory.get_user = function(id, callback) {
		$http.get('/get_user/'+ id).success(function(output){
			var user = output;
			callback(user);
		});
	};
	factory.get_global_users = function(callback) {
		$http.get('/get_global_users').success(function(output){
			callback(output);
		});
	};
	// <----------------| END || POSTS |------------------------->
	return factory;
});
// Profile factory
appointments.factory('ProductFactory', function($http){

	var factory = {};
	factory.add_product = function(newProduct,callback){
		console.log("p in factory");
		$http.post('/add_product',newProduct).success(function(output){
			console.log("add_product Success in factory");
			callback(output);
		});
	};
	factory.get_all_products_by_user = function(currentUserId,callback){
		$http.get('/get_all_products_by_user/'+currentUserId).success(function(output){
			callback(output);
		});
	};
	factory.get_all_products = function(callback){
		$http.get('/get_all_products').success(function(output){
			callback(output);
		});
	}
	factory.get_all_category = function(callback){
		$http.get('/get_all_category').success(function(output){
			callback(output);
		});
	}
	factory.rate_product = function(product){
		console.log("rate thithit");
		$http.post('/rate_product',product).success(function(output){
			console.log(output);
		});
	}
	// <----------------| END || POSTS |------------------------->
	return factory;
});
appointments.factory('OrderFactory', function($http){

	var factory = {};
	factory.add_order = function(orderInfo,callback){
		console.log("p in factory");
		$http.post('/add_order',orderInfo).success(function(output){
			console.log("add_order Success in factory");
			callback(output);
		});
	};
	factory.add_bid_order = function(orderInfo,callback){
		$http.post('/add_bid_order',orderInfo).success(function(output){
			console.log("add_order Success in factory");
			callback(output);
		});
	};
	factory.add_to_product_bidding_list = function(bidInfo,callback){
		$http.post('/add_to_product_bidding_list',bidInfo).success(function(output){
			callback(output);
		});
	};
	factory.get_order_by_user = function(id,callback){
		$http.get('/get_order_by_user/'+id).success(function(output){
			callback(output);
		});
	};
	factory.get_user_selling = function(id,callback){
		$http.get('/get_user_selling/'+id).success(function(output){
			callback(output);
		});
	};
	factory.completeOrder = function(order,callback){
		$http.post('/completeOrder/'+order._id).success(function(output){
			callback(output);
		});
	};
	// <----------------| END || POSTS |------------------------->
	return factory;
});