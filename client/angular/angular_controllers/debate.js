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
	// upload on file select or drop
    $scope.upload = function (file) {
        Upload.upload({
            url: 'upload/url',
            data: {file: file, 'username': $scope.username}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };
    $scope.uploadFile = function(files) {
    var fd = new FormData();
    //Take the first selected file
    fd.append("file", files[0]);

    $http.post(uploadUrl, fd, {
        withCredentials: true,
        headers: {'Content-Type': undefined },
        transformRequest: angular.identity
    });

	};
});




