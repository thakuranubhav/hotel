const passport = require("passport");
const localStrategy= require('passport-local').Strategy;
const Person= require('./models/person');
passport.use(new localStrategy(async (username,password,done)=>{
  try{
    //console.log('Recieved Credentials:', username,password);
    const user= await Person.findOne({username});
    if(!user){
      //console.log('wrong user');
      return done(null, false,{message:'Incorrect username'});

    }
      const isPasswordMatch= await user.comparePassword(password);
      if(isPasswordMatch){
        return done(null,user);
      }
      else{
        return done(null, false,{message:'Incorrect username'});
      }


  }  catch(err){
    console.log(err);
      return done(err);
  }
}))
module.exports=passport;