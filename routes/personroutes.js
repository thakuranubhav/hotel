const express= require('express');
const router= express.Router();
const Person = require('./../models/person');
router.post('/', async(req, res) => {
    try{
        const data=req.body
        const newPerson= new Person(data)
         const response= await newPerson.save();
         console.log("Data saved", response);
         res.status(200).json(response);

    } catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server Error"})

    }

});
//get method for the post
router.get('/',async(req,res)=>{
    try{
        const data=  await Person.find();
        console.log("data fetched successfully");
        res.status(200).json(data);
    } catch(error){
        console.log("error");
        res.status(500).json({error:"Internal Server Error"});

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