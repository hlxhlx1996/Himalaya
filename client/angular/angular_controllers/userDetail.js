// Profile controller
appointments.controller('UserDetail', function(socket,$rootScope,$rootScope,$scope, $http, $routeParams, $location, ProfileFactory,PostDetailFactory,UserDetailFactory){

	UserDetailFactory.toUserDetail(function(data){//get user info from userDetailFactory
		$scope.userInfo = data;
	});
	ProfileFactory.getPosts($scope.userInfo._id, function(data){//get this users' all posts
		$scope.userPosts = data;
		// console.log("user's posts ",data);
	});
	ProfileFactory.getFollow($scope.userInfo._id, function(data){
		$scope.followingUsers =data.following;
		$scope.followedUsers = data.followed;
	});
	ProfileFactory.getNotifications($scope.userInfo._id, function(data){
		console.log("get noti in profile.js",data.notifications);
		// console.log("followedUsers ",data);
		$scope.notifications=data.notifications;
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
			ProfileFactory.getFollow($scope.userInfo._id, function(data){
				$scope.followingUsers =data.following;
				$scope.followedUsers = data.followed;
				// console.log("followedUsers ",data);
			});	
		});
		socket.emit('follow',{
				user:$rootScope.users.username,
				toUser:$scope.userInfo._id.toString(),
				// +"57531be7602d00f2649d6cb4"
				message:$rootScope.users.username+" starts following you"
		});
	}
});




