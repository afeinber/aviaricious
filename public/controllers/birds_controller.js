
var BirdsController = function($scope) {
  $scope.$on('$viewContentLoaded', function() {
      $(document).trigger('create'); //$(document) or just the part that was loaded with ajax
  });
};

BirdsController.$inject = ['$scope'];

// The Controller is part of the module.
angular.module('aviariciousApp').controller('BirdsController', BirdsController);

