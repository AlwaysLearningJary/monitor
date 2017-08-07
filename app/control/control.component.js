'use strict';
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var ros = void 0;
var isConnected = false;
var isValid = false;
var isgetjson = 0;

var ControlController = function () {
  function ControlController($timeout, $interval, $http, Settings, Domains, Md5) {
    var _this = this;

    _classCallCheck(this, ControlController);

    this.$timeout = $timeout;
    this.$http = $http;
    this.Domains = Domains;   
    this.isConnected = isConnected;
    this.isValid = isValid;
    this.setting = Settings.get();
    this.maxConsoleEntries = 200;
    this.validcode = '';
    if(this.setting.verificationCode){   
    this.validcode = Md5.hex_md5(this.setting.verificationCode);
    }

  //  _this.$http.get('app/nodelist.json').then(function (result) {
  //        
   //         this.nodelist = result.data;
//	    this.isgetjson = 100;

    //    });
            
    this.nodelist=[
    { "id": 1, "nodename": "fault_detection" },
    { "id": 2, "nodename": "pub_node1" },
    { "id": 3, "nodename": "pub_node2" },
    { "id": 4, "nodename": "pub_node3" },
    { "id": 5, "nodename": "pub_node4" },
    { "id": 6, "nodename": "pub_node5" }
]

          
    
    
    if(this.validcode == 'f5b7ae269db9e1b3185a8ad8bd37bc79'){
	isValid = true;
        this.isValid = isValid;
    }
    if(this.validcode != 'f5b7ae269db9e1b3185a8ad8bd37bc79'){
	isValid = false;
        this.isValid = isValid;
    }


    // Load ROS connection and keep trying if it fails
    this.newRosConnection();
    $interval(function () {
      _this.newRosConnection();
    }, 1000); // [ms]

    this.resetData();
    if (isConnected) {
      this.onConnected();
    }
  }

  // The active domain shows further information in the center view


  _createClass(ControlController, [{
    key: 'setActiveDomain',
    value: function setActiveDomain(domain) {
      this.activeDomain = domain;
    }
  }, {
    key: 'getDomains',
    value: function getDomains() {
      var allData = this.data.topics.concat(this.data.services, this.data.nodes);
      var domains = this.Domains.getDomains(allData);

      if (!this.activeDomain) {
        this.setActiveDomain(domains[0]);
      }
      return domains;
    }
  }, {
    key: 'hasFilteredDomains',
    value: function hasFilteredDomains(advanced) {
      var _this2 = this;

      return _.some(_.map(this.getDomains(), function (dom) {
        return _this2.Domains.filterAdvanced(dom, advanced);
      }));
    }
  }, {
    key: 'getGlobalParameters',
    value: function getGlobalParameters() {
      return this.Domains.getGlobalParameters(this.data.parameters);
    }
  }, {
    key: 'resetData',
    value: function resetData() {
      this.data = {
        rosout: [],
        topics: [],
        nodes: [],
        parameters: [],
        services: []
      };
    }
  }, {
    key: 'newRosConnection',
    value: function newRosConnection() {
      var _this3 = this;

      if (isConnected || this.setting === angular.isUndefined) {
        return;
      }

      if (ros) {
        ros.close(); // Close old connection
        ros = false;
        return;
      }

      ros = new ROSLIB.Ros({ url: 'ws://' + this.setting.address + ':' + this.setting.port });

      ros.on('connection', function () {
        _this3.onConnected();
        isConnected = true;
        _this3.isConnected = isConnected;
      });

      ros.on('error', function () {
        isConnected = false;
        _this3.isConnected = isConnected;
      });

      ros.on('close', function () {
        isConnected = false;
        _this3.isConnected = isConnected;
      });
    }
  }, {
    key: 'onConnected',
    value: function onConnected() {
      var _this4 = this;

      // wait a moment until ROS is loaded and initialized
      this.$timeout(function () {
        _this4.loadData();

        _this4.setConsole();
        _this4.setSysStatus();
        if (_this4.setting.cmdvel) {
          _this4.setCmdvel();
        }
        if (_this4.setting.fix) {
          _this4.setFix();
        }
        if (_this4.setting.lowspeed) {
          _this4.setLowspeed();
        }
        if (_this4.setting.globalplan) {
          _this4.setGlobalplan();
        }
        if (_this4.setting.battery) {
          _this4.setBattery();
        }
      }, 400); // [ms]
    }

    // Setup of console (in the right sidebar)

  }, {
    key: 'setConsole',
    value: function setConsole() {
      var _this5 = this;

      var consoleTopic = new ROSLIB.Topic({
        ros: ros,
        name: this.setting.log,
        messageType: 'rosgraph_msgs/Log'
      });
      consoleTopic.subscribe(function (message) {
        var nameArray = message.name.split('/');
        var d = new Date(message.header.stamp.secs * 1E3 + message.header.stamp.nsecs * 1E-6);

        message.abbr = nameArray.length > 1 ? nameArray[1] : message.name;

        // String formatting of message time and date
        function addZero(i) {
          return i < 10 ? '0' + i : '' + i;
        }
        message.dateString = addZero(d.getHours()) + ':\n      ' + addZero(d.getMinutes()) + ':\n      ' + addZero(d.getSeconds()) + '.\n      ' + addZero(d.getMilliseconds());
        _this5.data.rosout.unshift(message);

        if (_this5.data.rosout.length > _this5.maxConsoleEntries) {
          _this5.data.rosout.pop();
        }
      });
    }

    // Setup cmd_vel

  }, {
    key: 'setSysStatus',
    value: function setSysStatus() {
      var _this12 = this;
      _this12.sysstatusStatus = 0;

      var sysstatusTopic = new ROSLIB.Topic({
        ros: ros,
        name: '/system_status',
        messageType: 'std_msgs/Int8MultiArray'
      });
      sysstatusTopic.subscribe(function (message) {
        _this12.sysstatusStatus = message;
      });
    }

    // Setup cmd_vel

  }, {
    key: 'setCmdvel',
    value: function setCmdvel() {
      var _this6 = this;

      var cmdvelTopic = new ROSLIB.Topic({
        ros: ros,
        name: this.setting.cmdvelTopic,
        messageType: 'geometry_msgs/Twist'
      });
      cmdvelTopic.subscribe(function (message) {
        _this6.cmdvelStatus = message;
      });
    }

    // Load structure, all data, parameters, topics, services, nodes...

  }, {
    key: 'setFix',
    value: function setFix() {
      var _this7 = this;

      var fixTopic = new ROSLIB.Topic({
        ros: ros,
        name: this.setting.fixTopic,
        messageType: 'sensor_msgs/NavSatFix'
      });
      fixTopic.subscribe(function (message) {
        _this7.fixStatus = message;
      });
    }

    // Load structure, all data, parameters, topics, services, nodes...

  }, {
    key: 'setLowspeed',
    value: function setLowspeed() {
      var _this8 = this;

      var lowspeedTopic = new ROSLIB.Topic({
        ros: ros,
        name: this.setting.lowspeedTopic,
        messageType: 'std_msgs/Int8'
      });
      lowspeedTopic.subscribe(function (message) {
        _this8.lowspeedStatus = message;
      });
    }

    // Load structure, all data, parameters, topics, services, nodes...

  }, {
    key: 'publishLowspeed',
    value: function publishLowspeed(input, isJSON) {
      var lowspeedpubTopic = new ROSLIB.Topic({
        ros: ros,
        name: this.setting.lowspeedTopic,
        messageType: 'std_msgs/Int8'
      });
      var data = isJSON ? angular.fromJson(input) : input;
      var message = new ROSLIB.Message(data);
      lowspeedpubTopic.publish(message);
    }

    // Load structure, all data, parameters, topics, services, nodes...

  }, {
    key: 'setGlobalplan',
    value: function setGlobalplan() {
      var _this9 = this;

      var globalplanTopic = new ROSLIB.Topic({
        ros: ros,
        name: this.setting.globalplanTopic,
        messageType: 'nav_msgs/Path'
      });
      globalplanTopic.subscribe(function (message) {
        _this9.globalplanStatus = message;
      });

    }

    // Load structure, all data, parameters, topics, services, nodes...

  }, {
    key: 'setBattery',
    value: function setBattery() {
      var _this10 = this;

      var batteryTopic = new ROSLIB.Topic({
        ros: ros,
        name: this.setting.batteryTopic,
        messageType: 'std_msgs/Float32'
      });
      batteryTopic.subscribe(function (message) {
        _this10.batteryStatus = message.data;
      });
    }

    // Load structure, all data, parameters, topics, services, nodes...

  }, {
    key: 'loadData',
    value: function loadData() {
      var _this11 = this;

      this.resetData();

      ros.getTopics(function (topics) {
        // Topics now has topics and types arrays
        angular.forEach(topics.topics, function (name) {
          _this11.data.topics.push({ name: name });

          ros.getTopicType(name, function (type) {
            _.findWhere(_this11.data.topics, { name: name }).type = type;
          });
        });
      });

      ros.getServices(function (services) {
        angular.forEach(services, function (name) {
          _this11.data.services.push({ name: name });

          ros.getServiceType(name, function (type) {
            _.findWhere(_this11.data.services, { name: name }).type = type;
          });
        });
      });

      ros.getParams(function (params) {
        angular.forEach(params, function (name) {
          var param = new ROSLIB.Param({ ros: ros, name: name });
          _this11.data.parameters.push({ name: name });

          param.get(function (value) {
            _.findWhere(_this11.data.parameters, { name: name }).value = value;
          });
        });
      });

      ros.getNodes(function (nodes) {
        angular.forEach(nodes, function (name) {
          _this11.data.nodes.push({ name: name });
        });
      });
    }
  }]);

  return ControlController;
}();

angular.module('roscc').component('ccControl', {
  templateUrl: 'app/control/control.html',
  controller: ControlController,
});
