appointments.controller('DebateSubTag', function($rootScope,$rootScope,$scope, $http, $routeParams, $location, ProfileFactory,PostDetailFactory,UserDetailFactory,GlobalFactory,DebateSubFactory){
	// user_id = $rootScope.users._id;
	var path = $location.path();
	
	var urlInfo="";
	for (var i = path.length - 1; i >= 0; i--) {
		if(path[i]!="/"){
			urlInfo=path[i]+urlInfo;
		}else{
			break;
		}
	}

	DebateSubFactory.getTagInfo(urlInfo,function(data){
		$scope.info=data;
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




