(function HomeIIFE() {
  var HomeController = function(
    $scope,
    $location,
    birdFactory,
    observationsFactory,
    Auth,
    flashFactory
  ) {

    $scope.observations = [];
    $scope.numShown = 15;

    var birds = [];
    var distance;
    var currentUser;
    var notableOnly = false;

    //This is for the infinite scroll when we reach the bottom of the page
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
          currentUser.latitude,
          currentUser.longitude,
          distance
        );
      } else {
        observationsProm = observationsFactory.getObservations(
          currentUser.latitude,
          currentUser.longitude,
          distance
        );
      }
      observationsProm.success(function(obs){
        $scope.observations = obs;
      });
    };

    function init() {
      distance = 15;
      Auth.currentUser()
        .then(function(user) {
            getObservations();
          }, function(err) {
            $location.path('/');
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
    'flashFactory'
  ];

  angular.module('aviariciousApp').controller(
    'HomeController',
    HomeController
  );

})();
