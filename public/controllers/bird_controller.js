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

  birdFactory.getBird($location.search().sciName)
    .success(function(bird) {
      $scope.bird = bird.bird;
      $scope.song = $sce.trustAsResourceUrl(bird.bird.song);
      $scope.isFavorite = bird.favorite;
      if($scope.isFavorite) { $('#fav-heart').css('color', 'tomato'); }
      isBusy = false;
    })
    .error(function(err) {
      flashFactory.setMessage("Something went wrong. Please try refresing");
      $route.reload();
    });

  // $scope.$on('$viewContentLoaded', function() {
  //  $scope.showSidebar();
  // });

  $scope.play = function() {
    var birdSong = $('#bird-song')[0];
    if(birdSong.paused) {
      $('.fa.fa-play').toggleClass('fa-play fa-pause');
      birdSong.play();
    } else {
      $('.fa.fa-pause').toggleClass('fa-play fa-pause');
      birdSong.pause();
    }
  };

  $scope.favorite = function() {
    //make sure you don't favorite something twice before the server responds
    if(!isBusy) {
      isBusy = true;
      if($scope.isFavorite) {
        favoritesFactory.unfavorite($scope.bird)
          .success(function() {
            isBusy = false;
            $('#fav-heart').css('color', '');
            $scope.isFavorite = false;
          });
      } else {
        favoritesFactory.favorite($scope.bird)
          .success(function() {
            isBusy = false;
            $('#fav-heart').css('color', 'tomato');
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
