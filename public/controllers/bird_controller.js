var BirdController = function(
  $sce,
  $scope,
  birdFactory,
  $location,
  flashFactory,
  Auth,
  $route,
  favoritesFactory
) {

  //make sure that you dont favorite something while the server is responding.
  var isBusy = true;

  //start off in paused state
  $scope.playClass = 'fa fa-play';

  angular.element("#bird-song").bind('ended', function(){
      // done playing
      $scope.$apply(function() {
        $scope.playClass = 'fa fa-play';
      });
  });


  birdFactory.getBird($location.search().sciName)
    .success(function(bird) {
      $scope.bird = bird.bird;
      $scope.song = $sce.trustAsResourceUrl(bird.bird.song);
      $scope.isFavorite = bird.favorite;
      isBusy = false;
    })
    .error(function(err) {
      flashFactory.setMessage("Something went wrong. Please try refresing");
      $route.reload();
    });

  $scope.play = function() {
    //sorry for the jQuery...
    var birdSong = angular.element('#bird-song')[0];
    if(birdSong.paused) {
      $scope.playClass = 'fa fa-pause';
      birdSong.play();
    } else {
      $scope.playClass = 'fa fa-play';
      birdSong.pause();
    }
  };

  $scope.heartStyle = function() {
    return ($scope.isFavorite ? {'color': 'tomato'} : {});
  };

  $scope.favorite = function() {
    //make sure you don't favorite something twice before the server responds
    if(!isBusy) {
      isBusy = true;
      if($scope.isFavorite) {
        favoritesFactory.unfavorite($scope.bird)
          .success(function() {
            isBusy = false;
            $scope.isFavorite = false;
          });
      } else {
        favoritesFactory.favorite($scope.bird)
          .success(function() {
            isBusy = false;
            $scope.isFavorite = true;

          });
      }
    }
  };
};

BirdController.$inject = [
  "$sce",
  "$scope",
  "birdFactory",
  "$location",
  "flashFactory",
  "Auth",
  "$route",
  "favoritesFactory"
];
angular.module("aviariciousApp").controller("BirdController", BirdController);
