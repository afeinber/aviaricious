var BirdsController = function(
  $injector,
  $scope,
  birdListControllerFactory,
  birdFactory,
  $location
) {

  //This controlelr uses some sick inheritance so we can make a similar controller for favorites

  $injector.invoke(
    birdListControllerFactory.controllerProto,
    this,
    { $scope: $scope, someFactory: birdFactory }
  );

  $scope.birdFilter = {};

  //This gets the query string which is what we will be using to
  //determine whether we will filter by scientific or common name
  var curName = $location.search().name || 'common_name';

  $scope.setFilter = function() {
    $scope.birdFilter[curName] = $scope.birdSearch;
  };
};

BirdsController.$inject = [
  '$injector',
  '$scope',
  'birdListControllerFactory',
  'birdFactory',
  '$location'
];

angular.module('aviariciousApp').controller(
  'BirdsController',
  BirdsController
);

