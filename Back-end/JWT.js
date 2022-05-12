const {sign, verify} = require("jsonwebtoken");
const secret = process.env.JWTSecret

const createTokens = (user) => {
    const accessToken = sign({ email: user.email, id: user.id}, secret, {
        expiresIn: 60*60*24*30*1000,
    });
    return accessToken;
}

const validateToken = (req, res, next) => {
    const accessToken = req.headers["access-token"]

    if(!accessToken) return res.send("User not Authenticated");

    try{
        const validToken = verify(accessToken, secret)
        if(validToken){
            req.authenticated = true
            return next();
        }
    }catch(err){
        res.send(err);
    }
};

module.exports = {createTokens, validateToken};