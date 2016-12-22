myApp.factory('userApi',['$resource', function($resource){
    return{
        user: $resource('/userapi/user/:id',{id:'@id'})
    }
}])