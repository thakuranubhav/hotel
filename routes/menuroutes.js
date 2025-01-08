const express= require('express');
const router= express.Router();
const MenuItem= require('./../models/MenuItem');

router.post('', async(req, res) => {
    try{
        const data12=req.body
        const newMenu= new MenuItem(data12)
         const response= await newMenu.save();
         console.log("Data saved", response);
         res.status(200).json(response);

    } catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server Error"})

    }

});
router.get('', async(req,res)=>{
    try{
      const menug= await MenuItem.find();
      console.log("data feteched successfully");
      res.status(200).json(menug);
  
    } catch(error){
      console.log(error);
      res.status(500).json({error:"Internal Server Error"})
    }
  })
  router.get('/:tasteType', async(req,res)=>{
    try{
      const tasteType= req.params.tasteType;
      if(tasteType=='sweet'|| tasteType=='sour'|| tasteType=='salty'){
        const response= await MenuItem.find({taste:tasteType});
        console.log("Data Fetched Successfully");
        res.status(200).json(response);
        if(!response){
          console.log("Invalid tasteType");
          res.status(404).json({message:"Inbalid tasteType"});
        }

      }
  
    } catch(error){
      console.log(error);
      res.status(500).json({error:"Internal Server Error"})
    }
  })
  module.exports=router;