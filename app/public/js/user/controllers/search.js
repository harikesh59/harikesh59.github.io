(function(windows){

  angular.module('userApp')
  .controller('SearchController', ['$scope', '$http', '$routeParams', 'API_URL', function($scope, $http, $routeParams, API_URL){

    console.log("Welcome to Search Controller");

    $scope.users = [];

    $http.get(API_URL + '/user/get_all')
      .success(function(response){
        $scope.users = response.data;
      })
      .error(function(error){
        console.log(error);
      });

    $scope.toggleAnonymous = function(){

    }



  }]);

})(window);
