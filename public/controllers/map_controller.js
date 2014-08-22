var MapController = function() {
  var init = function() {
    //$('html').css('height', '100%');
   // $('body').css({'height': '100%', 'margin': '0', 'padding': '0'});
    //$('map-canvas').css('height', '100%');
    $('.header').css('position', 'relative');
    function initialize() {
            var mapOptions = {
              center: new google.maps.LatLng(-34.397, 150.644),
              zoom: 8
            };
            var map = new google.maps.Map(document.getElementById("map-canvas"),
                mapOptions);
          }

          var event = new Event('imReady');
          google.maps.event.addDomListener(window, 'imReady', initialize);
          window.dispatchEvent(event);
          // $(window).on('loadMap', function() {

          // })
          //initialize();
  };

  init();
};

angular.module('aviariciousApp').controller('MapController', MapController);
