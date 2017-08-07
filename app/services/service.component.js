'use strict';
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ServiceController = function () {
  function ServiceController($scope, $http) {
    _classCallCheck(this, ServiceController);

    this.$scope = $scope;
    this.$http = $http;
  }

  _createClass(ServiceController, [{
    key: '$onInit',
    value: function $onInit() {
      var _this = this;

      var path = 'app/services/';
      this.fileName = path + 'default.html';

      // Check if file exists
      this.$scope.$watch('service.type', function () {
        if (!_this.service.type) {
          return;
        }
        var fileName = '' + path + _this.service.type + '.html';
        _this.$http.get(fileName).then(function (result) {
          if (result.data) {
            _this.fileName = fileName;
          }
        });
      });
    }
  }, {
    key: 'callService',
    value: function callService(input, isJSON) {
      var _this2 = this;

      var data = isJSON ? angular.fromJson(input) : input;
      var ROSservice = new ROSLIB.Service({
        ros: ros,
        name: this.service.name,
        serviceType: this.service.type
      });
      var request = new ROSLIB.ServiceRequest(data);

      ROSservice.callService(request, function (result) {
        _this2.result = result;
      });
    }
  }]);

  return ServiceController;
}();

angular.module('roscc').component('ccService', {
  bindings: { service: '=' },
  template: '<ng-include src="$ctrl.fileName"></ng-include>',
  controller: ServiceController,
});
