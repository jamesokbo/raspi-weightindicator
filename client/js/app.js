var myApp=angular.module('myApp', [
    'ngRoute',
    'ui.bootstrap',
    'ngResource',
    'btford.socket-io',
    'chart.js',
    'nvd3',
    'ngAria',
    'ngAnimate',
    'ngMaterial',
    'material.components.keyboard'
    ])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        console.log("entered routeProvider");
        $routeProvider.when('/scale', {templateUrl: '/partials/scale.html', controller: 'scaleController', access:'user'});
        $routeProvider.when('/settings', {templateUrl: '/partials/settings.html', controller: 'settingsController', access:'tech'});
        $routeProvider.when('/login', {templateUrl: '/partials/login.html', controller: 'loginController', access:'user'});
        
        //if no valid routes are found, redirect to /home
        $routeProvider.otherwise({redirectTo: '/scale'});
        //new comment
        $locationProvider.html5Mode({enabled: true, requireBase: false});
    }])
    //keyboard config
    .config(function ($mdKeyboardProvider) {
  
      // add layout for number fields 
      $mdKeyboardProvider.addLayout('Numbers', {
        'name': 'Numbers', 'keys': [
              [['7', '7'], ['8', '8'], ['9', '9'], ['Bksp', 'Bksp']],
              [['4', '4'], ['5', '5'], ['6', '6'], ['-', '-']],
              [['1', '1'], ['2', '2'], ['3', '3'], ['+', '+']],
              [['0', '0'], ['Spacer'], [','], ['Enter', 'Enter']]
        ], 'lang': ['de']
      });
      $mdKeyboardProvider.addLayout('Android', {
        'name': 'Android', 'keys': [
              [["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["0", "0"]],
              [["q", "Q"], ["w", "W"], ["e", "E"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"]],
              [["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"]],
              [["Shift", "Shift"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], ["Bksp", "Bksp"]],
              [[" ", " "]]
        ], 'lang': ['en']
      });
   
      // default layout is Android
      $mdKeyboardProvider.defaultLayout('Android');
    })
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