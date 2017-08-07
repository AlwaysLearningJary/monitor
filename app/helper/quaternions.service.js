'use strict';
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QuaternionsService = function () {
  function QuaternionsService() {
    _classCallCheck(this, QuaternionsService);
  }

  _createClass(QuaternionsService, [{
    key: 'getRoll',
    value: function getRoll(q) {
      if (!q) {
        return '';
      }
      var rad = Math.atan2(2 * (q.w * q.x + q.y * q.z), 1 - 2 * (q.x * q.x + q.y * q.y));
      return 180 / Math.PI * rad;
    }
  }, {
    key: 'getPitch',
    value: function getPitch(q) {
      if (!q) {
        return '';
      }
      var rad = Math.asin(2 * (q.w * q.y - q.z * q.x));
      return 180 / Math.PI * rad;
    }
  }, {
    key: 'getYaw',
    value: function getYaw(q) {
      if (!q) {
        return '';
      }
      var rad = Math.atan2(2 * (q.w * q.z + q.x * q.y), 1 - 2 * (q.y * q.y + q.z * q.z));
      return 180 / Math.PI * rad;
    }
  }, {
    key: 'getInit',
    value: function getInit() {
      return { w: 1, x: 0, y: 0, z: 0 };
    }
  }]);

  return QuaternionsService;
}();

// Quaternions to Euler angles converter
angular.module('roscc').service('Quaternions', QuaternionsService);
