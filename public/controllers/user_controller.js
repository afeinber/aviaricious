(function() {
  var UserController = function($scope, userFactory, $location) {

    $('.header').css('position', 'fixed');
    $('#sidebar').css('z-index', '0');
    $('ul.sidebar-menu').css('margin-top', '75px;');
    if($('#sidebar').css('margin-left')!=='0px') {
      $('.fa-bars').trigger('click');
    }

    $scope.sendRegistration = function() {
      userFactory.signup($scope.email, $scope.password)
        .then(function(registeredUser){
          $location.path("/home");
        }, function(err) {
          var alert = $('<div>').
            attr('class', "alert alert-danger").
            attr('role',"alert").
            text("There was an error with your request. Please try agian");
          $('#alert-append').append(alert);
        });
    };
  };

  UserController.$inject = ["$scope", "userFactory", "$location"];
  angular.module('aviariciousApp').controller('UserController', UserController);
})();
