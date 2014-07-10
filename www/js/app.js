// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    StatusBar.styleDefault();
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

     .state('tab.home', {
      url: '/home',
      views: {
        'tab-dash': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })

  .state('tab.shops', {
        url: '/shops/:shopsId',
        views: {
          'tab-dash': {
            templateUrl: 'templates/shops.html',
            controller: 'ListCtrl'
          }
        }
      })

    .state('client-home', {
      url: '/map/:mapId/:travelID',
      templateUrl: 'templates/map.html',
      controller: 'MapCtrl'
    })

    .state('map-cords', {
      url: '/map/:lat/:long/:travelID',
      templateUrl: 'templates/map.html',
      controller: 'MapCtrl'
    })

     .state('tab.search', {
    url: '/search',
    views: {
      'tab-dash': {
        templateUrl: 'templates/search.html',
        controller: 'HomeCtrl'
      }
    }
  })

     .state('tab.help', {
    url: '/help',
    views: {
      'tab-dash': {
        templateUrl: 'templates/help.html',
        controller: 'HomeCtrl'
      }
    }
  })

  

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});

angular.module('starter').constant('MapOptions', {
    center: new google.maps.LatLng(44.816448, 20.460148),
    zoom: 13
});