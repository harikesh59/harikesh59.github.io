(function(windows){

  angular.module('userApp')
  .service('Help', ['$scope', '$http', '$routeParams', 'API_URL', function($scope, $http, $routeParams, API_URL){

    return {
      getDateString: function(date){
        return (new Date(date)).toDateString();
      }
    }

  }]);

})(window);
