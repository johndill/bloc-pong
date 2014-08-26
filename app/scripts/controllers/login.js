'use strict';

angular.module('blocPongApp')
  .controller('LoginCtrl', ['$scope', 'simpleLogin', '$location',
		function ($scope, simpleLogin, $location) {

			$scope.loginError = '';

			// sign up
			$scope.signup = function() {
				simpleLogin.$createUser($scope.email, $scope.password)
					.then(function(user) {
						console.log(user);
						$scope.loginError = '';
						$location.path('menu');
					}, function(error) {
						$scope.loginError = error.message.replace('FirebaseSimpleLogin: ','');
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
						$location.path('menu');
					}, 
					function(error) {
						$scope.loginError = error.message.replace('FirebaseSimpleLogin: ','');
						console.log(error);
					}
				);
			};

	  }
  ]);

