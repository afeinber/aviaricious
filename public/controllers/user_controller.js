(function() {
  var UserController = function(
    $scope,
    userFactory,
    $location,
    flashFactory,
    $rootScope
  ) {

    $scope.$on('$viewContentLoaded', function() {
     $scope.hideSidebar();
    });

    $scope.$on('$routeChangeStart', function() {
      $('.fa-bars').trigger('click');
      $('.fa-bars').show();
    });


    $scope.sendRegistration = function() {
      userFactory.signup($scope.email, $scope.password)
        .then(function(registeredUser){
          flashFactory.setMessage(
            {
              class: "success",
              message: "Congratulations! You've signed up successfully!"
            });
          //now we have a user.
          $rootScope.user = registeredUser;
          $location.path("/home");
        }, function(err) {
          flashFactory.setNowMessage(
            {
              class: "danger",
              message: "Something went wrong. Maybe you have already registered?"
            });
          $location.path("/signup");
        });
    };

    $scope.login = function() {
      userFactory.signin($scope.email, $scope.password)
        .then(function(user){
          //now we have a user
          $rootScope.user = user;
          $location.path("/home");
        }, function(err) {
          flashFactory.setNowMessage(
            {
              class: "danger",
              message: "Your email or password is incorrect. Please try again."
            }
          );

          $location.path("/signin");
        });
    };
  };

  UserController.$inject = [
    "$scope",
    "userFactory",
    "$location",
    "flashFactory",
    "$rootScope"
  ];
  angular.module('aviariciousApp').
    controller('UserController', UserController);
})();
