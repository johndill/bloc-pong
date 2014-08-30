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
        templateUrl: 'views/menu.html',
        controller: 'MenuCtrl'
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
        templateUrl: 'views/play.html',
        controller: 'PlayCtrl'
      })
			.when('/settings', {
				templateUrl: 'views/settings.html',
				controller: 'SettingsCtrl'
			})
      .otherwise({
        redirectTo: '/'
      });
  }])
  .config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode(false);
  }])
  .run(['$rootScope', '$location', 'simpleLogin', function ($rootScope, $location, simpleLogin) {
    $rootScope.$on('$routeChangeStart', function() {
      if (!simpleLogin.user) { $location.path('login'); }
    });
  }])
  .constant('firebaseUrl', 'https://dill-bloc-pong.firebaseio.com/');