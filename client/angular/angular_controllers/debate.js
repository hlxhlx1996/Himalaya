// Profile controller
appointments.controller('Debate', function($rootScope,$rootScope,$scope, $http, $routeParams, $location, ProfileFactory,PostDetailFactory,UserDetailFactory,GlobalFactory){
	user_id = $rootScope.users._id;
	$scope.gTags=$rootScope.gTags;
	// <----------------| BEGIN || POSTS |------------------------->
	GlobalFactory.get_global_posts( function(data){
		$rootScope.gPosts = data;
	});
	$scope.getPostDetail = function(post_id){
		PostDetailFactory.getPostDetail(post_id, function(data){
			if (data) {
				$location.path('/postDetail',post_id);
			}
		});
	}
});




