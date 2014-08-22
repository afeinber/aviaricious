(function HomeIIFE() {
  var HomeController = function($scope, birdFactory,observationsFactory) {
    $scope.observations = [];
    $scope.numShown = 15;
    $('.header').css('position', 'fixed');
    var birds = [];



    $scope.loadMore = function() {
      $scope.numShown += 1;
    };

    $scope.photoUrl = function(sciName) {
      var bird;
      birds.forEach(function(element) {
        if(element.scientific_name === sciName) {
          bird = element;
          return;
        }
      });

      bird = bird || {};
      return bird.photo_url || '../images/not_available.jpg';
    };

    function init() {
      observationsFactory.getObservations()
        .success(function(observations) {
          $scope.observations = observations;
        })
        .error(function(data, status) {
          console.log("error with observations: " + status);
        });

      birdFactory.getBirds()
        .success(function(_birds) {
          birds = _birds;
        })
        .error(function(data, status) {
          console.log("error with getting birds: " + status);
        });
    }

    init();
  };

  HomeController.$inject = ['$scope', 'birdFactory', 'observationsFactory'];

  angular.module('aviariciousApp').controller('HomeController', HomeController);

})();
