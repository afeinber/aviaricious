var FavoritesController = function(
  $scope,
  $injector,
  birdListControllerFactory,
  favoritesFactory
) {

  //the sick inheritance
  $injector.invoke(
    birdListControllerFactory.controllerProto,
    this,
    { $scope: $scope, someFactory: favoritesFactory }
  );
};

FavoritesController.$inject = [
  '$scope',
  '$injector',
  'birdListControllerFactory',
  'favoritesFactory'
];

angular.module('aviariciousApp').controller(
  'FavoritesController',
  FavoritesController
);
