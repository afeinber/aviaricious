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
      )
      .when('/bird',
        {
          controller: 'BirdController',
          templateUrl: '/views/bird.html'
        }
      )
      .when('/favorites',
        {
          controller: "FavoritesController",
          templateUrl: "/views/favorites"
        }
      )
      .when('/scores',
        {
          controller: 'ScoresController',
          templateUrl: '/views/scores'
        }
      );
  });


  app.run(function(Auth, $location, $rootScope) {
    $rootScope.$on('devise:unauthorized', function(event, xhr, deferred) {
      // Auth.currentUser().then(function(user) {

      //   //if there is a current user do not let him/her see the landing page
      //   // if(next === $location.absUrl()) {
      //   //   //stop the redirect
      //   //   event.preventDefault();
      //   //   //and change it to home path
      //   //   $location.path('/home');
      //   // }
      // }, function(error) {
      //   event.preventDefault();
      //   //if there is not a signed in user redirect to landing page.
      //   $location.path('/');
        $location.path('/');
      });
    });
  // });
})();
