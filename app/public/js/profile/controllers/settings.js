(function(windows){

  angular.module('userApp')
  .controller('SettingsController', ['$scope', '$http', '$routeParams', 'API_URL', function($scope, $http, $routeParams, API_URL){

    console.log("Welcome to Settings Controller");

    $scope.user = mainUser;

    $scope.toggleAnonymous = function(){
      $http.post(API_URL + '/user/toggle_anonymous')
        .success(function(response){
          $scope.user.is_anonymous = response.data.is_anonymous;
        })
        .error(function(error){
          console.log(error);
        });
    }



  }]);

})(window);
