(function(windows){

  angular.module('userApp')
  .controller('ShowUserController', ['$scope', '$http', '$routeParams', 'API_URL', function($scope, $http, $routeParams, API_URL){

    console.log("Welcome to Show User Controller");

    $scope.user = {};


    var mockComment = {
      text: '',
      story: '',
    };

    $scope.comment = Object.assign({}, mockComment);

    $http.get(API_URL + '/user/get_by_id?id=' + $routeParams.user_id)
      .success(function(response){
        $scope.user = response.data;
      })
      .error(function(error){
        console.log(error);
      });


    $scope.createComment = function(){
      $scope.comment.story = $scope.story._id;
      $http.post(API_URL + '/comment/create', $scope.comment)
      .success(function(response){
        if (!$scope.story.comments) $scope.story.comments = [];
        $scope.comment = Object.assign({}, mockComment);
        response.data.created_by._id = response.data.created_by;
        response.data.created_by.username = mainUser.username;
        console.log($scope.story.comments);
        $scope.story.comments = [response.data].concat($scope.story.comments);
        $scope.showComments();
      })
      .error(function(error){
        console.log(error);
      });
    }

    $scope.showComments = function(){
      $http.get(API_URL + '/comment/get_by_story_id?id=' + $scope.story._id)
        .success(function(response){
          if (!$scope.story.comments) $scope.story.comments = [];
          $scope.story.commentsShow = true;
          $scope.story.comments = response.data.concat($scope.story.comments);
        })
        .error(function(error){
          console.log(error);
        });
    }
  }]);

})(window);
