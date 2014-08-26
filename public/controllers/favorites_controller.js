var FavoritesController = function($scope, favoritesFactory, Auth, $route) {
  // favoritesFactory.getFour()
  //   .success(function(four) {
  //     $scope.four = four;
  //     $scope.song = four[Math.floor(Math.random() * 4)].song;
  //   });

  if(!favoritesFactory.hasFavorites) {
    favoritesFactory.getFavorites()
      .success(function() {
        $scope.four = favoritesFactory.getFour();
        $scope.answer = Math.floor(Math.random() *4);
        $scope.song = $scope.four[$scope.answer].song;
        playSong($scope.song);
      });
  } else {
    $scope.four = favoritesFactory.getFour();
    $scope.answer = Math.floor(Math.random() *4);
    $scope.song = $scope.four[$scope.answer].song;
    playSong($scope.song);
    //setupSoundManager($scope.song);
  }

  $scope.pick = function($event) {

    soundManager.destroySound('aSound');
    if($($event.target).data('id') === $scope.answer) {
      $($event.target).parent().css('background', 'green');
      $($event.target).css('opacity', 0.2);
    } else {
      $($event.target).parent().css('background','red');
      $($event.target).css('opacity', 0.2);
    }

    setTimeout(function() { $route.reload(); }, 1000);
  };

  function setupSoundManager(song) {
    soundManager.setup({
      url: '../js/swf',
      flashVersion: 9, // optional: shiny features (default = 8)
      // optional: ignore Flash where possible, use 100% HTML5 mode
      preferFlash: false,
      // onready: function() {
      //   var mySound = soundManager.createSound({
      //        id: 'aSound',
      //        url: song
      //      });
      //      mySound.play();
      // }
    });
  }

  function playSong(song) {
    var mySound = soundManager.createSound({
      id: 'aSound',
      url: song
    });
    mySound.play();
  }
  $scope.$on("$routeChangeStart", function() {
    soundManager.destroySound('aSound');
  });

};

FavoritesController.$inject = ["$scope", "favoritesFactory", "Auth", "$route"];
angular.module("aviariciousApp").controller("FavoritesController", FavoritesController);
