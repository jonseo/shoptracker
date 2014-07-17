'use strict';

angular.module('starter')
.service('maps', function ($rootScope,$stateParams, MapOptions) {
  // Global variable self, return map object 
  var self = this;

  // Create a Google Maps object, but don't attach it to any visible element on the page. This
  // object will only be used for calculating directions or similar, not for displaying a map to
  // the user.
  this.map = new google.maps.Map(document.createElement('div'), MapOptions);
  this.directionsService = new google.maps.DirectionsService();

  this.directions = {};

  /**
   * Get directions between two points from the Google Maps API.
   * 
   * @param {string} origin The start location from which to calculate directions
   * @param {string} destination The end location to which to calculate directions
   */
   this.getDirections = function(origin , destination) {
    var mod = 'DRIVING';
    if($stateParams.travelID == 0){
      mod = 'DRIVING';
    }
    if($stateParams.travelID == 1){
      mod = 'WALKING';
    }

    var request = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode[mod]
    };

    this.directionsService.route(request, function(result, status) {
       if (status == google.maps.DirectionsStatus.OK) {
          self.directions = result;
          // Sharing data between service and directive
          $rootScope.$broadcast('maps.directions');
        }
    });
  };

  // Set markers on map
  // If id equals -1 set only one shop marker
  // else set all shop markers
  // '$rootScope.$broadcast' send data to directive
  this.setMarkers = function(id,coords,marker){
     var myLocation = {
       latitude: coords.latitude,
       longitude: coords.longitude,
       succeed: coords.succeed
     }

     var send = {};

     if(id > -1 ){
      if(id == 0){
        send = knjizare;
      }

      if(id == 1){
        send = fastfoods;
      }
      if(id == 2){
        send = clothesShop;
      }

     }else{
        send = marker;
        // Send one marker to directive if we choose
        // only one shop to show on map
        $rootScope.$broadcast('one',send);
     }
     // Send my location to directive
     $rootScope.$broadcast('loc',myLocation);
     // Send all shops locations to directive
     $rootScope.$broadcast('all',send);
  }

    // return details for selected group of shops
    this.getDetiles = function(id){
      if(id == 0){
        return knjizare;
      }
      if(id == 1){
        return fastfoods;
      }
      if(id == 2){
        return clothesShop;
      }
    }
      // Some fake testing data
      var fastfoods = [
      {
        id:1,
        name: 'McDonallds' ,
        address: 'Terazije 27' ,
        time: '06-02',
        tel: '011/3235297',
        lat: 44.8126192,
        lang: 20.4613334
      },

      {
        id:2,
        name: 'Caribic' ,
        address: 'Brace Jugovica 21',
        time: '00-24',
        tel: '011/ 334 9960',
        lat: 44.818082,
        lang: 20.4607138
      },

      {

        id:3,
        name: 'Big pizza',
        address: 'Brace Jugovica 25',
        time: '00-24',
        tel: '066/411411',
        lat: 44.818083,
        lang: 20.4607138
      }

      ]

      var knjizare = [
      {
        id: 1,
        name: 'Laguna',
        type: '(Bookshop)',
        address: 'Kralja Milana 48',
        time: '09-22',
        tel: '011/7155042',
        lat: 44.8109188,
        lang: 20.4621554
      },
      {
        id:2,
        name:'Laguna',
        type: '(Bookshop)' ,
        address: 'Knez Mihailova 40' ,
        time: ' 09-22 ' ,
        tel: ' 011/2620502' ,
        lat: 44.818879, 
        lang: 20.4551536 
      },
      {
        id:3,
        name:'Dereta',
        type: '(Bookshop)' ,
        address: 'Knez Mihailova 46' ,
        time: ' 09-22 ' ,
        tel: ' 011/2627934' ,
        lat: 44.815882, 
        lang: 20.4592081

      },
      {
        id:4,
        name:'Vulkan',
        type: '' ,
        address: 'Sremska 2' ,
        time: ' 09-22 ' ,
        tel: ' 011/2639060' ,
        lat: 44.8495 ,
        lang: 20.383868
      }
      ]

      var clothesShop = [
      {
        id:1,
        name: 'Zara',
        address: 'Knez Mihailova 5',
        time: '10-22',
        tel: '011/2023400',
        lat: 44.815882,
        lang: 20.4592081
      },
      {
        id:2,
        name: 'Alexandar 13',
        address: 'Terazije 14',
        time: '09-20',
        tel: '011/3069782',
        lat: 44.8126192,
        lang: 20.4613334
      },
      {
        id:3,
        name: 'Mango',
        address: 'Knez Mihailova 8',
        time: '09-21',
        tel:'011/303 2350',
        lat: 44.815883,
        lang: 20.4592081
      }
      ]

      return this;
    });
