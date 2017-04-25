// Home controller
appointments.controller('HomeController', function($rootScope,$rootScope,$scope, $http, $routeParams, $location, ProductFactory,ProfileFactory,OrderFactory){

	// GlobalFactory.get_global_cates(function(data){
	// 	$rootScope.gCates = data;
	// 	console.log("all cates,",data);
	// });
	// ProfileFactory.get_user_by_name('Liuxuan Huang',function(userinfo){
	// 	$rootScope.currentUser = userinfo;
	// 	// console.log("user info is: ",$rootScope.currentUser);
	// })
	// ProfileFactory.get_user_by_name('Licheng Jiang',function(userinfo){
	// 	$rootScope.currentUser = userinfo;
	// 	// console.log("user info is: ",$rootScope.currentUser);
	// })
	$rootScope.shoppingCart = new Array();

	ProductFactory.get_all_products(function(data){
		$scope.gProducts = data;
	})
	$scope.get_product_detail=function(productInfo){
		$scope.selectedProduct = productInfo;
		// $location.path('/productDetail');
	}
	$scope.add_to_cart = function(){
		$scope.selectedProduct.customerId = $rootScope.currentUser._id
		var itemInfo = {
			supplier:$scope.selectedProduct._supplier,
			sname:$scope.selectedProduct.supplier_name,
			product:$scope.selectedProduct._id,
			pname:$scope.selectedProduct.pname,
			price:$scope.selectedProduct.price,
			quantity:$scope.selectedProduct.buyQuqn
		};
		$scope.selectedProduct = "";
		$rootScope.shoppingCart.push(itemInfo);
		// console.log("shoppingCart has ",$rootScope.shoppingCart," length is ",$rootScope.shoppingCart.length);
	}
	$scope.order = function(){
		var orderInfo = {
			customer:$rootScope.currentUser._id,
			cname:$rootScope.currentUser.username,
			products_info:$rootScope.shoppingCart//array of items
		};
		console.log("order info ",orderInfo);
		OrderFactory.add_order(orderInfo);
		ProductFactory.get_all_products(function(data){
			$scope.gProducts = data;
		})
		$rootScope.shoppingCart = new Array();
		$scope.selectedProduct = "";
		// $scope.selectedProduct.description = "";
		// $scope.selectedProduct.pname = "";
		// $scope.selectedProduct.pname = "";
	}

});




