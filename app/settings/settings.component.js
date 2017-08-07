'use strict';
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SettingsController = function () {
  function SettingsController(localStorageService, Settings) {
    _classCallCheck(this, SettingsController);

    this.Settings = Settings;

    this.settings = Settings.getSettings() || [Settings.getDefaultSetting()];
    this.index = Settings.getIndex();

    if (!this.index || this.index > this.settings.length) {
      this.index = '0';
    }

    this.save(); // Save current setting again (if it's the first time)
  }

  _createClass(SettingsController, [{
    key: 'save',
    value: function save() {
      this.Settings.save(this.settings, this.index);
    }
  }, {
    key: 'add',
    value: function add() {
      this.settings.push(this.Settings.getDefaultSetting()); // Clone object
      this.index = String(this.settings.length - 1);
      this.save();
    }
  }, {
    key: 'remove',
    value: function remove() {
      this.settings.splice(this.index, 1);
      this.index = '0';

      if (!this.settings.length) {
        this.add();
      }
      this.save();
    }
  }]);

  return SettingsController;
}();

angular.module('roscc').component('ccSettings', {
  templateUrl: 'app/settings/settings.html',
  controller: SettingsController,
});
