(function(windows){

  angular.module('userApp')
  .controller('HomeController', ['$scope', '$http', 'API_URL', function($scope, $http, API_URL){

    console.log("Welcome to Home Controller");

    var mockStory = {
      text: '',
      topic: {
        name: ''
      },
      comments: [],
      commentsShow: false
    };

    var mockComment = {
      text: '',
      campaign: '',
    };

    $scope.stories = [];
    $scope.constituencies = [];
    $scope.categories = [];

    $scope.story = Object.assign({}, mockStory);
    $scope.comment = mockComment;


    // $http.get(API_URL + '/user/get_my_followed_stories?id=' + mainUser._id)
    //   .success(function(response){
    //     console.log(response.data);
    //   })
    //   .error(function(error){
    //     console.log(error);
    //   });

    $http.get(API_URL + '/story/get_user_stories_by_id?id=' + mainUser._id)
      .success(function(response){
        $scope.stories = response.data;
        $scope.feeds = $scope.stories;
      })
      .error(function(error){
        console.log(error);
      });


    function pointInCircle(point, radius, center){
        return google.maps.geometry.spherical.computeDistanceBetween(point, center) <= radius;
    }

    setInterval(function(){
      $http.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDfBhLe9gOv0IJdOqcg69OfwaIJb1hRzKY`)
        .success(function(response){
          $http.post(API_URL + '/user/update_location', {location: response.location})
            .success(function(response){
              console.log(response);
            })
            .error(function(error){
              console.log(error);
            });
        })
        .error(function(error){
          console.log(error);
        });
    }, 10000);



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

    $scope.filterStories = function(type){
      console.log(type);
      if (type === 'feed') {
        $scope.stories = $scope.feeds;
      }
      else if (type === 'my') {
        $scope.stories = $scope.feeds;
      }
      else if (type === 'followed') {
        $http.get(API_URL + '/user/get_my_followed_stories')
          .success(function(response){
            $scope.stories = response.data;
          })
          .error(function(error){
            console.log(error);
          });
      }
    }

  }]);

})(window);
