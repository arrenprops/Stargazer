var app = angular.module('stargazerApp', ["ui.router"])

app.config(function($stateProvider, $urlRouterProvider){

$urlRouterProvider.otherwise("/");

$stateProvider.state("homeView", {
  url: "/",
  templateUrl:"./views/homeView.html",
  controller:"stargazerController"
})
$stateProvider.state("photos", {
  url: "/2",
  templateUrl:"./views/photoView.html",
  controller:"pictureController"
})
$stateProvider.state("contact", {
  url: "/3",
  templateUrl:"./views/contactView.html",
  controller:"stargazerController"
})
})
