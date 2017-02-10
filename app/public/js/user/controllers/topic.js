(function(windows){

  angular.module('userApp')
  .controller('TopicController', ['$scope', '$http', '$routeParams', 'API_URL', function($scope, $http, $routeParams, API_URL){

    console.log("Welcome to Topic Controller");

    $scope.stories = [];
    $scope.topic = {
      name: 'Loading'
    }

    $http.get(API_URL + '/story/get_by_topic_id?id=' + $routeParams.topic_id)
      .success(function(response){
        $scope.stories = response.data;
      })
      .error(function(error){
        console.log(error);
      });

    $http.get(API_URL + '/topic/get_by_id?id=' + $routeParams.topic_id)
      .success(function(response){
        $scope.topic = response.data;
      })
      .error(function(error){
        console.log(error);
      });


    $scope.textArray = [];
    var BIG_WORDS = 4,
        MAX_WORDS = 40;
    $scope.getBig = function(text){
      $scope.textArray = text.split(' ');
      return $scope.textArray.slice(0, 4).join(' ');
    }

    $scope.getSmall = function(text){
      $scope.textArray = text.split(' ');
      return $scope.textArray.slice(BIG_WORDS+1, MAX_WORDS).concat('....').join(' ');
    }


  }]);

})(window);
