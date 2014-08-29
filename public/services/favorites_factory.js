var favoritesFactory = function($http) {
  var factory = {};

  factory.getFavorites = function() {
    return $http.get("/favorites.json");
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
