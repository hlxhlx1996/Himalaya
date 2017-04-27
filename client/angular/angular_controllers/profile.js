// Profile controller
appointments.controller('ProfileController', function($rootScope,$rootScope,$scope, $http, $routeParams, $location, ProfileFactory){
	// user_id = $rootScope.users._id;
	ProfileFactory.get_global_users(function(allusers){
				$scope.all_users = allusers;
			});
	$scope.states = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];
	// $scope.userinfo;
	$scope.months = [1,2,3,4,5,6,7,8,9,10,11,12];
	$scope.register = function () {
		var userinfo =$scope.new_friend;
		// userinfo.card = $scope.card;
		console.log("exdate ",$scope.new_friend.exp_date);
		ProfileFactory.user_register(userinfo,function(data){
			ProfileFactory.get_global_users(function(allusers ){
				$scope.all_users = allusers;
				$scope.new_friend = "";
				// $scope.card = "";
			});
		});
	}
	$scope.login = function () {
		var userinfo =$scope.old_friend;
		ProfileFactory.get_user_by_name(userinfo.username,function(data){
			if (data && data.password == userinfo.password) {
				$rootScope.currentUser = data;
				$location.path('/home');
			}else{
				$scope.loginM = "Invalid uername or password";
			}
			$scope.login_databack = data;
		});
	}
	$scope.logout = function(){
		$location.path('/');
		$rootScope.currentUser = "";
	}
});




