angular
  .module('stargazerApp')
  .controller('pictureController', function ($scope, $http, pictureService) {

    pictureService.getSpacePics(function (r) {
      $scope.spacePics = r;
      $scope.fullPicURL = $scope.spacePics.photos.photo[0].url;
      $scope.fullPicTitle = $scope.spacePics.photos.photo[0].title;
    });
    $scope.Keyword1 = "";
    $scope.Keyword2 = "";
    $scope.Keyword3 = "";
    $scope.keywordOne = "";
    $scope.keywordTwo = "";
    $scope.keywordThree = "";
    $scope.searchForPics = function () {
      $scope.Keyword1 = $scope.keywordOne;
      $scope.Keyword2 = $scope.keywordTwo;
      $scope.Keyword3 = $scope.keywordThree;
      $http.get("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=915f939e157ccee59c0178c839f50ef1&tags=" + $scope.Keyword1 + "+" + $scope.Keyword2 + "+" + $scope.Keyword3 + "&format=json&nojsoncallback=1")
        .success(function (response) {
          $scope.picURL = [];
          for (var i = 0; i < response.photos.photo.length; i++) {
            $scope.picURL.push("https://farm" + response.photos.photo[i].farm + ".staticflickr.com/" + response.photos.photo[i].server + "/" + response.photos.photo[i].id + "_" + response.photos.photo[i].secret + "_m.jpg");
          }
          $scope.spacePics = response;
          for (var i = 0; i < $scope.picURL.length; i++) {
            $scope.spacePics.photos.photo[i].url = $scope.picURL[i];
          }
          $scope.page = 0;
        })
        .error(function () {
        })
    }
    $scope.page = 0;
    $scope.nextFunc = function () {
      if ($scope.page < ($scope.spacePics.photos.photo.length - 12)) {
        $scope.page += 12;
      }
    }
    $scope.backFunc = function () {
      if ($scope.page >= 12) {
        $scope.page -= 12;
      }
    }
    $scope.seeFull = function (pic) {
      $scope.fullPicURL = pic.url;
      $scope.fullPicTitle = pic.title;
    }
  })