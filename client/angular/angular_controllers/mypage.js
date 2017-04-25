// Profile controller
appointments.controller('MyPageController', function($rootScope,$rootScope,$scope, $http, $routeParams, $location, ProductFactory,ProfileFactory,OrderFactory){
	// ProfileFactory.get_user_by_name('Liuxuan Huang',function(userinfo){
	// 	$rootScope.currentUser = userinfo;
	// });
	// console.log("currentUser:  ",$rootScope.currentUser);


	ProductFactory.get_all_products_by_user($rootScope.currentUser._id,function(myProducts){
				$scope.allProducts = myProducts;
				$scope.newProduct = "";
			})
	// console.log("currentUser info: ",$rootScope.currentUser);
	$scope.add_product = function(){
		var newProduct = $scope.newProduct;
		newProduct.supplier_name = $rootScope.currentUser.username;
		newProduct._supplier = $rootScope.currentUser._id;
		ProductFactory.add_product(newProduct,function(data){
			ProductFactory.get_all_products_by_user($rootScope.currentUser._id,function(myProducts){
				$scope.allProducts = myProducts;
				$scope.newProduct = "";
			})
		});
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

});




