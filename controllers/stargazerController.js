var scopeRef;
angular
  .module('stargazerApp')
  .controller('stargazerController', function ($scope, $http, pictureService, $sce) {
    // initialize toggle
    $scope.welcomeOrCondition = true;
    // initialize for google maps delay
    scopeRef = $scope;
    $scope.astroURL = $sce.trustAsResourceUrl('http://www.sky-map.org/?ra=18.5&de=40&zoom=1');
    // google maps options
    $scope.initMapController = function () {
      var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
        scrollwheel: false
      }); 
      map.addListener('click', function (e) {
        placeMarkerAndPanTo(e.latLng, map);
        var newLat = e.latLng.lat();
        var newLong = e.latLng.lng();
        newLoc(newLat, newLong);
        $scope.welcomeOrCondition = false;
        $scope.astroURL = $sce.trustAsResourceUrl('http://www.sky-map.org/?ra=' + newLong + '&de=' + newLat + '&zoom=1');
      });
      function placeMarkerAndPanTo(latLng, map) {
        var marker = new google.maps.Marker({
          position: latLng,
          map: map
        });
        map.panTo(latLng);
      }
      var infoWindow = new google.maps.InfoWindow({ map: map });
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found.');
          map.setCenter(pos);
        }, function () {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
          'Error: The Geolocation service failed.' :
          'Error: Your browser doesn\'t support geolocation.');
      }
    }
    //Gets lat and Long weather info when map is clicked
    function newLoc(newLat, newLong) {
      $http.get("http://api.wunderground.com/api/58d617348faf8366/conditions/forecast/conditions/astronomy/q/" + newLat + "," + newLong + ".json")
        .success(function (response) {
          $scope.weather = response;
          if($scope.weather.moon_phase.moonset.hour > 12){
            $scope.weather.moon_phase.moonset.hour -= 12;
            $scope.moonset = $scope.weather.moon_phase.moonset.hour + ":" + $scope.weather.moon_phase.moonset.minute + " PM";
          }else{
            $scope.moonset = $scope.weather.moon_phase.moonset.hour + ":" + $scope.weather.moon_phase.moonset.minute + " AM";
          }
          if($scope.weather.moon_phase.moonrise.hour > 12){
            $scope.weather.moon_phase.moonrise.hour -= 12;
            $scope.moonrise = $scope.weather.moon_phase.moonrise.hour + ":" + $scope.weather.moon_phase.moonrise.minute + " PM";
          }else{
            $scope.moonrise = $scope.weather.moon_phase.moonrise.hour + ":" + $scope.weather.moon_phase.moonrise.minute + " AM";
          }
          if($scope.weather.moon_phase.sunset.hour > 12){
            $scope.weather.moon_phase.sunset.hour -= 12;
            $scope.sunset = $scope.weather.moon_phase.sunset.hour + ":" + $scope.weather.moon_phase.sunset.minute + " PM";
          }else{
            $scope.sunset = $scope.weather.moon_phase.sunset.hour + ":" + $scope.weather.moon_phase.sunset.minute + " AM";
          }
        })
        .error(function () {
        })
    }
  })