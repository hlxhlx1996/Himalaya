// Profile controller
appointments.controller('UserDetail', function($rootScope,$rootScope,$scope, $http, $routeParams, $location, ProfileFactory,PostDetailFactory,UserDetailFactory){

	UserDetailFactory.toUserDetail(function(data){//get user info from userDetailFactory
		$scope.userInfo = data;
	});
	ProfileFactory.getPosts($scope.userInfo._id, function(data){//get this users' all posts
		$scope.userPosts = data;
		console.log("user's posts ",data);
	});
	$scope.follow = function(){//
		user_id = $rootScope.users._id
		var followInfo ={
			user_id : $rootScope.users._id,
			user_name:$rootScope.users.username,
			following_user:$scope.userInfo._id,
			following_name:$scope.userInfo.username
		};
		UserDetailFactory.follow(followInfo,function(data){
			$rootScope.users=data;
			UserDetailFactory.getUserDetail($scope.userInfo._id, function(data){
				$scope.userInfo = data;
			});		
		});
	}
});




