angular
  .module("stargazerApp")
  .service("pictureService", function ($http) {

    var _picURL = [];
    var _spacePics = [];

    this.getSpacePics = function (callback) {
      $http.get("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=915f939e157ccee59c0178c839f50ef1&group_id=2190981%40N21&format=json&nojsoncallback=1")
        .success(function (response) {
          console.log(response)
          for (var i = 0; i < response.photos.photo.length; i++) {
            _picURL.push("https://farm" + response.photos.photo[i].farm + ".staticflickr.com/" + response.photos.photo[i].server + "/" + response.photos.photo[i].id + "_" + response.photos.photo[i].secret + "_m.jpg");
          }
          _spacePics = response;
          console.log(_spacePics.photos.photo)
          for (var i = 0; i < _picURL.length; i++) {
            _spacePics.photos.photo[i].url = _picURL[i];
          }
          callback(_spacePics);
        })
        .error(function () {
        })
    }
  })