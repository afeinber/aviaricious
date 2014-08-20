(function aviariciousApp() {
  var app = angular.module('aviariciousApp', ['ngRoute']);

  app.config(function($routeProvider){
    $routeProvider
      .when('/',
        {controller: 'BirdsController', templateUrl: "/views/home.html"}
      )
      .when('/birds',
        {
          controller: 'BirdsController',
          templateUrl: '/views/birds_index.html'
        }
      );
  });
})();
