var FavoritesController = function(scoreFactory, $location, $sce, $scope, favoritesFactory, Auth, $route) {

  var gameLength = 10;

  if(!favoritesFactory.hasFavorites) {
    favoritesFactory.getFavorites()
      .success(function() {
        $scope.four = favoritesFactory.getFour();
        $scope.answer = Math.floor(Math.random() *4);
        $scope.song = $sce.trustAsResourceUrl($scope.four[$scope.answer].song);

      });
  } else {
    $scope.four = favoritesFactory.getFour();
    $scope.answer = Math.floor(Math.random() *4);
    $scope.song = $sce.trustAsResourceUrl($scope.four[$scope.answer].song);

  }

  $scope.pick = function($event) {
    favoritesFactory.incrementCount();
    if(favoritesFactory.getCount() >= gameLength) {
      scoreFactory.createScore((favoritesFactory.getNumCorrect() / gameLength) * 100)
        .success(function() {
          $location.path("/scores");
        });
    }

    if($($event.target).data('id') === $scope.answer) {
      favoritesFactory.incrementNumCorrect();
      $($event.target).parent().css('background', 'green');
      $($event.target).css('opacity', 0.2);
    } else {
      $($event.target).parent().css('background','red');
      $('*[data-id=' + $scope.answer +']').parent().css('background', 'green');
      $($event.target).css('opacity', 0.2);
      $('*[data-id=' + $scope.answer +']').css('opacity', 0.2);
    }

    //reload the page with new birds
    setTimeout(function() { $route.reload(); }, 1000);
  };

  $scope.$on("$routeChangeStart", function() {
    $("#bird-song")[0].pause();
  });

};

FavoritesController.$inject = ["scoreFactory", "$location", "$sce", "$scope", "favoritesFactory", "Auth", "$route"];
angular.module("aviariciousApp").controller("FavoritesController", FavoritesController);
