// Profile controller
appointments.controller('ProfileController', function($rootScope,$rootScope,$scope, $http, $routeParams, $location, ProfileFactory){
	// user_id = $rootScope.users._id;
	ProfileFactory.get_global_users(function(allusers){
				$scope.all_users = allusers;
			});
	// $scope.userinfo;
	$scope.register = function () {
		var userinfo =$scope.new_friend;
		ProfileFactory.user_register(userinfo,function(data){
			ProfileFactory.get_global_users(function(allusers ){
				$scope.all_users = allusers;
				$scope.new_friend = "";
			});
		});
	}
	$scope.login = function () {
		var userinfo =$scope.old_friend;
		ProfileFactory.get_user_by_name(userinfo.username,function(data){
			if (data && data.password == userinfo.password) {
				$rootScope.currentUser = data;
				$location.path('/mypage');
			}
			$scope.login_databack = data;
		});
	}
	$scope.logout = function(){
		$location.path('/');
		$rootScope.currentUser = "";
	}
});




