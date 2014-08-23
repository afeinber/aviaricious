(function() {

    var observationsFactory = function($http) {
      var factory = {};

      factory.getObservations = function(lat, lng) {
        return $http.get("http://ebird.org/ws1.1/data/obs/geo/recent?lng=-71.12&lat=42.20&dist=50&back=30&maxResults=100&locale=en_US&fmt=json");
      };

      factory.getSpeciesObs = function(lat, lng, species) {
        return $http.get('http://ebird.org/ws1.1/data/obs/geo_spp/recent?lng=' + lng +'&lat='+ lat +'&sci='+ species + '&dist=50&back=30&maxResults=500&locale=en_US&fmt=json&includeProvisional=true');
      };

      return factory;
    };

    observationsFactory.$inject = ['$http'];
    angular.module('aviariciousApp').factory('observationsFactory', observationsFactory);
  }
)();
