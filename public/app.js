(function aviariciousApp() {
  var app = angular.module('aviariciousApp', ['ngRoute', 'infinite-scroll']);
  // angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 250);
  app.config(function($routeProvider){
    $routeProvider
      .when('/',
        {
          controller: 'HomeController',
          templateUrl: "/views/home.html"
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
    );
  });
})();
