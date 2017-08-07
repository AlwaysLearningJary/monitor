'use strict';
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NavbarController = function () {
  function NavbarController($location) {
    _classCallCheck(this, NavbarController);

    this.$location = $location;
  }

  _createClass(NavbarController, [{
    key: 'isPath',
    value: function isPath(path) {
      return this.$location.path() === path;
    }
  }]);

  return NavbarController;
}();

angular.module('roscc').component('ccNavbar', {
  templateUrl: 'app/navbar/navbar.html',
  controller: NavbarController,
});
