(function() {
  var scoreFactory = function($http) {
    var factory = {};

    factory.getScores = function() {
      return $http.get('/scores.json');
    };

    factory.createScore = function(percent) {
      return $http.post('/scores.json', {
        score: {
          percent: percent
        }
      });
    };
    return factory;
  };

  scoreFactory.$inject = ['$http'];

  angular.module("aviariciousApp").
    factory("scoreFactory", scoreFactory);
})();
