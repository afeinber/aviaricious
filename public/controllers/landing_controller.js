var LandingController = function($location, Auth, $scope) {

  $scope.$watch('viewContentLoaded', function() {
    $('.fa-bars').hide();
    $('#sidebar').hide();
  });

  $scope.$on('$routeChangeStart', function(next, current) {
    $('.fa-bars').show();
    $('#sidebar').show();
  });

  Auth.currentUser()
    .then(function(user) {
      $location.path("/home");
    });


  //$('.header').css('position', 'relative');
  $('#sidebar').css('z-index', '1');
  $('ul.sidebar-menu').css('margin-top', '0');
  $('.fa-bars').trigger('click');

};

LandingController.$inject = ['$location', 'Auth', '$scope'];

angular.module('aviariciousApp').
  controller('LandingController', LandingController);
