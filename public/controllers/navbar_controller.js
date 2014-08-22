var NavbarController = function($scope) {
  $scope.weDone = function() {

    $(document).trigger('doneWithHeader');
  };
};

NavbarController.$inject = ['$scope'];

// The Controller is part of the module.
angular.module('aviariciousApp').controller('NavbarController', NavbarController);
