var GameController = function(
  scoreFactory,
  $location,
  $sce,
  $scope,
  birdFactory,
  Auth,
  $route
) {


  var gameLength = 10;
  var roundCount = 0;
  var numCorrect = 0;
  loadNewBirds();


  //get four more birds from the factory.
  function loadNewBirds() {
    $('.img-holder').css('background', "");
    $('.game-bird').css('opacity', '');

    birdFactory.getBirds()
      .then(function(birds){
        birds = birds.data;
        $scope.four = getSome(birds, 4);
        $scope.answer = Math.floor(Math.random() *4);
        $scope.song = $sce.trustAsResourceUrl($scope.four[$scope.answer].song);
      });
  }

  function getSome(arr, num) {
    var some = [];
    for(var i=0; i<num; i++) {
      some.push(arr[Math.floor(Math.random() * arr.length)]);
    }
    return some;
  }

  // $scope.$on('$viewContentLoaded', function() {
  //  $scope.showSidebar();
  // });

  $scope.pick = function($event) {
    if($("#bird-song")[0].pause) {
      $("#bird-song")[0].pause();
    }
    roundCount++;

    if(roundCount >= gameLength) {
      scoreFactory.createScore((numCorrect / gameLength) * 100)
        .success(function() {
          $location.path('/scores');
        });
    }

    if($($event.target).data('id') === $scope.answer) {
      //user guessed correctly
      numCorrect++;
      $($event.target).parent().css('background', 'green');
      $($event.target).css('opacity', 0.2);

    } else {
      //user guessed incrrectly
      $($event.target).parent().css('background','red');
      //make correct image green
      $('*[data-id=' + $scope.answer +']').parent().css('background', 'green');
      $($event.target).css('opacity', 0.2);
      $('*[data-id=' + $scope.answer +']').css('opacity', 0.2);

    }

    //reload the page with new birds
    setTimeout(function() { loadNewBirds(); }, 1000);
  };

  //make sure we stop the song on new route
  $scope.$on("$routeChangeStart", function() {
    if($("#bird-song")[0].pause) {
      $("#bird-song")[0].pause();
    }
  });

};

GameController.$inject = [
  "scoreFactory",
  "$location",
  "$sce",
  "$scope",
  "birdFactory",
  "Auth",
  "$route"
];
angular.module("aviariciousApp").controller("GameController", GameController);
