 var appointments = angular.module('appointments',['ngRoute']);

appointments.config(function($routeProvider){

	$routeProvider
	// .when('/',{ templateUrl: 'partials/home.html' })
	.when('/',{ templateUrl: 'partials/login.html' })
	.when('/login',{ templateUrl: 'partials/login.html' })
	.when('/register',{ templateUrl: 'partials/register.html' })
	.when('/home',{ templateUrl: 'partials/home.html' })
	.when('/mypage',{ templateUrl: 'partials/mypage.html' })
	.when('/mypage/orderhistory',{ templateUrl: 'partials/orderhistory.html' })
	.when('/mypage/sellinghistory',{ templateUrl: 'partials/sellinghistory.html' })
	.when('/productDetail',{templateUrl:'partials/productDetail.html'})
	.otherwise( { redirectTo: "/" });
});
// var checkLoggedin = function($q, $location, $rootScope, $http) {
// 	var deferred = $q.defer();
// 	$http.get('/loggedin').success(function(user){
// 		console.log('checkLoggedin',user);
// 		if (user) {
// 			console.log('yes loggedin',user);
// 			$rootScope.users = user;
// 			$rootScope.currentUser = user; //$rootScope.currentUser is used ng-show- see index nav
// 			deferred.resolve();
// 			$location.url('/home');
// 		}//ends if
// 		else {
// 			console.log('no loggedin');
// 			deferred.reject();
// 			$location.url('/login');
// 		}
// 	})
// };