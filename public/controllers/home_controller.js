(function HomeIIFE() {
  var HomeController = function(
    $scope,
    $location,
    birdFactory,
    observationsFactory,
    Auth,
    flashFactory,
    $rootScope
  ) {

    $scope.observations = [];
    $scope.numShown = 15;

    var birds = [];
    $scope.distance=15;
    $scope.notableOnly = false;

    //This is for the infinite scroll when we reach the bottom of the page
    $scope.loadMore = function() {
      $scope.numShown += 2;
    };

    $scope.isSelected = function(d) {
      return d === $scope.distance;
    };

    $scope.photoUrl = function(sciName) {
      var bird;
      birds.forEach(function(element) {
        if(element.scientific_name === sciName) {
          bird = element;
          return;
        }
      });

      //maybe we didnt get a bird back from the database.
      bird = bird || {};
      return bird.photo_url || '../images/not_available.jpg';
    };

    $scope.selectDistance = function(dist) {
      $scope.distance = dist;
      getObservations();
    };

    $scope.selectNotable = function(notableOnly) {
      $scope.notableOnly = notableOnly;
      getObservations();
    };

    var getObservations = function() {
      var observationsProm;
      if($scope.notableOnly) {
        observationsProm = observationsFactory.getNotable(
          $rootScope.user.latitude,
          $rootScope.user.longitude,
          $scope.distance
        );
      } else {
        observationsProm = observationsFactory.getObservations(
          $rootScope.user.latitude,
          $rootScope.user.longitude,
          $scope.distance
        );
      }
      observationsProm.success(function(obs){
        //This probably occured because we're in development and there were no observations.
        if(obs.length === 0) {
          observationsFactory.getNYC($scope.distance).success(function(nycObs) {
            $scope.observations = nycObs;
          });
        } else {
          $scope.observations = obs;
        }
      });
    };

    function init() {
      Auth.currentUser()
        .then(function(user) {
            $rootScope.user = user;
            getObservations();
          }
        );

      //get the birds from the back end servers so we can have their photos
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

  HomeController.$inject = [
    '$scope',
    '$location',
    'birdFactory',
    'observationsFactory',
    'Auth',
    'flashFactory',
    '$rootScope'
  ];

  angular.module('aviariciousApp').controller(
    'HomeController',
    HomeController
  );

})();
