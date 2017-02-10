(function(window){

  angular.module('userApp', ['ngRoute'])
    .config(function($routeProvider){
      $routeProvider
        .when('/home', {
          templateUrl: '/js/user/templates/home.html',
          constroller: 'HomeController'
        })
        .when('/create-story', {
          templateUrl: '/js/user/templates/create_story.html',
          constroller: 'CreateStoryController'
        })
        .when('/show-story/:story_id', {
          templateUrl: '/js/user/templates/show_story.html',
          constroller: 'ShowStoryController'
        })
        .when('/topic/:topic_id/stories', {
          templateUrl: '/js/user/templates/topic.html',
          constroller: 'TopicController'
        })
        .when('/user/:user_id', {
          templateUrl: '/js/user/templates/show_user.html',
          constroller: 'ShowUserController'
        })
        .when('/settings', {
          templateUrl: '/js/user/templates/settings.html',
          constroller: 'SettingsController'
        })
        .when('/analytics', {
          templateUrl: '/js/user/templates/analytics.html',
          constroller: 'AnalyticsController'
        })
        .when('/search', {
          templateUrl: '/js/user/templates/search.html',
          constroller: 'SearchController'
        })
        .otherwise({
          templateUrl: '/js/user/templates/home.html',
          constroller: 'HomeController'
        })
    })
    .constant('API_URL', '/api/v1');

})(window);
