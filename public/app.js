(function aviariciousApp() {
  var app = angular.module('aviariciousApp', ['ngRoute', 'infinite-scroll', 'Devise']);
  // angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 250);
  app.config(function($routeProvider, AuthProvider){
    window.routes = {
      '/': {
        controller: 'LandingController',
        templateUrl: "/views/landing.html",
        //This signifies that anybody can access this page
        access : {allowAnonymous : true}
      },
      '/home': {
        controller: 'HomeController',
        templateUrl: '/views/home.html',
        //only for signed in users
        access : {allowAnonymous : false}
      },
      '/birds': {
        controller: 'BirdsController',
        templateUrl: '/views/birds_index.html',
        access : {allowAnonymous : false}

      },
      '/map': {
        controller: 'MapController',
        templateUrl: '/views/map.html',
        access : {allowAnonymous : false}

      },
      '/signup': {
        controller: 'UserController',
        templateUrl: '/views/signup',
        access : {allowAnonymous : true}

      },
      '/signin': {
        controller: 'UserController',
        templateUrl: '/views/signin',
        access : {allowAnonymous : true}

      },
      '/bird': {
        controller: 'BirdController',
        templateUrl: '/views/bird.html',
        access : {allowAnonymous : false}

      },
      '/game': {
        controller: "GameController",
        templateUrl: "/views/game",
        access : {allowAnonymous : false}

      },
      '/scores': {
        controller: 'ScoresController',
        templateUrl: '/views/scores',
        access : {allowAnonymous : false}
      },
      '/favorites': {
        controller: 'FavoritesController',
        templateUrl: '/views/favorites',
        access : {allowAnonymous : false}

      }
    };

    for (var path in window.routes) {
      $routeProvider.when(path, window.routes[path]);
    }
    $routeProvider.otherwise({ redirectTo: '/' });
  });


  app.run(function(Auth, $location, $rootScope) {
    //this means that there is no signed in user
    $rootScope.$on('devise:unauthorized', function(event, xhr, deferred) {
      $rootScope.user = null;
    });

    $rootScope.$on('$routeChangeStart', function(e, next, current) {
      if (!window.routes[next.originalPath].access.allowAnonymous && !$rootScope.user) {
        //if its a refresh then ignore it
        if(event.type === 'popstate') {
          event.preventDefault();
          $location.path("/");
        }
      }
        // }
      // }
    });
    //only want to run this on page refreses to get the current user from
    //the server.
    $(document).ready(function(){
      Auth.currentUser().then(function(user) {
        $rootScope.user = user;
      }, function(err) {
        $rootScope.user = null;
      });
    });
  });
})();
