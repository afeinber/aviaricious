var flashFactory = function($rootScope, $location) {

  var nextMessages = [];
  var currentMessages = [];
  var areMessages = false;

  $rootScope.$on("$routeChangeSuccess", function(event, next, current) {
    currentMessages = nextMessages;
    nextMessages = [];
  });

  return {
    setMessage: function(message) {
      nextMessages.push(message);
    },
    getMessages: function() {
      return currentMessages;
    },
    areMessages: function() {
      return currentMessages.length !== 0;
    }
  };
};

flashFactory.$inject = ['$rootScope', '$location'];
angular.module('aviariciousApp').factory('flashFactory', flashFactory);
