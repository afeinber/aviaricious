(function aviariciousApp() {
  var app = angular.module('aviariciousApp', ['ngRoute', 'infinite-scroll', 'Devise']);

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

    $rootScope.hideSidebar = function() {
      if($('.fa-bars').is(':visible')) {
        //Sometimes the sidebar isnt there yet
        if($('#sidebar').length > 0) {
          $('.fa-bars').trigger('click');
          $('.fa-bars').hide();
        } else {
          //so we wait
          setTimeout(function() {
            //and try again.
            $rootScope.hideSidebar();
          }, 20);
        }
      }
    };

    $rootScope.showSidebar = function() {
      if(!$('.fa-bars').is(':visible')) {
      //Sometimes the sidebar isnt there yet
        if($('#sidebar').length > 0) {
          // $('.fa-bars').trigger('click');
          var bars = $('.fa-bars');
          bars.show().trigger('click');
          if(!$('#sidebar > ul').is(":visible")) {
            setTimeout(function() { bars.trigger('click');}, 10);
          }
        } else {
          //so we wait
          setTimeout(function() {
            //and try again.
            $rootScope.showSidebar();
          }, 20);
        }
      }
    };

    $rootScope.$on('$routeChangeStart', function(e, next, current) {
      if(window.routes[next.originalPath]) {
        if (!window.routes[next.originalPath].access.allowAnonymous && !$rootScope.user) {
          //if its a refresh then ignore it
          if(event.type !== 'DOMContentLoaded') {
            event.preventDefault();
            $location.path("/");
          }
        }
      }
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
