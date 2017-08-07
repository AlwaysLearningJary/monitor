'use strict';


angular.module('roscc').component('ccLogin', {
  templateUrl: 'app/login/login.html',
  controller: function LoginController($scope, $rootScope, AUTH_EVENTS, AuthService) {
	  $scope.credentials = {
	    username: '',
	    password: ''
	  };
	  $scope.login = function (credentials) {
	    AuthService.login(credentials).then(function (user) {
	      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
	      $scope.setCurrentUser(user);
	    }, function () {
	      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
	    });
	  };javascript:void(0);
	}
});





