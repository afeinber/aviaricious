var BirdController = function($scope, birdFactory, $location, flashFactory, Auth) {
  birdFactory.getBird($location.search().sciName)
    .success(function(bird) {
      $scope.bird = bird;
    })
    .error(function(err) {
      flashFactory.setMessage("Something went wrong. Please try refresing");
    });

  Auth.currentUser().
    then(function(user) {
      $scope.user = user;
    }, function(err) {
      $location.path("/");
    });
};

BirdController.$inject = ["$scope", "birdFactory", "$location", "flashFactory", "Auth"];
angular.module("aviariciousApp").controller("BirdController", BirdController);
