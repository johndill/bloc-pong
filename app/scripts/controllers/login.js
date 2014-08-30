'use strict';

/*global Firebase */

angular.module('blocPongApp')
  .controller('LoginCtrl', ['$scope', 'simpleLogin', '$location', 'firebaseUrl',
		function ($scope, simpleLogin, $location, firebaseUrl) {

			$scope.loginError = '';
      var ref = new Firebase(firebaseUrl);

			// sign up
			$scope.signup = function() {
				simpleLogin.$createUser($scope.email, $scope.password)
					.then(function(user) {
						console.log(user);
            ref.child('users').child(user.uid).set({
              settings: {
                sound: 'on',
                difficulty: 'novice'
              }
            });
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

