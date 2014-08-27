var NavbarController = function($scope, Auth, $location, flashFactory, $route) {
  $scope.weDone = function() {
    $('.header').css('position', 'fixed');
    $('#sidebar').css('z-index', '0');
    $('ul.sidebar-menu').css('margin-top', '75px;');
    if($('#sidebar').css('margin-left')!=='0px') {
      $('.fa-bars').trigger('click');
    }
    $scope.userExists = true;

    $(document).trigger('doneWithHeader');
  };

  $scope.logout = function() {
    Auth.logout().then(function(user) {
      $location.path('/');
    }, function(error) {
      $flashFactory.setMessage("There was a problem signing you out.");
      $route.reload();
    });
  };
  // $scope.$on('$routeChangeStart', function() {
  //   Auth.currentUser().then(function(user) {
  //     $scope.userExists = true;
  //   });
  // });
  $scope.$on('devise:unauthorized', function(event){
    $scope.userExists = false;
  });
  $scope.$on('devise:logout', function(event){
    $scope.userExists = false;
  });
};

NavbarController.$inject = ['$scope', 'Auth', '$location', 'flashFactory', '$route'];

// The Controller is part of the module.
angular.module('aviariciousApp').controller('NavbarController', NavbarController);
