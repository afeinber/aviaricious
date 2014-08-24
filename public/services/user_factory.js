(function() {
  var userFactory = function($http, Auth) {

    var factory = {};

    factory.signup = function(email, password) {
      return Auth.register({email: email, password: password});
    };

    return factory;
  };

  userFactory.$inject = ["$http", "Auth"];
  angular.module("aviariciousApp").factory("userFactory", userFactory);
})();
