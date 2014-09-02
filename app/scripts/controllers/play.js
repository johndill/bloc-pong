'use strict';

/*global Firebase */

angular.module('blocPongApp')
  .controller('PlayCtrl', ['$scope', '$firebase',
  	function ($scope, $firebase) {
			var ref = new Firebase('https://dill-bloc-pong.firebaseio.com/');

			// create an angularfire reference to data
			var sync = $firebase(ref);

			// download data into local object
			$scope.data = sync.$asObject();

			$scope.score = {
				'left': 0,
				'right': 0
			};

			$scope.$on('score-right', function() {
				$scope.$apply(function() {
					$scope.score.right++;
				});
			});

			$scope.$on('score-left', function() {
				$scope.$apply(function() {
					$scope.score.left++;
				});
			});
	  }
  ]);
