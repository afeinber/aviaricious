var LandingController = function($location, Auth, $scope) {

  $scope.$watch('viewContentLoaded', function() {
    $('.fa-bars').hide();
    $('#sidebar').hide();
  });

  $scope.$on('$routeChangeStart', function(next, current) {
    $('.fa-bars').show();
    $('#sidebar').show();
  });
};

LandingController.$inject = ['$location', 'Auth', '$scope'];

angular.module('aviariciousApp').controller('LandingController', LandingController);
