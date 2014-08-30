'use strict';

/**
 * @ngdoc overview
 * @name blocPongApp
 * @description
 * # blocPongApp
 *
 * Main module of the application.
 */
angular
  .module('blocPongApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/menu', {
        templateUrl: 'views/menu.html',
        controller: 'MenuCtrl'
      })
      .when('/play', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
			.when('/settings', {
				templateUrl: 'views/settings.html',
				controller: 'SettingsCtrl'
			})
      .otherwise({
        redirectTo: '/'
      });
  }])
  .constant('firebaseUrl', 'https://dill-bloc-pong.firebaseio.com/');