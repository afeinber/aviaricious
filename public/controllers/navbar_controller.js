var NavbarController = function(
  $scope,
  Auth,
  $location,
  flashFactory,
  $route,
  $rootScope
) {

  //This makes sure that we wait for the navbar to be initialized before we
  //run the oppropriate javasctipts in common-sctripts.js
  $scope.initNavbar = function() {
    $(document).trigger('doneWithHeader');
  };

  $scope.logout = function() {
    Auth.logout().then(function(user) {
      $rootScope.user = null;
      $scope.userExists = false;
      $location.path('/');
    }, function(error) {
      $flashFactory.setMessage("There was a problem signing you out.");
      $route.reload();
    });
  };

  $scope.$on('devise:unauthorized', function(event){
    $rootScope.user = null;
  });
  $scope.$on('devise:logout', function(event){
    $rootScope.user = null;
  });
};

NavbarController.$inject = [
  '$scope',
  'Auth',
  '$location',
  'flashFactory',
  '$route',
  '$rootScope'
];


angular.module('aviariciousApp').
  controller('NavbarController', NavbarController);
