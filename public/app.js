(function aviariciousApp() {
  var app = angular.module('aviariciousApp', ['ngRoute', 'infinite-scroll', 'Devise']);
  // angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 250);
  app.config(function($routeProvider, AuthProvider){
    $routeProvider
      .when('/',
        {
          controller: 'LandingController',
          templateUrl: "/views/landing.html"
        }
      )
      .when('/home',
        {
          controller: 'HomeController',
          templateUrl: '/views/home.html'
        }
      )
      .when('/birds',
        {
          controller: 'BirdsController',
          templateUrl: '/views/birds_index.html'
        }
      )
      .when('/map',
        {
          controller: 'MapController',
          templateUrl: '/views/map.html'
        }
      )
      .when('/signup',
        {
          controller: 'UserController',
          templateUrl: '/views/signup'
        }
      )
      .when('/signin',
        {
          controller: 'UserController',
          templateUrl: '/views/signin'
        }
      );
  });

  // app.factory("flash", function($rootScope) {
  //   var nextMessages = [];
  //   var currentMessages = [];
  //   var areMessages = false;

  //   $rootScope.$on("$routeChangeSuccess", function(event, next, current) {
  //     currentMessages = nextMessages;
  //     nextMessages = [];
  //     $rootScope.areMessages = currentMessages.length !== 0;
  //   });

  //   return {
  //     setMessage: function(message) {
  //       nextMessages.push(message);
  //     },
  //     getMessages: function() {
  //       return currentMessages;
  //     },
  //     getNext: function() {
  //       return nextMessages;
  //     }
  //   };
  // });

  app.run(function(Auth, $location, $rootScope) {
    $rootScope.$on('$locationChangeStart', function(event, next, current) {
      Auth.currentUser().then(function(user) {

        //if there is a current user do not let him/her see the landing page
        // if(next === $location.absUrl()) {
        //   //stop the redirect
        //   event.preventDefault();
        //   //and change it to home path
        //   $location.path('/home');
        // }
      }, function(error) {
        event.preventDefault();
        //if there is not a signed in user redirect to landing page.
        $location.path('/');
      });
    });
  });
})();
