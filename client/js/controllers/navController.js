myApp.controller('navController', ['$rootScope','$scope', '$location', 'SimpleAuthService', function($rootScope,$scope, $location, SimpleAuthService){
    console.log('entered NavController');
    $scope.isAdmin=false;
    
    $scope.isActive = function(destination){
        SimpleAuthService.isAdmin(function(res){
            if(res){
                $scope.isAdmin=true;
            }
            else{
                $scope.isAdmin=false;
            }
        });
        return destination === $location.path();
    };
    //función para cerrar sesión del usuario
    $scope.logOut=function(){
        SimpleAuthService.logout().then(function(){
            $rootScope.getUser();
        });
        SimpleAuthService.isAdmin(function(res){
            if(res){
                $scope.isAdmin=true;
            }
            else{
                $scope.isAdmin=false;
            }
        });
    };
}]);