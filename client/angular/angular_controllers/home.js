// Home controller
appointments.controller('Home', function($rootScope,$rootScope,$scope, $http, $routeParams, $location, ProfileFactory,GlobalFactory){
	user_id = $rootScope.users._id;
	ProfileFactory.getPosts(user_id, function(data){
		$rootScope.posts = data;
	});

	GlobalFactory.get_global_tags(function(data){
		$rootScope.gTags = data;
		console.log("gTags: ",$rootScope.gTags);
	});
	GlobalFactory.get_global_users(user_id,function(data){
		$rootScope.gUsers = data;
		console.log("all users ",data);
	});
	GlobalFactory.get_global_cates(function(data){
		$rootScope.gCates = data;
		console.log("all cates,",data);
	});

});




