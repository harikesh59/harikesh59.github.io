(function(windows){

  angular.module('userApp')
  .controller('AnalyticsController', ['$scope', '$http', '$routeParams', 'API_URL', function($scope, $http, $routeParams, API_URL){

    console.log("Welcome to Analytics Controller");

    $scope.users = [];


    function pointInCircle(point, radius, center){
        return google.maps.geometry.spherical.computeDistanceBetween(point, center) <= radius;
    }

    $scope.numberOfUsers = 0;
    $http.get(API_URL + '/user/get_all_locations')
      .success(function(response){
        $scope.users = response.data;
        $http.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDfBhLe9gOv0IJdOqcg69OfwaIJb1hRzKY`)
          .success(function(response){
            $scope.users.forEach(function(user){
              if (user.last_location) {
                if (pointInCircle) {
                  $scope.numberOfUsers++;
                }
              }
            });
          })
          .error(function(error){
            console.log(error);
          });
      })
      .error(function(error){
        console.log(error);
      });

    $scope.toggleAnonymous = function(){

    }



  }]);

})(window);
