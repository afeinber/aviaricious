var LandingController = function($location, Auth, $scope) {

  $scope.$on('$viewContentLoaded', function() {
    hideSidebar();
  });

  function hideSidebar() {
    //Sometimes the sidebar isnt there yet
    if($('#sidebar')) {
      $('.fa-bars').hide();
      $('#sidebar').css('z-index', '1');
      $('ul.sidebar-menu').css('margin-top', '0');
      $('.fa-bars').trigger('click');
      // $('#sidebar').hide();
    } else {
      //so we wait
      setTimeout(function() {
        //and try again.
        hideSidebar();
      }, 20);
    }
  }

  $scope.$on('$routeChangeStart', function(next, current) {
    $('.fa-bars').show();
    $('#sidebar').show();
  });



};

LandingController.$inject = ['$location', 'Auth', '$scope'];

angular.module('aviariciousApp').
  controller('LandingController', LandingController);
