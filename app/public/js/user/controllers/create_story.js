(function(windows){

  angular.module('userApp')
  .controller('CreateStoryController', ['$scope', '$http', '$location', 'API_URL', function($scope, $http, $location, API_URL){

    console.log("Welcome to Create Story Controller");

    var mockStory = {
      text: '',
      topic: {
        name: ''
      },
      comments: [],
      commentsShow: false
    };

    $scope.topics = [];
    $scope.all_topics = [];
    $scope.story = Object.assign({}, mockStory);


    $scope.getTopics = function(){
      var q = $scope.story.topic.name;

      if (!q) {
        $scope.topics = [];
        return;
      }
      $http.post(API_URL + '/topic/query', {q: q})
        .success(function(response){
          $scope.all_topics = response.data;
          $scope.topics = $scope.all_topics;
        })
        .error(function(error){
          console.log(error);
        });
    }

    $scope.getAllTopics = function(){
      console.log("Gett All");
      $http.get(API_URL + '/topic/get_all')
        .success(function(response){
          $scope.topics = response.data;
        })
        .error(function(error){
          console.log(error);
        });
    }

    $scope.selectTopic = function(c){
      $scope.story.topic = c;
      $scope.topics = [];
    }

    $scope.createStory = function(){
      $http.post(API_URL + '/story/create', $scope.story)
      .success(function(response){
        // $location.path(`show-campaign/${response.data._id}`).replace();
        $location.path(`/home`).replace();
      })
      .error(function(error){
        console.log(error);
      });
    }

  }]);

})(window);
