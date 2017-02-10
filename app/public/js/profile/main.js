(function(window){

  angular.module('profileApp', ['ngRoute'])

    .constant('API_URL', '/api/v1')

    .controller('MainController', ['$scope', '$http', '$routeParams','API_URL', function($scope, $http, $routeParams, API_URL){

      console.log("Welcome to Profile Main Controller");

      $scope.stories = [];
      $scope.user = mainUser;
      $scope.logged_in_user = logged_in_user;

      $http.get(API_URL + '/story/get_user_stories_by_id?id=' + mainUser._id)
        .success(function(response){
          $scope.stories = response.data;
        })
        .error(function(error){
          console.log(error);
        });



      $scope.getDateString = function(date){
        return (new Date(date)).toDateString();
      }

      $scope.ifFollowed = function(story_id){
        return $scope.user.following_stories.findIndex(function(q) { return q === story_id } ) != -1;
      }

      $scope.ifFollowingUser = function(){
        return $scope.logged_in_user.followings.findIndex(function(q) { return q === $scope.user._id } ) != -1;
      }

      $scope.followStory = function(story_id, e){
        e.preventDefault();
        if ($scope.ifFollowed(story_id)) {
          $http.get(API_URL + '/user/unfollow_story?id=' + story_id)
            .success(function(response){
              console.log(response.data);
              console.log(e.target.parentElement);
              jQuery(e.target.parentElement).removeClass('active');
            })
            .error(function(error){
              console.log(error);
            });
        }
        else{
          $http.get(API_URL + '/user/follow_story?id=' + story_id)
            .success(function(response){
              console.log(response.data);
              console.log(e.target.parentElement);
              jQuery(e.target.parentElement).addClass('active');
            })
            .error(function(error){
              console.log(error);
            });
        }
      }

      $scope.followUser = function(e){
        e.preventDefault();
        if ($scope.ifFollowingUser()) {
          $http.get(API_URL + '/user/unfollow_user?id=' + $scope.user._id)
            .success(function(response){
              console.log(response.data);
              jQuery(e.target).removeClass('active');
            })
            .error(function(error){
              console.log(error);
            });
        }
        else{
          $http.get(API_URL + '/user/follow_user?id=' + $scope.user._id)
            .success(function(response){
              console.log(response.data);
              jQuery(e.target).addClass('active');
            })
            .error(function(error){
              console.log(error);
            });
        }
      }


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
