// Profile controller
appointments.controller('Home', function($rootScope,$rootScope,$scope, $http, $routeParams, $location, ProfileFactory,GlobalFactory){
	user_id = $rootScope.users._id;
	// user_id='57415b5fd99ebaf10bbdb691'
	// ProfileFactory.getUsers( user_id, function(data){
	// 	var url= "";
	// 	$rootScope.users = data;
	// 	// $rootScope.users.url = url;
	// });
	// <----------------| BEGIN || POSTS |------------------------->
	ProfileFactory.getPosts(user_id, function(data){
		$rootScope.posts = data;
	});

	GlobalFactory.get_global_tags(function(data){
		$rootScope.gTags = data;
	});
	GlobalFactory.get_global_users(user_id,function(data){
		$rootScope.gUsers = data;
		console.log("all users ",data);
	});
	// GlobalFactory.getCates(user_id, function(data){
	// 	$rootScope.gTags = data;
	// });

});




