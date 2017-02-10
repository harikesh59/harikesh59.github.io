(function(window){

  var API_URL = '/api/v1';

  angular.module('homeApp', ['ngRoute'])
    .config(function($routeProvider){
      $routeProvider
        // .when('/home', {
        //   templateUrl: '/js/user/templates/home.html',
        //   constroller: 'HomeController'
        // })
        // .when('/create-campaign', {
        //   templateUrl: '/js/user/templates/create_campaign.html',
        //   constroller: 'CreateCampaignController'
        // })
        // .when('/show-campaign/:campaign_id', {
        //   templateUrl: '/js/user/templates/show_campaign.html',
        //   constroller: 'ShowCampaignController'
        // })
        // .when('/settings', {
        //   templateUrl: '/js/user/templates/settings.html',
        //   constroller: 'SettingsController'
        // })
        // .when('/profile', {
        //   templateUrl: '/js/user/templates/profile.html',
        //   constroller: 'ProfileController'
        // })
        // .when('/inbox', {
        //   templateUrl: '/js/user/templates/inbox.html',
        //   constroller: 'InboxController'
        // })
        // .otherwise({
        //   templateUrl: '/js/user/templates/home.html',
        //   constroller: 'HomeController'
        // })
    })
    .controller('HomeController', ['$scope', '$http', function($scope, $http){
      console.log("Welcome to Home Controller");

      $scope.loginUser = {
        username: '',
        password: ''
      }

      $scope.registerUser = {
        username: '',
        password: '',
        email: '',
        first_name: '',
        last_name: ''
      }

    }]);

})(window);
