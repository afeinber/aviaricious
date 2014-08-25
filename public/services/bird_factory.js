var birdFactory = function($http) {
  var factory = {};

  factory.getBirds = function() {
    return $http.get('/birds.json');
  };
  factory.getBird = function(id) {
    return $http.get('/birds/' + id + '.json');
  };

  return factory;
};

birdFactory.$inject = ['$http'];

angular.module('aviariciousApp').factory('birdFactory', birdFactory);
