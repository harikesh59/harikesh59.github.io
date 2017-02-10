(function(windows){

  angular.module('userApp')
  .controller('ShowShowController', ['$scope', '$http', '$routeParams', 'API_URL', function($scope, $http, $routeParams, API_URL){

    console.log("Welcome to Show Story Controller");

    $scope.story = {};


    var mockComment = {
      text: '',
      story: '',
      created_by: mainUser
    };

    $scope.comment = Object.assign({}, mockComment);


    $scope.getDateString = function(date){
      return (new Date(date)).toDateString();
    }

    $scope.sentiments = {
      score: 'Loading'
    }

    var sentimentAnalysis = function(){
      let text = 'Its+good';

      $http.get(`${API_URL}/comment/get_by_story_id/sentiments?id=${$routeParams.story_id}`, {
        headers: {
          'Ocp-Apim-Subscription-Key': 'd859ba5976f745b088582363b37d5b93',
          'Access-Control-Allow-Origin': 'all'
        },
        data: {
          documents: [
            {
               language: "en",
               id: "1",
               text: text
             }
          ]
        }
      })
        .success(function(response){
          $scope.sentiments = response.data.documents[0];
        })
        .error(function(error){
          console.log(error);
        });
    }

    $http.get(API_URL + '/story/get_by_id?id=' + $routeParams.story_id)
      .success(function(response){
        $scope.story = response.data;

        $http.get(API_URL + '/comment/get_by_story_id?id=' + $scope.story._id)
          .success(function(response){
            $scope.story.comments = response.data;

            sentimentAnalysis();

          })
          .error(function(error){
            console.log(error);
          });

      })
      .error(function(error){
        console.log(error);
      });


    $scope.createComment = function(){
      $scope.comment.story = $scope.story._id;
      $http.post(API_URL + '/comment/create', $scope.comment)
      .success(function(response){
        $scope.story.comments.unshift($scope.comment);
        $scope.comment = Object.assign({}, mockComment);
        // response.data.created_by._id = response.data.created_by;
        // response.data.created_by.username = mainUser.username;
        // console.log($scope.story.comments);
        // $scope.story.comments = [response.data].concat($scope.story.comments);
        // $scope.showComments();
      })
      .error(function(error){
        console.log(error);
      });
    }


  }]);

})(window);
