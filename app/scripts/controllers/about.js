'use strict';

/**
 * @ngdoc function
 * @name blocPongApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the blocPongApp
 */
angular.module('blocPongApp')
  .controller('AboutCtrl', ['$scope', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
