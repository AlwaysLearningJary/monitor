'use strict';
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TopicController = function () {
  function TopicController($scope, $http, Settings, Quaternions) {
    _classCallCheck(this, TopicController);

    this.$scope = $scope;
    this.$http = $http;
    this.setting = Settings.get();
    this.Quaternions = Quaternions;

    this.isSubscribing = false;
  }

  _createClass(TopicController, [{
    key: '$onInit',
    value: function $onInit() {
      var _this = this;

      this.roslibTopic = new ROSLIB.Topic({
        ros: ros,
        name: this.topic.name,
        messageType: this.topic.type
      });

      var path = 'app/topics/';
      this.fileName = path + 'default.html';

      // Check if file exists
      this.$scope.$watch('topic.type', function () {
        if (!_this.topic.type) {
          return;
        }
        var fileName = '' + path + _this.topic.type + '.html';
        _this.$http.get(fileName).then(function (result) {
          if (result.data) {
            _this.fileName = fileName;
          }
        });
      });
    }
  }, {
    key: 'toggleSubscription',
    value: function toggleSubscription(data) {
      var _this2 = this;

      if (!data) {
        this.roslibTopic.subscribe(function (message) {
          _this2.message = message;
        });
      } else {
        this.roslibTopic.unsubscribe();
      }
      this.isSubscribing = !data;
    }
  }, {
    key: 'publishMessage',
    value: function publishMessage(input, isJSON) {
      var data = isJSON ? angular.fromJson(input) : input;
      var message = new ROSLIB.Message(data);
      this.roslibTopic.publish(message);
    }
  }]);

  return TopicController;
}();

angular.module('roscc').component('ccTopic', {
  bindings: { topic: '=' },
  template: '<ng-include src="$ctrl.fileName"></ng-include>',
  controller: TopicController,
});
