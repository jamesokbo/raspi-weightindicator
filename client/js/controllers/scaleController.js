myApp.controller('scaleController', ['$scope', '$location', 'SimpleAuthService', 'Socket', function($scope, $location, SimpleAuthService,Socket){
    console.log("entered scaleController");
    $scope.unit='kg';
    $scope.weight=0.001;
    
    //tarar el peso
    $scope.tare=function(){
      Socket.emit('tare',function(res,err){
          if(err){
              throw err;
          }
      });  
    };
    //Obtener unidad
    $scope.getUnit=function(){
        Socket.emit('getUnit',function(res,err){
           if(err){
               throw err;
           }
           $scope.unit=res;
        });
    };

    //recibir el peso del servidor
    Socket.on('weight',function(data){
        $scope.weight=data.weight;
    });
    
    $scope.getUnit();
}]);