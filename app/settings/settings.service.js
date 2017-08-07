'use strict';
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SettingsService = function () {
  function SettingsService($location, localStorageService) {
    _classCallCheck(this, SettingsService);

    this.$location = $location;
    this.localStorageService = localStorageService;
  }

  _createClass(SettingsService, [{
    key: 'load',
    value: function load() {
      console.log("asdf");
      this.index = this.localStorageService.get('selectedSettingIndex');
      this.settings = this.localStorageService.get('settings');
      if (this.settings && this.index) {
        this.setting = this.settings[this.index];
      }

      // If there are no saved settings, redirect to /settings for first setting input
      if (!this.setting) {
        this.$location.path('/settings').replace();
      }
    }
  }, {
    key: 'save',
    value: function save(newSettings, newIndex) {
      this.settings = newSettings;
      this.index = newIndex;
      this.localStorageService.set('selectedSettingIndex', newIndex);
      this.localStorageService.set('settings', newSettings);
    }
  }, {
    key: 'get',
    value: function get() {
      if (!this.setting) {
        this.load();
      }

      return this.setting;
    }
  }, {
    key: 'getIndex',
    value: function getIndex() {
      if (!this.setting) {
        this.load();
      }

      return this.index;
    }
  }, {
    key: 'getSettings',
    value: function getSettings() {
      if (!this.setting) {
        this.load();
      }

      return this.settings;
    }
  }, {
    key: 'getDefaultSetting',
    value: function getDefaultSetting() {
      return {
	verificationCode:'',
        name: 'Robot Name',
        address: '127.0.0.1', // use localhost
        port: 9090, // default port of rosbridge_server
        log: '/rosout',
        cmdvel: true,
        cmdvelTopic: '/cmd_vel',
        fix: true,
        fixTopic: '/fix',
        lowspeed: true,
        lowspeedTopic: '/lowspeed',
        globalplan: true,
        globalplanTopic: '/global_path_planner/global_plan',
        battery: false,
        batteryTopic: '',
        imagePreview: { port: 0, quality: 70, width: 640, height: 480 },
        advanced: false,
        showall: false,
      };
    }
  }]);

  return SettingsService;
}();

angular.module('roscc').service('Settings', SettingsService);
