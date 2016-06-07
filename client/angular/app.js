
 var appointments = angular.module('appointments',['angularPayments','ngRoute']);

appointments.config(function($routeProvider){

	$routeProvider
	.when('/',{ templateUrl: 'partials/login.html' })
	// .when('/',{ templateUrl: 'partials/home.html' })
	// , resolve: { logincheck: checkLoggedin } ->> for logged in
	.when('/login',{ templateUrl: 'partials/login.html' })
	.when('/register',{ templateUrl: 'partials/register.html' })
	.when('/home',{ templateUrl: 'partials/home.html' })
	.when('/debate', { templateUrl: "partials/debate.html"})
	.when('/myPage',{ templateUrl: 'partials/myPage.html' })
	.when('/pay/:id', { templateUrl: "partials/pay_page.html"})
	.when('/add_appointment/:id', { templateUrl: "partials/add_appointment.html"})
	.when('/calendar/:id', { templateUrl: "partials/calendar_view.html"})
	.when('/add_review/:id', { templateUrl: "partials/add_review.html"})
	.when('/postDetail', { templateUrl: "partials/post.html"})
	.when('/userDetail', { templateUrl: "partials/user.html"})
	.when('/debateSubTag/:tag', { templateUrl: "partials/debateSubTag.html"})
	.when('/debateSubCate/:cate', { templateUrl: "partials/debateSubCate.html"})
	.otherwise( { redirectTo: "/" });
});

var checkLoggedin = function($q, $location, $rootScope, $http) {
	var deferred = $q.defer();
	$http.get('/loggedin').success(function(user){
		console.log('checkLoggedin',user);
		if (user) {
			console.log('yes loggedin',user);
			$rootScope.users = user;
			$rootScope.currentUser = user; //$rootScope.currentUser is used ng-show- see index nav
			deferred.resolve();
			$location.url('/home');
		}//ends if
		else {
			console.log('no loggedin');
			deferred.reject();
			$location.url('/login');
		}
	})
};