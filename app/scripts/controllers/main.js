'use strict';

/**
 * @ngdoc function
 * @name blocPongApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the blocPongApp
 */

/*global Firebase */

angular.module('blocPongApp')
  .controller('MainCtrl', ['$scope', '$firebase',
  	function ($scope, $firebase) {
	    var ref = new Firebase('https://dill-bloc-pong.firebaseio.com/');

	    // create an angularfire reference to data
	    var sync = $firebase(ref);

	    // download data into local object
	    $scope.data = sync.$asObject();
	  }
  ]);
