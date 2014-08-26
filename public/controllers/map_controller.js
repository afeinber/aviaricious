var MapController = function($location, $http, observationsFactory) {
  var init = function() {
    //Makes it so that the map is not underneath the header
    $('.header').css('position', 'relative');
    $('#sidebar').css('z-index', '1');
    $('ul.sidebar-menu').css('margin-top', '0');
    $('.fa-bars').trigger('click');

    var longitude =  $location.search().lng;
    var latitude = $location.search().lat;
    var bird = $location.search().bird;
    var centerPoint = new google.maps.LatLng(latitude, longitude);

    function initialize() {
      var mapOptions = {
        center: centerPoint,
        zoom: 12
      };
      var map = new google.maps.Map(document.getElementById("map-canvas"),
         mapOptions);

      //get observations for particular bird
      observationsFactory.getSpeciesObs(latitude, longitude, bird)
        .success(function(data){
          data.forEach(function(obs) {
            var infoWind = new google.maps.InfoWindow({
              content:
                "<p><strong>" + obs.comName + "</strong></p>" +
                "<p>Seen: " + moment(obs.obsDt).fromNow() +"</p>" +
                "<p>Number: " + obs.howMany + "</p>"

            });
            //make new marker on map for each observation
            var mkr = new google.maps.Marker({
              map: map,
              animation: google.maps.Animation.DROP,
              position: new google.maps.LatLng(obs.lat, obs.lng)
            });
            google.maps.event.addListener(mkr, 'click', function() {
              infoWind.open(map, mkr);
            });
          });
        })
        .error(function(data, status) {
          console.log(data);
          console.log("there was an error getting markers with status " + status);
        });
    }



    var event = new Event('imReady');
    google.maps.event.addDomListener(window, 'imReady', initialize);
    window.dispatchEvent(event);

  };

  init();
};

MapController.$inject = ['$location', '$http', 'observationsFactory'];
angular.module('aviariciousApp').controller('MapController', MapController);
