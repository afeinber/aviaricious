(function() {

    var observationsFactory = function($http) {
      var factory = {};

      factory.getObservations = function() {
        return $http.get("http://ebird.org/ws1.1/data/obs/geo/recent?lng=-76.51&lat=42.46&dist=50&back=30&maxResults=100&locale=en_US&fmt=json");
      };

      return factory;
    };

    observationsFactory.$inject = ['$http'];
    angular.module('aviariciousApp').factory('observationsFactory', observationsFactory);
  }
)();
