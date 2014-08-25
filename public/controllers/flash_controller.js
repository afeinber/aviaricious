var FlashController = function($scope,flashFactory) {
  $scope.flashFactory = flashFactory;
};

FlashController.$inject = ['$scope', 'flashFactory'];
angular.module("aviariciousApp").controller("FlashController", FlashController);
