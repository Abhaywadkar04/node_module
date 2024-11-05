const express=require('express');
const router=express.Router();
const menu=require('./../models/menu');




router.get('/',async(req,res)=>{
    try{
      const menus=await menu.find();
      res.status(200).json(menus);
    }
  catch(err){
    res.status(400).send(err);
  }
  
  });



router.post('/', async (req, res) => {
    try {
      const newMenu = new menu(req.body);
      const saveMenu=await newMenu.save();
      res.send(saveMenu);
      console.log(req.body);
      res.status(200);  
    } catch (err) {
      res.status(400).send(err);

    }
  });
  

  router.get('/:category',async(req,res)=>{ 
    const category=req.params.category;
    if(category==="Beverage" || category==="Appetizer" || category==="Main Course" || category==="Dessert"){
      try{
        const menus=await menu.find({category:category});
        res.status(200).json(menus);
      }
      catch(err){
        res.status(400).send(err);
      }
    }
    else{
      res.status(400).send({error:"Invalid category"});
    }
  
  });
module.exports=router;