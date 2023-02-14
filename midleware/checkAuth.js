const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models').User;
async function loggerMiddleware(req, res, next) {
    try {

        let token = String(req.headers.authorization || "");
        token = token.replace(/bearer|jwt/i, "").replace(/^\s+|\s+$/g, "");
        if (!token) throw new Error("MISSING_TOKEN");

        const dataOk = jwt.verify(token, process.env.secretKey);
        console.log("dataOk",dataOk);
        const isUserExists = await User.findOne({where:{id:dataOk}});
        if (!isUserExists) throw new Error("INVALID_TOKEN");
        req.user = isUserExists;
        next();
    } catch (error) {
        console.error(error);
        const message = String(error.name).toLowerCase() === "error" ? error.message : "UNAUTHORIZED_ACCESS";
        // return res.error(401, message);
        return res.status(401).json({status:401,message:message});
    }
}

module.exports =  loggerMiddleware