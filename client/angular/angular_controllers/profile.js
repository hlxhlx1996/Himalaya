// Profile controller
appointments.controller('Profile', function($rootScope,$rootScope,$scope, $http, $routeParams, $location, ProfileFactory,PostDetailFactory,UserDetailFactory,GlobalFactory){
	user_id = $rootScope.users._id;
	// user_id='57415b5fd99ebaf10bbdb691'; use as joy
	$scope.gTags=$rootScope.gTags;
	// <----------------| BEGIN || POSTS |------------------------->
	ProfileFactory.getPosts(user_id, function(data){
		$scope.userPosts = data;
	});
	ProfileFactory.getFollow(user_id, function(data){
		$scope.followingUsers =data.following;
		$scope.followedUsers = data.followed;
		// console.log("followedUsers ",data);
	});
	$scope.addedTags=new Array();
	var tagCount=0;
	$scope.addToTagArr=function(){
		if ($scope.addedTags.length==0) {
			$scope.addedTags.push($scope.addedTag);
			console.log("added Tag",$scope.addedTag);
		}else{
			for (var i = 0; i < $scope.addedTags.length; i++) {
				if ($scope.addedTags[i]!=$scope.addedTag) {
					$scope.addedTags.push($scope.addedTag);
					console.log("added Tag",$scope.addedTag);
				}
			}
		}
		$scope.addedTag="";
	};
	$scope.deleteTag=function(tag){
		console.log("tagArr ",$scope.addedTags);
		for (var i = 0; i < $scope.addedTags.length; i++) {
			if ($scope.addedTags[i]==tag) {
				$scope.addedTags.splice(i,1);
			}
		}
	};
	// add posts
	$scope.addPost = function(){
		console.log("add post in controller post info: ",$scope.addedTags);
		var tagArr= new Array();
		var index=0;
		for (var i = 0; i < $scope.gTags.length; i++) {
			if ($scope.gTags[i].checked==true) {
				tagArr[index++]=$scope.gTags[i];
				$scope.gTags[i].checked=false;
			}
			
		}
		for (var i = 0; i < $scope.addedTags.length; i++) {
			var addedTag = {
				text:$scope.addedTags[i]
			};
			tagArr.push(addedTag);

		}
		$scope.post.tags=tagArr;
		$scope.post.user_id=$rootScope.users._id;
		$scope.post.user_name=$rootScope.users.username;
		console.log("scope post:",$scope.post);
		ProfileFactory.addPost($scope.post, function(data){
			// update service list
			ProfileFactory.getPosts( user_id, function(data){
				$scope.userPosts = data;
			});
		});
		GlobalFactory.get_global_tags(function(data){
			$scope.gTags=$rootScope.gTags=data;
		});
		$scope.post={};
		$scope.addedTags=[];
	};

	$scope.getPostDetail = function(post_id){
		PostDetailFactory.getPostDetail(post_id, function(data){
			if (data) {
				$location.path('/postDetail',post_id);
			}
		});
	};
	$scope.deletePost=function(post_id){
		console.log("post id",post_id);
		ProfileFactory.deletePost(post_id,function(data){
			ProfileFactory.getPosts( user_id, function(data){
				$scope.userPosts = data;
			});
		});
		GlobalFactory.get_global_tags(function(data){
			$scope.gTags=$rootScope.gTags=data;
		});
	};
	// <----------------| END || POSTS |------------------------->
	$scope.getUserDetail = function(user_id){
		console.log("click user detail");
		UserDetailFactory.getUserDetail(user_id, function(data){
			if (data) {
				$location.path('/userDetail',user_id);
			}
		});
	};
	$scope.clickTag= function(tagClicked){
		$location.path('/debateSubTag/'+tagClicked);
	};
	$scope.clickCate= function(cateClicked){//category click can also use this function
		$location.path('/debateSubCate/'+cateClicked);
	};
	$scope.chooseTag=function(tag){
		for (var i = 0; i < $scope.gTags.length; i++) {
			if (tag._id==$scope.gTags[i]._id) {
				$scope.gTags[i].checked=true;
			}
			
		}
	};
	$scope.unfollow=function(user_id){
		var unfollowInfo={
			currentUser:$scope.users._id,
			followingUser:user_id
		}
		ProfileFactory.unfollow(unfollowInfo,function(data){
			ProfileFactory.getFollow($scope.users._id, function(data){
				$scope.followingUsers =data.following;
				$scope.followedUsers = data.followed;
				// console.log("followedUsers ",data);
			});
		})
	}

});




