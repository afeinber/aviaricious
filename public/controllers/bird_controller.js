var BirdController = function($scope, birdFactory, $location, flashFactory, Auth, $route, favoritesFactory) {

  var isBusy = true;

  birdFactory.getBird($location.search().sciName)
    .success(function(bird) {
      $scope.bird = bird.bird;
      $scope.isFavorite = bird.favorite;
      if($scope.isFavorite) { $('#fav-heart').css('color', 'tomato'); }
      isBusy = false;
    })
    .error(function(err) {
      flashFactory.setMessage("Something went wrong. Please try refresing");
      $route.reload();
    });

  Auth.currentUser().
    then(function(user) {
      $scope.user = user;
    }, function(err) {
      $location.path("/");

    });

  $scope.favorite = function() {
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
  soundManager.setup({
      url: "../js/swf" ,
    });


    // $scope.$on('$viewContentLoaded', function() {
    //   $(document).trigger('readyToPlay');
    // });
};

BirdController.$inject = ["$scope", "birdFactory", "$location", "flashFactory", "Auth", "$route", "favoritesFactory"];
angular.module("aviariciousApp").controller("BirdController", BirdController);
