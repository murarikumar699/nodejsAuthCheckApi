const User = require('../models').User;
const Validation = require('../validation/validate')
const jwt = require('jsonwebtoken');
var md5 = require('md5');


module.exports.signUp = async(req,res) => {
    try{
        const user = req.body;          
          const { error, value } = Validation.signUpValidate.validate(user);
          
          if (error) {
                console.log(error.details);
                return res.status(401).json({status:201,message:error.details[0].message});
          }
          delete user.repeatPassword;
          user.password = md5(user.password);
          let userData = await User.create(user);
          const token = jwt.sign(userData.id, process.env.secretKey);

        return res.status(201).json({status:201,message:"You are successfully signin",token:token});
    }catch(error){
        if(error?.errors[0]?.message){
            return res.status(401).json({status:401,message:error?.errors[0]?.message});    
        }
        return res.status(401).json({status:401,message:"Something went wrong"});
    }
}

module.exports.login = async (req,res) => {
    try{
        const user = req.body;
        const { error, value } = Validation.loginValidate.validate(user);
          
        if (error) {
              console.log(error.details);
              return res.status(401).json({status:201,message:error.details[0].message});
        }

        let userData =  await User.findOne({where:{email:user.email,password:md5(user.password)}});
        if(!userData || userData == null || userData == undefined || userData == ''){
            return res.status(401).json({status:401,message:"Email or password is incorrect"});    
        }
        console.log("userData",userData)
        const token = jwt.sign(userData.id, process.env.secretKey);
        return res.status(201).json({status:201,message:"You are successfully signin",token:token});

    }catch(error){
        return res.status(401).json({status:401,message:"Something went wrong"});
    }
}

