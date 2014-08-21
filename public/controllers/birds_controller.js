var BirdsController = function($scope, birdFactory) {

  $scope.birds = [];
  $scope.birds_busy = true;
  $scope.numShown = 20;
  //$scope.birdFilter = {common_name: "", scientific_name: ""};

  $scope.loadMore = function() {
    //var last = $scope.filteredBirds.length - 1;
    // for(var i = 1; i <= 8; i++) {
    //   $scope.birds.push($scope.filteredBirds[last+i]);
    //   if(last+i > $scope.all_birds.length) {
    //     $scope.busy = true;
    //     break;
    //   }
    // }

    $scope.numShown += 1;
  };

  $scope.photoUrl = function(bird) {
    return bird.photo_url || '../images/not_available.jpg';
  };
  // $scope.filterBirds = function(name, type) {
  //   $scope.filteredBirds = $scope.all_birds.filter(function(bird) {

  //     if(type === 'common') {
  //       return bird.common_name.match(new RegExp(name));
  //     } else {
  //       return bird.scientific_name.match(new RegExp(name));
  //     }
  //   });
  // };
  function init() {
    birdFactory.getBirds()
      .success(function(birds){
        // $scope.all_birds = birds;
        $scope.birds = birds;
        $scope.birds_busy = false;
        // console.log(birds);
        // $scope.filteredBirds = $scope.all_birds.slice(0, 30);
      })
      .error(function(data, status) {
        console.log("There was an error getting the birds with status " + status);
    });
  }
  init();
};

BirdsController.$inject = ['$scope', 'birdFactory'];

// The Controller is part of the module.
angular.module('aviariciousApp').controller('BirdsController', BirdsController);

