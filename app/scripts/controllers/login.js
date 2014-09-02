'use strict';

/*global Firebase */

angular.module('blocPongApp')
  .controller('LoginCtrl', ['$scope', 'simpleLogin', '$location', 'firebaseUrl', '$rootScope',
		function ($scope, simpleLogin, $location, firebaseUrl, $rootScope) {

			$scope.loginError = false;
	  	$rootScope.ref = new Firebase(firebaseUrl);

			// sign up
			$scope.signup = function() {
				console.log('signup');
				simpleLogin.$createUser($scope.email, $scope.password)
					.then(function(user) {
						$rootScope.ref.child('users').child(user.uid).set({
						  settings: {
							sound: 'on',
							difficulty: 'novice'
						  }
						});
					}, function(error) {
						$scope.loginError = error.message.replace('FirebaseSimpleLogin: ','');
					})
					.then(function() {
						$scope.login();
					});
			};

			// sign in
			$scope.login = function() {
				console.log('login');
				simpleLogin.$login('password', {
					email: $scope.email, 
					password: $scope.password
				})
				.then(
					function(user) {
						console.log(user);
						$scope.loginError = false;
						$rootScope.ref.child('users').child(user.uid).child('settings').on('value', function (snapshot) {
							$rootScope.settings = snapshot.val();
							console.log(snapshot.val());
						}, function (err) {
							console.log('Error retrieving settings: '  + err.code + ' - ' + err.message);
        					$rootScope.settings = { sound: 'on', difficulty: 'novice' };
						});						
						$location.path('menu');
					}, 
					function(error) {
						$scope.loginError = error.message.replace('FirebaseSimpleLogin: ','');
						console.log(error);
					});
	  	};
	  }
  ]);

