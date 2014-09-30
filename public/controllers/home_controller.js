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
    var distance;
    var notableOnly = false;

    //This is for the infinite scroll when we reach the bottom of the page
    $scope.loadMore = function() {
      $scope.numShown += 1;
    };

    // $scope.$on('$viewContentLoaded', function() {
    //  $scope.showSidebar();
    // });

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

    $scope.selectDistance = function(dist, $event) {
      $('.distance-group .btn').removeClass('active');
      distance = dist;
      if($event) { $($event.target).addClass('active'); }
      getObservations();
    };

    $scope.selectNotable = function(isNotable, $event) {
      $('.notable-group .btn').removeClass('active');
      $($event.target).addClass('active');
      notableOnly = isNotable;
      getObservations();
    };

    var getObservations = function() {
      var observationsProm;
      if(notableOnly) {
        observationsProm = observationsFactory.getNotable(
          $rootScope.user.latitude,
          $rootScope.user.longitude,
          distance
        );
      } else {
        observationsProm = observationsFactory.getObservations(
          $rootScope.user.latitude,
          $rootScope.user.longitude,
          distance
        );
      }
      observationsProm.success(function(obs){
        if(obs.length === 0) {
          observationsFactory.getNYC(distance).success(function(nycObs) {
            $scope.observations = nycObs;
          });
        } else {
          $scope.observations = obs;
        }
      });
    };

    function init() {
      distance = 15;
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
