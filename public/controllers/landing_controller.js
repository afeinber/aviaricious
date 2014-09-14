var LandingController = function($location, Auth, $scope) {

  $scope.$on('$viewContentLoaded', function() {
    //inherit from root scope
    $scope.hideSidebar();
  });

  $scope.$on('$routeChangeStart', function(next, current) {
    $('.fa-bars').trigger('click');
    $('.fa-bars').show();
  });

};

LandingController.$inject = ['$location', 'Auth', '$scope'];

angular.module('aviariciousApp').
  controller('LandingController', LandingController);
