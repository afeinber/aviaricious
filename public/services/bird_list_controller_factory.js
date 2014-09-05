//this will be the parent controller for BirdsController and FavoritesController
var birdListControllerFactory = function() {

  factory = {};

  factory.controllerProto = function($scope, someFactory, $location, Auth) {
    $scope.birds = [];
    $scope.birds_busy = true;
    $scope.numShown = 20;

    Auth.currentUser();

    $scope.loadMore = function() {
      $scope.numShown += 1;
    };

    $scope.photoUrl = function(bird) {
      return bird.photo_url || '../images/not_available.jpg';
    };

    function init() {
      //the factory must implement a getBirds function
      someFactory.getBirds()
        .success(function(birds){
          $scope.birds = birds;
          $scope.birds_busy = false;
        })
        .error(function(data, status) {
          console.log("There was an error getting the birds with status " + status);
      });
    }
    init();
  };
  return factory;
};

angular.module('aviariciousApp').factory(
  'birdListControllerFactory',
  birdListControllerFactory
);
