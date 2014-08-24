(function() {

    var observationsFactory = function($http, Auth, $location) {
      var factory = {};




      factory.getObservations = function(lat, lng) {
        return Auth.currentUser().then(function(user) {
            return $http.get("http://ebird.org/ws1.1/data/obs/geo/recent?lng="+user.longitude+"&lat="+user.latitude+"&dist=50&back=30&maxResults=100&locale=en_US&fmt=json");
          }, function(err) { $location.path('/'); }
        );
      };

      factory.getSpeciesObs = function(species) {
        return Auth.currentUser().then(function getObs(user) {
          return $http.get('http://ebird.org/ws1.1/data/obs/geo_spp/recent?lng=' + user.longitude +'&lat='+ user.latitude +'&sci='+ species + '&dist=50&back=30&maxResults=500&locale=en_US&fmt=json&includeProvisional=true');
        }, function(err) {
          $location.path('/');
        });
      };

      return factory;
    };

    observationsFactory.$inject = ['$http', 'Auth', '$location'];
    angular.module('aviariciousApp').factory('observationsFactory', observationsFactory);
  }
)();
