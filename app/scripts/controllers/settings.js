'use strict';

angular.module('blocPongApp')
  .controller('SettingsCtrl', ['$scope', '$rootScope', 'simpleLogin', '$location',
    function ($scope, $rootScope, simpleLogin, $location) {

      // get settings for logged in user
      $scope.settings = $rootScope.settings;
      
      $scope.toggleSound = function() {
        if ($scope.settings.sound === 'on') {
          $scope.settings.sound = 'off';
          $rootScope.ref
            .child('users')
            .child(simpleLogin.user.uid)
            .child('settings')
            .child('sound')
            .set('off');
          $location.path('settings');
        } else {
          $scope.settings.sound = 'on';
          $rootScope.ref
            .child('users')
            .child(simpleLogin.user.uid)
            .child('settings')
            .child('sound')
            .set('on');
          $location.path('settings');
        }
      };
      
      $scope.toggleDifficulty = function() {
        if ($scope.settings.difficulty === 'novice') {
          $scope.settings.difficulty = 'expert';
          $rootScope.ref
            .child('users')
            .child(simpleLogin.user.uid)
            .child('settings')
            .child('difficulty')
            .set('expert');
          $location.path('settings');
        } else {
          $scope.settings.difficulty = 'novice';
          $rootScope.ref
            .child('users')
            .child(simpleLogin.user.uid)
            .child('settings')
            .child('difficulty')
            .set('novice');
          $location.path('settings');
        }
      };
    }
  ]);
