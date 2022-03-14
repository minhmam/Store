const jwt = require("jsonwebtoken");

class MiddlewareController {
    //verify Token
    verifytoken(req, res, next) {
        const token = req.headers.token;
        if(token){
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user)=>{
                if(err){
                    res.status(403).json("token is not valid");
                }
                req.user = user;
                next();
            });
        }
        else {
            res.status(401).json("You're not authenticated");
        }
    }

    //verify token and admin
    // verifyTokenAndAdmin(req, res, next) {
    //     MiddlewareController.verifytoken(req, res, ()=>{
    //         if(req.user.id == req.params.id || req.user.admin){
    //             next();
    //         }else {
    //             res.status(403).json("You're not allowed to delete other");
    //         }
    //     })
    // }

    verifyTokenAndAdmin(req, res, next) {
        const token = req.headers.token;
        if(token){
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user)=>{
                if(err){
                    res.status(403).json("token is not valid");
                }
                req.user = user;
                if(req.user.id == req.params.id || req.user.admin){
                    next();
                }else {
                    res.status(403).json("You're not allowed to delete other");
                }
            });
        }
        else {
            res.status(401).json("You're not authenticated");
        }
    }



}

module.exports = new MiddlewareController