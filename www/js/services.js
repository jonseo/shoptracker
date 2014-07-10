angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Shops', function($http, $q) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var shops = [
    { id: 0, name: 'Knjizare', icon: 'ion-ios7-bookmarks' },
    { id: 1, name: 'FastFood',icon: 'ion-fork' },
    { id: 2, name: 'Prodavnice garderobe', icon: 'ion-bag' }
  ];

  var deferred = $q.defer();
      $http.get('data/shops.json').then(function(data) {
        deferred.resolve(data.shops);
      });
  
  return {
    all: function() {
      return shops;
    },
    get: function(shopId) {
      // Simple index lookup
      return shops[shopId];
    }
  }
});

angular.module('starter').factory('Geo', function($q) {
  return {
    reverseGeocode: function(lat, lng) {
      var q = $q.defer();

      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({
        'latLng': new google.maps.LatLng(lat, lng)
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          console.log('Reverse', results);
          if(results.length > 0) {
            var r = results[0];
            var a, types;
            var parts = [];
            var foundLocality = false;
            var foundState = false;
            for(var i = 0; i < r.address_components.length; i++) {
              a = r.address_components[i];
              types = a.types;
              for(var j = 0; j < types.length; j++) {
                if(!foundLocality && types[j] == 'locality') {
                  foundLocality = true;
                  parts.push(a.long_name);
                } else if(!foundState && types[j] == 'administrative_area_level_1') {
                  foundState = true;
                  parts.push(a.short_name);
                }
              }
            }
            console.log('Reverse', parts);
            q.resolve(parts.join(' '));
          }
        } else {
          console.log('reverse fail', results, status);
          q.reject(results);
        }
      })

      return q.promise;
    },
    getLocation: function() {
      var q = $q.defer();

      navigator.geolocation.getCurrentPosition(function(position) {
        q.resolve(position);
      }, function(error) {
        q.reject(error);
      });

      return q.promise;
    }
  };
})

