var myApp=angular.module('myApp', [
    'ngRoute',
    'ui.bootstrap',
    'ngResource',
    'ngAnimate',
    'btford.socket-io',
    'chart.js',
    'nvd3'
    ]).
    config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        console.log("entered routeProvider");
        $routeProvider.when('/scale', {templateUrl: '/partials/scale.html', controller: 'scaleController', access:'user'});
        $routeProvider.when('/settings', {templateUrl: '/partials/settings.html', controller: 'settingsController', access:'tech'});
        $routeProvider.when('/login', {templateUrl: '/partials/login.html', controller: 'loginController', access:'user'});
        
        //if no valid routes are found, redirect to /home
        $routeProvider.otherwise({redirectTo: '/scale'});
        //new comment
        $locationProvider.html5Mode({enabled: true, requireBase: false});
    }])
    .filter('startFrom', function(){
        return function(data, start){
            return data.slice(start);
        };
    })
    .run(function ($rootScope, $location, $route, SimpleAuthService) {
      $rootScope.user;
      $rootScope.isLogged=false;
      
      $rootScope.validateAdmin=function(){
        if($rootScope.user.role.indexOf("admin")){
          return true;
        }
        else{
          return false;
        }
      };
      $rootScope.validateUser=function(){
        if($rootScope.user.name!="anonymous"){
          $rootScope.isLogged=true;
        }
        else{
          $rootScope.isLogged=false;
        }
      };
      
      $rootScope.getUser=function(){
        SimpleAuthService.getUserFromServer().then(function(){
          SimpleAuthService.getUser(function(data){
            $rootScope.user=data;
            $rootScope.validateUser();
          });
        });
      };
      
      $rootScope.getUser();
      
      $rootScope.$on('$routeChangeStart',
        function (event, next, current) {
          SimpleAuthService.getUserFromServer().then(function(){
            SimpleAuthService.getUser(function(user){
              if(next.access){
                if(user.name){
                  if(user.role.indexOf(next.access)==-1){
                    $location.path('/login');
                    $route.reload();
                  }
                }
              }
            });
          });
      });
    });