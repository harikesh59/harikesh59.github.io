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


    $http.get(API_URL + '/story/get_by_user_id?id=' + mainUser._id)
      .success(function(response){
        $scope.stories = response.data;
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


    $scope.getConstituencies = function(){
      var q = $scope.campaign.constituency.name;
      $http.post(API_URL + '/constituency/query', {q: q})
        .success(function(response){
          $scope.constituencies = response.data;
        })
        .error(function(error){
          console.log(error);
        });
    }

    $scope.selectConstituency = function(c){
      $scope.campaign.constituency = c;
      $scope.constituencies = [];
    }

    $scope.getCategories = function(){
      var q = $scope.campaign.category.name;
      $http.post(API_URL + '/category/query', {q: q})
        .success(function(response){
          $scope.categories = response.data;
        })
        .error(function(error){
          console.log(error);
        });
    }

    $scope.selectCategory = function(c){
      $scope.campaign.category = c;
      $scope.categories = [];
    }

    $scope.changeConstituency = function(){
      var name = $scope.campaign.constituency.name;
      $http.get(API_URL + '/constituency/query?query=' + name)
      .success(function(response){
        console.log(response);
      })
      .error(function(error){
        console.log(error);
      });
    };

    $scope.isCreateCampaign = false;
    $scope.createCampaignForm = function(){
      $scope.isCreateCampaign = true;
    }

    $scope.createCampaign = function(){
      $http.post(API_URL + '/campaign/create', $scope.campaign)
      .success(function(response){
        $scope.isCreateCampaign = true;
        $scope.campaigns = $scope.campaigns.concat([response.data]);
        $scope.campaign = mockCampaign;
      })
      .error(function(error){
        console.log(error);
      });
    }

    $scope.createComment = function(campaign, index){
      $scope.comment.campaign = campaign._id;
      $http.post(API_URL + '/comment/create', $scope.comment)
      .success(function(response){
        if (!$scope.campaigns[index].comments) $scope.campaigns[index].comments = [];
        $scope.campaigns[index].comments.unshift(response.data);
        $scope.comment.text = '';
        $scope.comment.campaign = '';
      })
      .error(function(error){
        console.log(error);
      });
    }


    $scope.showComments = function(camp){
      $http.get(API_URL + '/comment/get_by_campaign_id?id=' + camp._id)
        .success(function(response){
          camp.commentsShow = true;
          camp.comments = response.data;
        })
        .error(function(error){
          console.log(error);
        });
    }


    $scope.closeCreateCampaignForm = function(){
      $scope.isCreateCampaign = false;
    }



  }]);

})(window);
