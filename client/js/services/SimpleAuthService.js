myApp.factory('SimpleAuthService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {
    // create user variable
    var name='anonymous';
    var role=['user'];
    
    //Funciones de autentificación    
    function isAdmin(fn) {
      if(role.indexOf('admin')==-1) {
        fn(true);
      } else {
        fn(false);
      }
    }
    function login(password) {
      // create a new instance of deferred
      var deferred = $q.defer();
      // send a post request to the server
      $http.post('/login',
      {password: password})
      // handle success
      .success(function (data, status) {
        if(status === 200){
          name = data.name;
          role=data.role;
          deferred.resolve({name,role});
        } 
        else {
          deferred.reject();
        }
      })
      // handle error
      .error(function (data) {
        deferred.reject();
      });
      // return promise object
      return deferred.promise;
    }
    function logout() {
        // create a new instance of deferred
        var deferred = $q.defer();
        
        // send a get request to the server
        $http.get('/logout')
        // handle success
        .success(function (data) {
          name='anonymous';
          role=['user'];
          deferred.resolve();
        })
        // handle error
        .error(function (data) {
          deferred.reject();
        });
        // return promise object
        return deferred.promise;
    }
      
    function getUserFromServer() {
      return $http.get('/user')
      // handle success
      .success(function (data) {
        if(data.name){
          name=data.name;
          role=data.role;
        } 
        else {
        }
      })
      // handle error
      .error(function (data) {
        
      });
    }
    function getUser(fn){
      var data={name,role}
      fn(data);
    }
    
    

    // return available functions for use in the controllers
    return ({
      isAdmin: isAdmin,
      getUserFromServer: getUserFromServer,
      getUser: getUser,
      login: login,
      logout: logout,
    });
}]);