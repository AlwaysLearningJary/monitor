'use strict';
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ParameterController = function () {
  function ParameterController() {
    _classCallCheck(this, ParameterController);
  }

  _createClass(ParameterController, [{
    key: '$onInit',
    value: function $onInit() {
      this.param = new ROSLIB.Param({ ros: ros, name: this.parameter.name });
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      this.param.set(value);
    }
  }]);

  return ParameterController;
}();

angular.module('roscc').component('ccParameter', {
  bindings: { parameter: '=' },
  templateUrl: 'app/parameters/parameters.html',
  controller: ParameterController,
});
