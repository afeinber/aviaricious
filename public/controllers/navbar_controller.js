var NavbarController = function($scope) {
  $scope.weDone = function() {
    $('.header').css('position', 'fixed');
    $('#sidebar').css('z-index', '0');
    $('ul.sidebar-menu').css('margin-top', '75px;');
    if($('#sidebar').css('margin-left')!=='0px') {
      $('.fa-bars').trigger('click');
    }

    $(document).trigger('doneWithHeader');
  };
};

NavbarController.$inject = ['$scope'];

// The Controller is part of the module.
angular.module('aviariciousApp').controller('NavbarController', NavbarController);
