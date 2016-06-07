// Profile controller
appointments.controller('Debate', function($rootScope,$rootScope,$scope, $http, $routeParams, $location, ProfileFactory,PostDetailFactory,UserDetailFactory,GlobalFactory,DebateSubFactory){
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
	$scope.clickTag= function(tagClicked){
			$location.path('/debateSubTag/'+tagClicked);
	}
	$scope.clickCate= function(cateClicked){//category click can also use this function
		$location.path('/debateSubCate/'+cateClicked);
	}
});




