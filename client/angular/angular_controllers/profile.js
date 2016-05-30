// Profile controller
appointments.controller('Profile', function($rootScope,$rootScope,$scope, $http, $routeParams, $location, ProfileFactory,PostDetailFactory,UserDetailFactory,GlobalFactory){
	user_id = $rootScope.users._id;
	// user_id='57415b5fd99ebaf10bbdb691'; use as joy
	$scope.gTags=$rootScope.gTags;
    $scope.selected = '';

    $scope.model = [{
        id: 10001,
        mainCategory: '男',
        productName: '水洗T恤',
        productColor: '白'
    }, {
        id: 10002,
        mainCategory: '女',
        productName: '圆领短袖',
        productColor: '黑'
    }, {
        id: 10003,
        mainCategory: '女',
        productName: '短袖短袖',
        productColor: '黃'
    }];
	// <----------------| BEGIN || POSTS |------------------------->
	ProfileFactory.getPosts(user_id, function(data){
		$rootScope.posts = data;
	});
	// add posts
	$scope.addPost = function(){
		console.log("add post in controller",$scope.gTags);
			$scope.post.user_id=$rootScope.users._id;
			$scope.post.user_name=$rootScope.users.username;
		ProfileFactory.addPost($scope.post, function(data){
			// update service list
			ProfileFactory.getPosts( user_id, function(data){
				$scope.posts = data;
			});
		});
		$scope.post={};
	};

	$scope.getPostDetail = function(post_id){
		PostDetailFactory.getPostDetail(post_id, function(data){
			if (data) {
				$location.path('/postDetail',post_id);
			}
		});
	}
	// <----------------| END || POSTS |------------------------->
	$scope.getUserDetail = function(user_id){
		console.log("click user detail");
		UserDetailFactory.getUserDetail(user_id, function(data){
			if (data) {
				$location.path('/userDetail',user_id);
			}
		});
	}
});




