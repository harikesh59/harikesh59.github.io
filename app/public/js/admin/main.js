(function(window){

  var API_URL = '/api/v1';

  angular.module('adminApp', ['ngRoute'])
    .config(function($routeProvider){
      $routeProvider
        .when('/topic', {
          templateUrl: '/js/admin/templates/topic.html',
          constroller: 'TopicController'
        })
        .otherwise({
          templateUrl: '/js/admin/templates/topic.html',
          constroller: 'TopicController'
        })
    })
    .controller('TopicController', ['$scope', '$http', function($scope, $http){

      var TOPIC_API_URL = API_URL  + '/topic';

      $scope.topic = {
        name: ''
      }

      $scope.isEditingTopic = false;
      $scope.cancelEditingTopic = function(){
        $scope.topic = {
          name: ''
        }
        $scope.isEditingTopic = false;
      }

      $scope.topics = [];

      $scope.addTopic = function(){
        if ($scope.isEditingTopic) {
          $http.post(TOPIC_API_URL + '/update', $scope.topic)
            .success(function(response){
              response = response.data;
              $scope.topics = $scope.topics.map(function(c) {
                if (c._id === response._id) {
                  c.name = response.name;
                }
                $scope.isEditingTopic = false;
                return c;
              });
            })
            .error(function(error){
              console.log(error);
            });
        }
        else{
          $http.post(TOPIC_API_URL + '/create', $scope.topic)
            .success(function(response){
              $scope.topics.unshift(response.data);
            })
            .error(function(error){
              console.log(error);
            });
        }
        $scope.topic = {
          name: ''
        }
      }


      $scope.deleteTopic = function(id){
        $http.post(TOPIC_API_URL + '/remove', {_id: id})
          .success(function(response){
            $scope.topics = $scope.topics.filter(function(c){ return c._id !== id });
          })
          .error(function(error){
            console.log(error);
          });
      }

      $scope.editTopic = function(topic){
        $scope.isEditingTopic = true;
        $scope.topic = topic;
      }

      $http.get(TOPIC_API_URL + '/get_all')
        .success(function(response){
          $scope.topics = response.data;
        })
        .error(function(error){
          console.log(error);
        });

    }]);

})(window);
