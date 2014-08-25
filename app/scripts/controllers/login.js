'use strict';

/*global Firebase */

angular.module('blocPongApp')
  .controller('LoginCtrl', ['$scope', 'simpleLogin',
		function ($scope, simpleLogin) {

			$scope.loginError = '';

			// sign up
			$scope.signup = function() {
				simpleLogin.$createUser($scope.email, $scope.password)
					.then(function(user) {
						console.log(user);
						$scope.loginError = '';
					}, function(error) {
						$scope.loginError = error.message.replace("FirebaseSimpleLogin: ","");
					});
			};

			// sign in
			$scope.login = function() {
				simpleLogin.$login('password', {
					email: $scope.email, 
					password: $scope.password
				})
				.then(
					function(user) {
						console.log(user);
						$scope.loginError = '';
					}, 
					function(error) {
						$scope.loginError = error.message.replace("FirebaseSimpleLogin: ","");
						console.log(error);
					}
				);
			};

	  }
  ]);

