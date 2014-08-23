var BirdsController = function($scope, $location, birdFactory) {

  $scope.birds = [];
  $scope.birds_busy = true;
  $scope.numShown = 20;
  $scope.birdFilter = {};
  //$('.header').css('position', 'fixed');

  $('.header').css('position', 'fixed');
  $('#sidebar').css('z-index', '0');
  $('ul.sidebar-menu').css('margin-top', '75px;');
  if($('#sidebar').css('margin-left')!=='0px') {
    $('.fa-bars').trigger('click');
  }


  //This gets the query string which is what we will be using to
  //determine whether we will filter by scientific or common name
  var curName = $location.search().name || 'common_name';


  $scope.loadMore = function() {
    $scope.numShown += 1;
  };

  $scope.setFilter = function() {
    $scope.birdFilter[curName] = $scope.birdSearch;
  };

  $scope.photoUrl = function(bird) {
    return bird.photo_url || '../images/not_available.jpg';
  };

  function init() {
    birdFactory.getBirds()
      .success(function(birds){

        $scope.birds = birds;
        $scope.birds_busy = false;

      })
      .error(function(data, status) {
        console.log("There was an error getting the birds with status " + status);
    });
  }
  init();
};

BirdsController.$inject = ['$scope', '$location', 'birdFactory'];

angular.module('aviariciousApp').controller('BirdsController', BirdsController);

