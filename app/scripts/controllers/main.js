'use strict';

/**
 * @ngdoc function
 * @name blocPongApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the blocPongApp
 */
angular.module('blocPongApp')
  .controller('MainCtrl', ['$scope', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
