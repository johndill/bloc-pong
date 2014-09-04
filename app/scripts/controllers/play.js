'use strict';

/*global Firebase */

angular.module('blocPongApp')
  .controller('PlayCtrl', ['$scope', '$firebase', '$rootScope', '$location',
  	function ($scope, $firebase, $rootScope, $location) {
			var ref = new Firebase('https://dill-bloc-pong.firebaseio.com/');

			// create an angularfire reference to data
			var sync = $firebase(ref);

			// download data into local object
			$scope.data = sync.$asObject();

			$scope.gameOver = false;

			$rootScope.paused = false;

			$scope.score = {
				'left': 0,
				'right': 0
			};

			$scope.play = function() {
				$location.path('menu');
				$location.path('play');
			};

			$scope.gotoMenu = function() {
				$rootScope.paused = true;
				$location.path('menu');
			};

			$scope.togglePlayPause = function() {
				$rootScope.$broadcast('toggle-play-pause');
			};

			$scope.$on('score-right', function() {
				$scope.$apply(function() {
					$scope.score.right++;
					if ($scope.score.right === 15) {
						$rootScope.paused = true;
						$scope.gameOver = 'Win';
						$rootScope.$broadcast('game-over-win');
					}
				});
			});

			$scope.$on('score-left', function() {
				$scope.$apply(function() {
					$scope.score.left++;
					if ($scope.score.left === 15) {
						$rootScope.paused = true;
						$scope.gameOver = 'Lose';
						$rootScope.$broadcast('game-over-lose');
					}
				});
			});
	  }
  ]);
