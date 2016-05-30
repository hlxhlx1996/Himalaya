// Profile factory
appointments.factory('ProfileFactory', function($http){
	var factory = {};
	var payInfo;

	// <----------------| BEGIN || POSTS |------------------------->
	factory.addPost = function(service, callback) {
		$http.post('/add_post', service).success(function(output){
			callback(output);
		})
	};
	factory.getPosts = function(id, callback) {
		$http.get('/get_posts/'+ id).success(function(output){
			var posts = output.posts;
			callback(posts);
		});
	};
	factory.getPosts = function(id, callback) {
		$http.get('/get_posts/'+ id).success(function(output){
			var posts = output.posts;
			callback(posts);
		});
	};
	// <----------------| END || POSTS |------------------------->
	return factory;
});
// PostDetailFactory
appointments.factory('PostDetailFactory', function($http){
	var factory = {};
	var postDe;
	factory.getPostDetail = function(post_id,callback) {
		$http.get('/getPostDetail/'+post_id).success(function(output){

			postDe= output;
			callback(output);
		});
	};
	factory.toPostDetail = function(callback) {
		callback(postDe);
	};
	factory.up = function(supportInfo, callback) {
		$http.post('/up', supportInfo).success(function(output){
			console.log("success up in factory");
			callback(output);
		})
	};
		// <----------------| BEGIN || COMMENTS |------------------------->
	factory.addComment = function(comment, callback) {
		$http.post('/add_comment', comment).success(function(output){
			callback(output);
		})
	};
	factory.getComments = function(id, callback) {
		$http.get('/get_comments/'+ id).success(function(output){
			var comments = output.comments;
			callback(comments);
		});
	};
	factory.likeComment = function(likeInfo, callback) {
		$http.post('/likeComment', likeInfo).success(function(output){
			console.log("success like com in factory");
			callback(output);
		})
	};
	return factory;
});
// Profile factory
appointments.factory('GlobalFactory', function($http){
	var factory = {};
	factory.get_global_tags = function(callback) {
		$http.get('/get_global_tags').success(function(output){
			callback(output);
		});
	};
	factory.get_global_users = function(user_id,callback) {
		$http.get('/get_global_users/'+user_id).success(function(output){
			callback(output);
		});
	};
	factory.get_global_posts = function(callback) {
		$http.get('/get_global_posts').success(function(output){
			callback(output);
		});
	};
	return factory;
});
// UserDetailFactory
appointments.factory('UserDetailFactory', function($http){
	var factory = {};
	var userDe;
	factory.getUserDetail = function(user_id,callback) {
		$http.get('/getUserDetail/'+user_id).success(function(output){
			userDe= output;
			callback(output);
		});
	};
	factory.toUserDetail = function(callback) {
		callback(userDe);
	};
	factory.follow = function(followInfo,callback){
		$http.post('/follow',followInfo).success(function(output){
			console.log("success follow in factory");
			callback(output);
		})
	}
	return factory;
});
