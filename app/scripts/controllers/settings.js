'use strict';

/*global Firebase */

angular.module('blocPongApp')
  .controller('SettingsCtrl', ['$scope', 'firebaseUrl', 'simpleLogin',
    function ($scope, firebaseUrl, simpleLogin) {
      console.log(simpleLogin);
      var ref = new Firebase(firebaseUrl + 'users/' + simpleLogin.user.uid + '/settings');
      
      // set user to logged in user
      $scope.user = simpleLogin.user;
      
      $scope.test = true;
      
      $scope.toggleSound = function() {
        if ($scope.settings.sound === 'on') {
          $scope.settings.sound = 'off';
        } else {
          $scope.settings.sound = 'on';
        }
      };
      
      $scope.toggleDifficulty = function() {
        if ($scope.settings.difficulty === 'novice') {
          $scope.settings.difficulty = 'expert';
        } else {
          $scope.settings.difficulty = 'novice';
        }
      };
      
      // get settings for logged in user
      ref.on('value', function(snapshot) {
        $scope.settings = snapshot.val();
        console.log($scope.settings.sound === 'on');
      }, function(err) {
        console.log('Error retrieving settings: '  + err.code + ' - ' + err.message);
        $scope.settings = { sound: 'on', difficulty: 'novice' };
      });
    }
  ]);
