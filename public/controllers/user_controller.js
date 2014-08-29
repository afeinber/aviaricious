(function() {
  var UserController = function($scope, userFactory, $location, flashFactory) {

    $scope.sendRegistration = function() {
      userFactory.signup($scope.email, $scope.password)
        .then(function(registeredUser){
          flashFactory.setMessage(
            {
              class: "success",
              message: "Congratulations! You've signed up successfully!"
            });

          $location.path("/home");
        }, function(err) {
          flashFactory.setMessage(
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
          $location.path("/home");
        }, function(err) {
          flashFactory.setMessage(
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
    "flashFactory"
  ];
  angular.module('aviariciousApp').
    controller('UserController', UserController);
})();
