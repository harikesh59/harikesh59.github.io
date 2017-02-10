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
    $scope.story = Object.assign({}, mockStory);


    $scope.getTopics = function(){
      var q = $scope.story.topic.name;
      if (!q) {
        $scope.topics = [];
        return;
      }
      $http.post(API_URL + '/topic/query', {q: q})
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
        $scope.campaign = Object.assign({}, mockCampaign);
      })
      .error(function(error){
        console.log(error);
      });
    }

  }]);

})(window);
