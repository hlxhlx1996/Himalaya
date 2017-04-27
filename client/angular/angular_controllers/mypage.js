// Profile controller
appointments.controller('MyPageController', function($rootScope,$rootScope,$scope, $http, $routeParams, $location, ProductFactory,ProfileFactory,OrderFactory){
	// ProfileFactory.get_user_by_name('Liuxuan Huang',function(userinfo){
	// 	$rootScope.currentUser = userinfo;
	// });
	// console.log("currentUser:  ",$rootScope.currentUser);
	 $scope.isBid = false;
	$scope.rating = [0,1,2,3,4,5]
	ProductFactory.get_all_products_by_user($rootScope.currentUser._id,function(myProducts){
		$scope.allProducts = myProducts;
		$scope.newProduct = "";
	})
	// console.log("currentUser info: ",$roo tScope.currentUser);
	$scope.add_product = function(){
		var newProduct = $scope.newProduct;
		newProduct.supplier_name = $rootScope.currentUser.username;
		newProduct._supplier = $rootScope.currentUser._id;
		newProduct.isBid = $scope.isBid;
		if ($scope.isBid == true) {
			newProduct.quantity = 1;
			newProduct.status = "bidding"
		}
		ProductFactory.add_product(newProduct,function(data){
			ProductFactory.get_all_products_by_user($rootScope.currentUser._id,function(myProducts){
				$scope.allProducts = myProducts;
				$scope.newProduct = "";
			})
		});
		$scope.isBid = false;
	}
	$scope.rate_product = function(product){
		console.log("rate product");
		ProductFactory.rate_product(product);
	}
	// ProductFactory.get_all_products_by_user($rootScope.currentUser._id,function(allProducts){
	// 	console.log("allProducts: ",allProducts);
	// 	$scope.allProducts = allProducts;
	// })
	$scope.get_order_by_user = function(){

	}
	OrderFactory.get_order_by_user($rootScope.currentUser._id,function(orders){
		$scope.orders = orders;
	})
	OrderFactory.get_user_selling($rootScope.currentUser._id,function(uWithsellings){
		$scope.uWithsellings = uWithsellings;
		get_sellings();
	})
	var get_sellings = function(){
		$scope.sellings = new Array();
		var sellings = $scope.uWithsellings.sellings;
		// console.log("sellings counter ",sellings.length);
		for (var i = 0; i < sellings.length; i++) {
			var products = sellings[i].products_info;
			// console.log("products_info name : ",products[i].sname);
			for (var j = 0; j < products.length; j++) {
				if (products[j].supplier == $rootScope.currentUser._id) {
					var selling = products[j];
					selling.status=sellings[i].status;
					selling.customer=sellings[i].cname;
					$scope.sellings.push(selling);
				}
				// products[i]
			}
		}
	}
	$scope.checkToogle = function(){
		if ($scope.isBid == false) {
			$scope.isBid = true;
			$scope.newProduct.quantity = 1;
		}else{
			$scope.isBid = false;
		}
	}
	$scope.sellProduct =function(product_info){
		var orderInfo = {
			customer:product_info.max_lord,
			cname:product_info.max_lord_name,
			products_info:[{
				supplier:$rootScope.currentUser._id,
				sname:$rootScope.currentUser.username,
				product:product_info._id,
				pname:product_info.pname,
				price:product_info.price,
				quantity:1
			}]
		};
		OrderFactory.add_bid_order(orderInfo);
		ProductFactory.get_all_products_by_user($rootScope.currentUser._id,function(myProducts){
		$scope.allProducts = myProducts;
		$scope.newProduct = "";
	})
	}
	$scope.completeOrder = function(order){
		OrderFactory.completeOrder(order);
		OrderFactory.get_order_by_user($rootScope.currentUser._id,function(orders){
		$scope.orders = orders;
	})
	}

	$scope.add_card = function(){
		$scope.card._user = $rootScope.currentUser._id;
		ProfileFactory.add_card()
	}


});




