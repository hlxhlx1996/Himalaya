// Profile controller
appointments.controller('PostDetail', function($rootScope,$rootScope,$scope, $http, $routeParams, $location, ProfileFactory,PostDetailFactory){
	PostDetailFactory.toPostDetail(function(data){
		$scope.postDetail=data;
	});
	PostDetailFactory.getComments($scope.postDetail._id, function(data){
		$scope.comments = data;
	});

	$scope.up = function(support){
		console.log("update in controller support ",support);
		var currentSupport;
		if (support==true) {
			currentSupport=$scope.postDetail.up//if user supprt the topic
		}else{
			currentSupport=$scope.postDetail.down
		}
		var supportInfo = {
			post_id:$scope.postDetail._id,
			currentSupport:currentSupport,
			support:support
		}
		PostDetailFactory.up(supportInfo, function(data){
			PostDetailFactory.getPostDetail($scope.postDetail._id,function(data){
				$scope.postDetail=data;
			});
		});
	};
	// <----------------| BEGIN || COMMENTS |------------------------->

	$scope.addComment = function(post_id){
		$scope.comment.post_id=$scope.postDetail._id;
		$scope.comment.user_id=$rootScope.users._id;
		$scope.comment.user_name=$rootScope.users.username;
		console.log("add com in controller ",$scope.comment);
		PostDetailFactory.addComment($scope.comment, function(data){
			// update service list
			PostDetailFactory.getPostDetail($scope.postDetail._id,function(data){
				$scope.postDetail=data;
			});
			PostDetailFactory.getComments($scope.postDetail._id, function(data){
				$scope.comments = data;
			});
		});
		$scope.comment={};
	};
	$scope.likeComment= function(comment_id,comment_likes){
		console.log("like com in controller  ",comment_id,comment_likes);
		var likeInfo={
			comment_id:comment_id,
			comment_likes:comment_likes
		}
		PostDetailFactory.likeComment(likeInfo, function(data){
			PostDetailFactory.getComments($scope.postDetail._id, function(data){
				$scope.comments = data;
			});
		});
	}	
	// <----------------| END || COMMENTS |------------------------->
	$scope.clickTag= function(tagClicked){
			$location.path('/debateSubTag/'+tagClicked);
	};
	$scope.clickCate= function(cateClicked){//category click can also use this function
		$location.path('/debateSubCate/'+cateClicked);
	};
});




