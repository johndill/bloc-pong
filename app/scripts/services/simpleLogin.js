'use strict';

/*global Firebase */

angular.module('blocPongApp')
  .factory('simpleLogin', ['$firebaseSimpleLogin', '$rootScope', function($firebaseSimpleLogin, $rootScope) { 
  	var ref = new Firebase('https://dill-bloc-pong.firebaseio.com/');
  	var auth = $firebaseSimpleLogin(ref);

  	var fns = {
  		user: null,

  		getUser: function() {
  			return auth.$getCurrentUser();
  		},

  		login: function(email, password) {
  			return auth.$login('password', {
  				email: email,
  				password: password,
  				rememberMe: true
  			});
  		},

  		logout: function() {
  			auth.$logout();
  		},

  		createAccount: function(email, password) {
  			return auth.$createUser(email, password)
  				.then(function() {
  					return fns.login(email, password);
  				});
  		}
  	};

  	return fns;

  	$rootScope.$on('$firebaseSimpleLogin:error', function(event, error) {
  		$rootScope.loginError = error.message;
  	});
  }]);