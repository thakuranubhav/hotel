const mongoose = require('mongoose');
const bcrypt= require('bcrypt');
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ['chef', 'waiter', 'manager'],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  username:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  }

});
personSchema.pre('save', async function(next){
  const person =this;
  // Hash the password only if it has been modified (or is new)
  if(!person.isModified('password')){
    return next();
    }
  try{
// hash password generation
const salt= await bcrypt.genSalt(10);
//hash password
const hashPassword= await bcrypt.hash(person.password,salt);
//override the plain password with the hashed one
person.password= hashPassword;
    next();

  } catch(err){
    return next(err);
  }
})
personSchema.methods.comparePassword= async function(candidatePassword){
  try{
    const isMatch= await bcrypt.compare(candidatePassword, this.password);
    console.log(isMatch);
    console.log(this.password);
    console.log(candidatePassword);
      return isMatch;
 
  } catch(err){
    throw err;

  }
}
// working of compare method
//anubhav -----> xbaba86a78e21@1q2212!ajbdjad72w87
//login ------> agrawal wrong password entered;
//xbaba86a78e21@1q2212!ajbdjad72w87 -->extract salt;

//salt+agrawal ----> hash --->gwqudguqw!!@!@*#(#!#!&#Sadhjdjadja)
//then isMatch;



const Person = mongoose.model('person', personSchema);
module.exports = Person;
