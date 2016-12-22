myApp.controller('loginController', ['$rootScope','$scope', '$location', 'SimpleAuthService', function($rootScope, $scope, $location, SimpleAuthService){
    console.log("entered loginController");
    $scope.logInErrorMessage='';
    $scope.logInSuccessMessage='';
    $scope.form={};
    $scope.form.password='';
    $scope.hideForm=false;
    $scope.user;
    
    $scope.login = function () {
        // initial values
        $scope.error = false;
        // call login from service
        SimpleAuthService.login($scope.form.password)
            // handle success
        .then(function (user) {
            $scope.logInSuccessMessage='Success!';
            $scope.disabled = true;
            $scope.logInErrorMessage='';
            $scope.form.password='';
            $scope.hideForm=true;
            $rootScope.user=user;
            $rootScope.validateUser();
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.logInErrorMessage = "Invalid password";
          $scope.disabled = false;
          $scope.loginForm = {};
          $scope.form.password='';
        });
    };
}]);