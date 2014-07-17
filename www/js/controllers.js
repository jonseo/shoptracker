angular.module('starter.controllers', [])

.controller('HomeCtrl',function($scope, $location,$http, maps, Shops){
	// Load all shops form Shops service
  $scope.shops = Shops.all();

  // Set new url
  $scope.showList = function(Id){
   url = "tab/shops/" + Id;
   $location.path(url);
 }

})

.controller('MapCtrl',function($scope, $location, $stateParams,$window, maps, Shops,Geo){
  // If '$scope.show = true', then we see search
  // input on the map
  $scope.show = true;

  // Change icon, depending on the mode of travel
  if($stateParams.travelID == 1){
   $scope.mode = 'icon ion-model-s';
  }else{
    $scope.mode = 'icon ion-man';
  }

  // Looking for user geolocation
  // or set default 
  // latitude: 44.82136, longitude: 20.462201 (Belgrade)
  // Calling service Geo
  Geo.getLocation().then(function(position) {
    
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    
    // Make new object and set latitude, longitude
    // and 'succeed = 1' if geoloacation succeed
    cr = {latitude: lat, longitude:lng, succeed: 1};
    if($stateParams.mapId == null){
      var data = {latitude: $stateParams.lat, longitude: $stateParams.long};
      maps.setMarkers(-1,cr,data);
    }else{
      var data = {}
      maps.setMarkers($stateParams.mapId,cr,data);
    }
      // If geolocation fail
    }, function(error) {
      cr = {latitude: 44.82136, longitude: 20.462201, succeed: 0}
      if($stateParams.mapId == null){
        var data = {latitude: $stateParams.lat, longitude: $stateParams.long};
        maps.setMarkers(-1,cr,data);
      }else{
        var data = {}
        maps.setMarkers($stateParams.mapId,cr,data);
      }

      console.log(error);
    });

  // Refresh map function
  $scope.refresh = function(){
    $window.location.reload(); 
  }

  // Show or hide search input on map
  $scope.showSearch = function(){
    if($scope.show == false){
      $scope.show = true;
    }else if($scope.show == true){
      $scope.show = false;
    }
  }

  // Change travel mode icon. In url define which travel mode we use
  // '0' DRIVING mode, '1' WALKING mode
  // $stateParams.travelID collect travelID from url
  // $scope.mode define button icon on map
  $scope.changeMode = function(){

    if($stateParams.mapId != null && $stateParams.travelID == 0){
      $scope.mode = 'ion-man';
      url = "map/" + $stateParams.mapId+'/'+1;
      $location.path(url);

    }else if($stateParams.mapId != null && $stateParams.travelID == 1){
      $scope.mode = 'ion-model-s';
      url = "map/" + $stateParams.mapId+'/'+0;
      $location.path(url);
    
    }else if ($stateParams.mapId == null && $stateParams.travelID == 0){
      $scope.mode = 'ion-man';
      url = "map/" + $stateParams.lat+'/'+$stateParams.long+'/'+1;
      $location.path(url); 
    
    }else if ($stateParams.mapId == null && $stateParams.travelID == 1){
      $scope.mode = 'ion-model-s';
      url = "map/" + $stateParams.lat+'/'+$stateParams.long+'/'+0;
      $location.path(url); 
    }
  }
})

.controller('ListCtrl', function($scope,$stateParams,$location,maps,Shops) {

  // Calling Shops service and load just one shop with certain id 
  $scope.shop = Shops.get($stateParams.shopsId);

  // Calling Shops service and load all shops with some id
  // eg. Fast Foods = 1
  $scope.shops = maps.getDetiles($stateParams.shopsId);

  // Show all shops on map
  $scope.showMapAll = function(){
   url = "map/" + $stateParams.shopsId+'/'+0;
   $location.path(url);
  }
  // Show one shop on map
  $scope.showMapOne = function(latitude, longitude){
    url = "map/" + latitude+'/'+longitude+'/'+0;
    $location.path(url);
  }


});
