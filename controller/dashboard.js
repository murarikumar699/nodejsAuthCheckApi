const User = require('../models').User;
const Validation = require('../validation/validate');


module.exports.dashboard = async(req,res) => {
    try{
        console.log("req.user",req.user.id)
        return res.status(201).json({status:201,message:"Welcome to dashboard"});
    }catch(error){
        
        return res.status(401).json({status:401,message:"Something went wrong"});
    }
}