'use strict';

/*global Firebase */

angular.module('blocPongApp')
  .factory('simpleLogin', ['$firebaseSimpleLogin', 
  	function($firebaseSimpleLogin) { 
  		var ref = new Firebase('https://dill-bloc-pong.firebaseio.com/');
  		return $firebaseSimpleLogin(ref);
  	}
  ]);