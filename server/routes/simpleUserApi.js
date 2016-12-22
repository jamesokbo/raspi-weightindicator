module.exports= function(router, session){
    
    
    //Función de autentificación
    var auth = function(req, res, next) {
      if (req.session && req.session.name === "braunker" && req.session.admin)
        return next();
      else
        return res.sendStatus(401);
    };
    
    //Roles
    var ADMIN=['tech','admin','user'];
    var TECH=['tech','user'];
    var USER=['user'];

    //Login del usuario
    router.post('/login',function(req,res,next){
        if(req.body.password){
            var password=req.body.password;
            
            if(password=="braunker"){
                req.session.name="braunker";
                req.session.role=ADMIN;
                res.status(200).send(req.session);
            }
            else if(password=="tech"){
                req.session.name="tech";
                req.session.role=TECH;
                res.status(200).send(req.session);
            }
            else{
                return res.status(500).json({
                  err: 'Could not log in user'
                });
            }
        }
    });
    //Logout del usuario
    router.get('/logout', function(req, res) {
        req.session.destroy();
        res.status(200).json({
            status: 'Bye!'
        });
    });
    //Status del usuario
    router.get('/user', function(req, res) {
        if(req.session.name) {
            return res.status(200).json({
              name:req.session.name,
              role:req.session.role
            });
        }
        return res.status(200).json({});
    });
    
};