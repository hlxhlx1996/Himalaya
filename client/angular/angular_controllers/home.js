// Home controller
appointments.controller('HomeController', function($rootScope,$rootScope,$scope, $http, $routeParams, $location, ProductFactory,ProfileFactory,OrderFactory){
	// GlobalFactory.get_global_cates(function(data){
	// 	$rootScope.gCates = data;
	// 	console.log("all cates,",data);
	// });
	var coupon_code = ["SHOPPING","OOOOO","YOLO"];
	var plist = ['coffee','duck'];
	var pcount = 0;
	var coupon_discounts=[0.7,0.8,0.9];
	var discount = 1;
	var totalPrice=0;
	$scope.total = totalPrice;

	$rootScope.shoppingCart = new Array();

	ProductFactory.get_all_products(function(data){
		$rootScope.gProducts = data;
	})
	ProductFactory.get_all_category(function(data){
		$rootScope.gCates = data;
		console.log("al cates ",$rootScope.gCates);
	})
	$scope.get_product_detail=function(productInfo){
		if (productInfo.isBid == true) {
			$scope.regular = false;
		}else{
			$scope.regular = true;
		}
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
		console.log("iteminfo price quantity ",itemInfo.price," ",itemInfo.quantity);
		totalPrice += $scope.selectedProduct.price*$scope.selectedProduct.buyQuqn;
		$scope.total = totalPrice;
		console.log("total ",totalPrice);
		$scope.selectedProduct = "";
		$scope.selectedProduct.buyQuqn = 0;
		$rootScope.shoppingCart.push(itemInfo);
		// console.log("shoppingCart has ",$rootScope.shoppingCart," length is ",$rootScope.shoppingCart.length);
	}
	$scope.apply_coupon = function(){
		for (var i = 0; i < coupon_code.length; i++) {
			if (coupon_code[i]==$scope.coupon_code) {
				discount = coupon_discounts[i];
				$scope.couponM = "";
				$scope.total *= discount;
				console.log("coupon_discount is ",discount);
			}
		}
		if (discount == 0) {
			$scope.couponM = "Invalid Coupon";
		}
	}
	$scope.order = function(){
		var orderInfo = {
			customer:$rootScope.currentUser._id,
			cname:$rootScope.currentUser.username,
			products_info:$rootScope.shoppingCart,//array of items\
			coupon_discount : discount,
			total:$scope.total
		};
		console.log("order info ",orderInfo);
		OrderFactory.add_order(orderInfo);
		ProductFactory.get_all_products(function(data){
			$scope.gProducts = data;
		})
		$rootScope.shoppingCart = new Array();
		$scope.selectedProduct = "";
		$scope.coupon_code ="";
		$scope.total = 0;
	}
	$scope.bid = function(){
		if ($scope.selectedProduct.price < $scope.selectedProduct.bit_start_price) {
			$scope.errorM1 = "Price is too low";
		}else{
			var bidInfo = {
				pid:$scope.selectedProduct._id,
				customer:$rootScope.currentUser._id,
				cname:$rootScope.currentUser.username,
				price:$scope.selectedProduct.price
			}
			OrderFactory.add_to_product_bidding_list(bidInfo,function(data){
				console.log("success");
				$scope.errorM1 = "Bidding Success";
				$scope.selectedProduct="";
			});
		}
	}
	$scope.selectCate = function(cate){
		if (cate == 0) {
			$scope.selectedCate = "";
		}else{
			$scope.selectedCate = cate;
		}
	}

});




