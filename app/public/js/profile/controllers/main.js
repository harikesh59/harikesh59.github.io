(function(windows){

  angular.module('userApp')
  .controller('MainController', ['$scope', '$http', 'API_URL', function($scope, $http, API_URL){

    console.log("Welcome to Main Controller");


    $scope.getDateString = function(date){
      return (new Date(date)).toDateString();
    }

  }]);

})(window);
