const express= require('express');
const router= express.Router();
const Person = require('./../models/person');
const {jwtAuthMiddleware,generateToken}= require('./../jwt')
router.post('/signup', async(req, res) => {
    try{
        const data=req.body
        const newPerson= new Person(data)
         const response= await newPerson.save();
         console.log("Data saved", response);
         const payload={
          id: response.id,
          username: response.username
         }
         const token=generateToken(payload);
         console.log('token is ',token);
         res.status(200).json({response:response,Token:token});

    } catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server Error"})

    }

})
router.post('/login', async(req,res)=>{
  try{
    const {username, password}= req.body;
    console.log(username);
    //find the user by username
    const user= await Person.findOne({username});
    if(!user || ! (await user.comparePassword(password))){
      console.log(user);
      console.log(password);
      return res.status(401).json({error:'Incorrect Credentials'});
    }
    //generate Token
    const payload={
      id: user.id,
      username: user.username
    }
    const token= generateToken(payload);
    res.json({token})
  } catch(err){
    console.log(err);
    res.status(401).json({error:'Unable to Generate Token'})
  }
})
//get method for the post
router.get('/',jwtAuthMiddleware,async(req,res)=>{
    try{
        const data=  await Person.find();
        console.log("data fetched successfully");
        res.status(200).json(data);
    } catch(error){
        console.log("error");
        res.status(500).json({error:"Internal Server Error"});

    }
})
router.get('/profile',jwtAuthMiddleware, async (req,res)=>{
  try{
    const userData= req.user;
    console.log("User Data",userData);
    const userId= userData.id;
    const  user = await Person.findById(userId);
    res.status(200).json({user})
    
  } catch(err){
    console.log(err);
    res.status(401).json({error:'Invalid User'})
  }
})
router.get('/:workType', async(req,res)=>{
    try{
      const workType= req.params.workType;
      if(workType=='chef'|| workType=='manager' || workType=='waiter'){
        const response= await Person.find({work:workType});
        console.log("response fetched");
        res.status(200).json(response);
  
      } else{
        res.status(404).json({error:"Invalid workType"});
      }
  
    } catch(error){
      console.log(error);
      res.status(500).json({error:"Internal Server Error"});
  
    }
  })
  router.put('/:id', async (req,res)=>{
    try{
        const personId= req.params.id;
        const updatePersonData= req.body;
        const response= await Person.findByIdAndUpdate(personId, updatePersonData, { new: true,
            runValidators:true,
            
         });
         if(!response){
            console.log("Invalid Id");
         }
         console.log("Updated Successfully");
         res.status(200).json(response);


    } catch(error){
        console.log(error);
      res.status(500).json({error:"Internal Server Error"});
    }
  })
  router.delete('/:id',async (req,res)=>{
    try{
        const personId=req.params.id;
        const response= await Person.findByIdAndDelete(personId);
        if(!response){
            console.log("Invalid Id");
         }
         console.log("Deleted  Successfully");
         res.status(200).json({message:"person deleted !!"});



    } catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server Error"});
    }

  })
  module.exports=router;