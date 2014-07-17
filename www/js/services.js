angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Shops', function($http, $q) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var shops = [
    { id: 0, name: 'Bookstore', icon: 'ion-ios7-bookmarks' },
    { id: 1, name: 'FastFood',icon: 'ion-fork' },
    { id: 2, name: 'Clothes shop', icon: 'ion-bag' }
  ];

  return {
    all: function() {
      return shops;
    },
    get: function(shopId) {
      // Simple index lookup
      return shops[shopId];
    }
  }
})

.factory('Geo', function($q) {
  return {
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
});

