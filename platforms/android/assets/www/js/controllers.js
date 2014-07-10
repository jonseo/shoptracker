angular.module('starter.controllers', [])

.controller('HomeCtrl',function($scope, $location,$http, maps, Shops){
	$scope.shops = Shops.all();

  $scope.showList = function(Id){
     url = "tab/shops/" + Id;
      $location.path(url);
  }
  
})


 
.controller('MapCtrl',function($scope, $location, $stateParams,$window, maps, Shops,Geo){
      //kontorlise da li ce na mapi biti prikazan search
      $scope.show = true;
     
     //menajmo ime ikonice u zavisnosti od moda putovanja
     if($stateParams.travelID == 1){
       $scope.mode = 'icon ion-model-s';
     }else{
      $scope.mode = 'icon ion-man';
     }

     //trazimo geolokaciju
    Geo.getLocation().then(function(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      $scope.levo = lat;
      $scope.desno = lng;
      cr = {latitude: lat, longitude:lng, succeed: 1};
      if($stateParams.mapId == null){
        var data = {latitude: $stateParams.lat, longitude: $stateParams.long};
        maps.setMarkers(-1,cr,data);
      }else{
        var data = {}
        maps.setMarkers($stateParams.mapId,cr,data);
    }
        //ako nije uspelo lociranje
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

    //funkcija koja osvezava mapu
    $scope.refresh = function(){
      $window.location.reload(); 
    }

    //u zavisnosti od trennutnog stanja 
    //menja $scope.show
    $scope.showSearch = function(){
      if($scope.show == false){
        $scope.show = true;
      }else if($scope.show == true){
        $scope.show = false;
      }
    }

    //menjamo mod putovanja. $scope.mode je zadzuena za menjane ikonice na dugmetu
    //ako je $stateParams.travelID == 0, onda je mod DRIVING, a ako je jednak 1, onda
    //je mod WALKING
   
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
  
  //Pozivamo servis Shops i trazimo "radnju" za odredjenim id-em
  $scope.shop = Shops.get($stateParams.shopsId);
  //Pozivamo servis maps koji nam vraca detaljen podatke o "radnajma"
  //(knjizare,fastfood-s..)
  $scope.shops = maps.getDetiles($stateParams.shopsId);

  //Funkcija koja prikazuje sve izabrane radnje na mapi
  $scope.showMapAll = function(){
       url = "map/" + $stateParams.shopsId+'/'+0;
       $location.path(url);
  }
  //Funkicja koja pokazuje odredjenu radnu na mapi
  $scope.showMapOne = function(latitude, longitude){
      url = "map/" + latitude+'/'+longitude+'/'+0;
       $location.path(url);
  }


});
