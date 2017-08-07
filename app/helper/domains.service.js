'use strict';
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var DomainsService = function () {
  function DomainsService() {
    _classCallCheck(this, DomainsService);
  }

  _createClass(DomainsService, [{
    key: 'filterAdvanced',
    value: function filterAdvanced(entry, advanced) {
      if (advanced) {
        return true;
      }

      var entryArray = entry.split('/');
      if (!entry || _.isEmpty(entryArray)) {
        return false;
      }

      // Don't show the default nodes, params, topics and services
      return !_.contains(['rosapi', 'rosbridge_websocket', 'rosout', 'rosout_agg', 'rosversion', 'run_id', 'rosdistro', 'get_loggers', 'set_logger_level'], _.last(entryArray));
    }
  }, {
    key: 'getDomains',
    value: function getDomains(array) {
      var result = [];
      angular.forEach(array, function (entry) {
        var nameArray = entry.name.split('/');
        if (nameArray.length > 1) {
          result.push(nameArray[1]);
        }
      });
      return _.uniq(result).sort();
    }
  }, {
    key: 'getGlobalParameters',
    value: function getGlobalParameters(array) {
      var result = [];
      angular.forEach(array, function (entry) {
        var nameArray = entry.name.split('/');
        if (nameArray.length === 2) {
          entry.abbr = _.last(nameArray);
          result.push(entry);
        }
      });
      return result;
    }
  }, {
    key: 'getDataForDomain',
    value: function getDataForDomain(array, domainName, advanced) {
      var _this = this;

      var result = [];
      angular.forEach(array, function (entry) {
        var nameArray = entry.name.split('/');
        if (nameArray.length > 1 && nameArray[1] === domainName && _this.filterAdvanced(entry.name, advanced)) {
          entry.abbr = nameArray.slice(2).join(' ');
          result.push(entry);
        }
      });
      return result;
    }
  }]);

  return DomainsService;
}();

// Filter advanced topics, services, parameters by checking the beginning capital letter
angular.module('roscc').service('Domains', DomainsService);
