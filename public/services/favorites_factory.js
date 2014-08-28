var favoritesFactory = function($http) {
  var factory = {};
  var _favorites = [];
  var count = 0;
  var numCorrect = 0;

  factory.hasFavorites = false;

  factory.getFavorites = function() {
    return $http.get("/favorites.json")
      .success(function(favorites) {
        _favorites = favorites;
        factory.hasFavorites = true;
    });
  };

  factory.getNumCorrect = function() {
    return numCorrect;
  };

  factory.incrementCount = function() {
    numCorrect += 1;
  };

  factory.getCount = function() {
    return count;
  };

  factory.incrementCount = function() {
    count += 1;
  };

  factory.getFour = function() {
    var four = [];
    for(var i=0; i<4; i++) {
      four.push(_favorites[Math.floor(Math.random()*_favorites.length)]);
    }
    return four;
  };

  factory.favorite = function(bird) {
    return $http.post("/birds/" + bird.scientific_name + "/favorite.json");
  };

  factory.unfavorite = function(bird) {
    return $http.delete("/birds/" + bird.id + "/favorite.json");
  };

  return factory;
};


favoritesFactory.$inject = ["$http"];
angular.module("aviariciousApp").factory("favoritesFactory", favoritesFactory);
