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
      .when('/game',
        {
          controller: "GameController",
          templateUrl: "/views/game"
        }
      )
      .when('/scores',
        {
          controller: 'ScoresController',
          templateUrl: '/views/scores'
        }
      )
      .when('/favorites',
        {
          controller: 'FavoritesController',
          templateUrl: '/views/favorites'
        }
      );
  });


  app.run(function(Auth, $location, $rootScope) {
    $rootScope.$on('devise:unauthorized', function(event, xhr, deferred) {
        $location.path('/');
      });
    });
})();
