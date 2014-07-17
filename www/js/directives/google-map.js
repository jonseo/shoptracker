'use strict';

/*
  For more details about google maps visit
  https://developers.google.com/maps/documentation/javascript/
*/
angular.module('starter')
.directive('googleMap', function ($stateParams,maps, MapOptions) {
  return function(scope, element, attrs) {
    var myPosition;
    var myPositionMarker = {};
    var map = new google.maps.Map(element[0], MapOptions);
    // Belgrade position
    var location = new google.maps.LatLng(44.815603, 20.459639);
    var directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    // Receiving data from maps service
    // and draw path on map
    scope.$on('maps.directions', function() {
      directionsRenderer.setDirections(maps.directions);
    });

    // Create shops markers
    function createMarker(pos, t) {
      var marker = new google.maps.Marker({       
        position: pos, 
          map: map,  // google.maps.Map 
          title: t      
        });
        // Add action listener on marker 
        google.maps.event.addListener(marker, 'click', function() { 
          maps.getDirections(myPosition, pos);
        }); 
        return marker;  
    }

    // Receiving data from maps service
    // my location
    scope.$on('loc',function(event,data){
      SearchFunc();
      if(data.succeed == 1){
        var input = document.getElementById('pac-input');
        input.placeholder='Change location eg. \'Trg Republike, Belgrade\'';
        myPosition =  new google.maps.LatLng(data.latitude, data.longitude);
        new google.maps.Marker({
          position: myPosition,
          map: map,
          title: 'My location',
          icon: 'img/my-location.png'
        });
        map.setCenter(myPosition);
      }else{
        var input = document.getElementById('pac-input');
        input.placeholder='Geolocation failed, search new location eg. \'Trg Republike, Belgrade\'';
      }

      map.setZoom(13);
    });

    // Receiving data from maps service
    // for all shops
    scope.$on('all', function(event, data) {
      var i;
      for(i = 0; i < data.length; i++){
        var loc = new google.maps.LatLng(data[i].lat, data[i].lang);
        createMarker(loc, data[i].name);
      }  
    });

    // Receiving data from maps service
    // for one shop
    scope.$on('one', function(event, data) {
      var loc = new google.maps.LatLng(data.latitude, data.longitude);
      createMarker(loc, 'Requested shop');
    });


    /*....................................START SEARCH................................*/

    // Create the search box and link it to the UI element.
    var SearchFunc = function(){
      var markers = [];
      var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(44.820903, 20.456579),
        new google.maps.LatLng(44.821421, 20.46881));
      map.fitBounds(defaultBounds);
      var input = (document.getElementById('pac-input'));
      map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
      var searchBox = new google.maps.places.SearchBox((input));

      google.maps.event.addListener(searchBox, 'places_changed', function() {
        var places = searchBox.getPlaces();

        for (var i = 0, marker; marker = markers[i]; i++) {
          marker.setMap(null);
        }

        // For each place, get the icon, place name, and location.
        markers = [];
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, place; place = places[i]; i++) {
          var image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

          // Create a marker for each place.
          var marker = new google.maps.Marker({
            map: map,
            icon: image,
            title: place.name,
            position: place.geometry.location
          });

          markers.push(marker);
          myPosition =  new google.maps.LatLng(place.geometry.location.k, place.geometry.location.A);

          bounds.extend(place.geometry.location);
        }

        map.fitBounds(bounds);
      });
      
      google.maps.event.addListener(map, 'bounds_changed', function() {
        var bounds = map.getBounds();
        searchBox.setBounds(bounds);
      });
    }
  };
});
