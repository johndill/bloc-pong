'use strict';

angular.module('blocPongApp')
  .controller('MenuCtrl', ['$scope', '$location', 'simpleLogin',
		function ($scope, $location, simpleLogin) {
			$scope.gotoView = function(hash) {
				console.log(hash);
				$location.path(hash);
			};

			$scope.logout = function() {
				simpleLogin.$logout();
				$location.path('login');
			};
	  }
  ]);

