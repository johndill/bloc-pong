'use strict';

/*global Firebase */

angular.module('blocPongApp')
  .controller('LoginCtrl', ['$scope', 'simpleLogin', '$rootScope',
		function ($scope, simpleLogin, $rootScope) {
			$scope.loginError = '';

			// sign up
			$scope.signup = function() {
				console.log($scope.email + ', ' + $scope.password);
				var res = simpleLogin.createAccount($scope.email, $scope.password);
				console.log(simpleLogin.getUser().email);
			};

			// sign in
			$scope.login = function() {
				console.log($scope.email + ', ' + $scope.password);
				var res = simpleLogin.login($scope.email, $scope.password);
				console.log(simpleLogin.getUser().email);
			};
	  }
  ]);

