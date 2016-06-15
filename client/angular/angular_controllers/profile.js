// Profile controller
appointments.controller('Profile', function(socket,$rootScope,$rootScope,$scope, $http, $routeParams, $location, ProfileFactory,PostDetailFactory,UserDetailFactory,GlobalFactory){
	user_id = $rootScope.users._id;
	// user_id='57415b5fd99ebaf10bbdb691'; use as joy
	$scope.gTags=$rootScope.gTags;
	$scope.messages={};
	// <----------------| BEGIN || POSTS |------------------------->
	updatePosts=function(){
		ProfileFactory.getPosts(user_id, function(data){
			console.log("update posts",data);
			$scope.userAllPosts = data;
		});
	}
	ProfileFactory.getPosts(user_id, function(data){
		$scope.userAllPosts = data;
		socket.emit('currnetUser_id',{
			user_id:user_id
		});
	});
	ProfileFactory.getFollow(user_id, function(data){
		$scope.followingUsers =data.following;
		$scope.followedUsers = data.followed;
		// console.log("followedUsers ",data);
	});
	ProfileFactory.getNotifications(user_id, function(data){
		// console.log("get noti in profile.js",data.notifications);
		// console.log("followedUsers ",data);
		$scope.notifications=data.notifications;
	});
	// --------------| BEGIN || SOCKET . ON------------------
	var uID=user_id.toString();
	socket.on('addedPost'+uID,function(data){
		console.log("messgae to user",uID);
		console.log("message is",data.message);
	  	// $scope.messages.push(data.message);
	  	$scope.message=data.message;
	  });
	socket.on('followed'+uID,function(data){
		console.log("follow to user",uID);
		console.log("message is",data.message);
	  	// $scope.messages.push(data.message);
	  	$scope.message=data.message;
	  });
	// var toUser="57532055602d00f2649d6cba";
	// --------------| END || SOCKET . ON------------------
	var count=0;
	var toUsers=["57532055602d00f2649d6cba","5753169c488ca1886427cf80"];

	$scope.socketClick=function(){
		console.log($rootScope.users.username,"clicked socket");
		for (var i = 0; i < $scope.followedUsers.length; i++) {
			socket.emit('click',{
				user:$rootScope.users.username,
				toUser:$scope.followedUsers[i]._id.toString(),
				// +"57531be7602d00f2649d6cb4"
				message:$rootScope.users.username+" clicked socket "+count
			});
		}
		count++;
	};



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
		user_id=$rootScope.users._id;
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
		for (var i = 0; i < $scope.followedUsers.length; i++) {
			socket.emit('addPost',{
				user:$rootScope.users.username,
				toUser:$scope.followedUsers[i]._id.toString(),
				// +"57531be7602d00f2649d6cb4"
				message:$rootScope.users.username+" posted a new article "+count
			});
		}
		count++;
		// ProfileFactory.addPost($scope.post, function(posts){
		// 	// update service list
		// 	updatePosts();
		// });
		// ProfileFactory.getPosts( user_id, function(allPosts){
		// 		console.log("update userposts");
		// 		// $scope.userPosts = data;
		// 		GlobalFactory.get_global_tags(function(data){
		// 			$scope.userPosts = allPosts;
		// 			$scope.gTags=$rootScope.gTags=data;
		// 			$scope.post={};
		// 			$scope.addedTags=[];
		// 		});
		// 	});
		// ProfileFactory.getPosts(user_id, function(data){
		// 	console.log("update posts ",data);
		// 	$scope.userPosts = data;
		// });
		ProfileFactory.addPost($scope.post, function(data){
			// update service list
			// ProfileFactory.getPosts( user_id, function(data){
			// 	$scope.userPosts = data;
			// });
		});
		GlobalFactory.get_global_tags(function(data){
			user_id=$rootScope.users._id;
			console.log("update tags");
			$rootScope.gTags = data;
			$scope.gTags=data;
			ProfileFactory.getPosts( user_id, function(data){
				$scope.userAllPosts = data;
				console.log("get posts in profile",data);
			});
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
			ProfileFactory.getFollow(user_id, function(data){
				$scope.followingUsers =data.following;
				$scope.followedUsers = data.followed;
		// console.log("followedUsers ",data);
			});
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




