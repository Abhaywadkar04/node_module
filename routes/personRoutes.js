const express=require('express');
const router=express.Router();
const person=require('./../models/person');


router.post('/', async (req, res) => {
    try {
        const newPerson = new person(req.body);
        const savedPerson = await newPerson.save();
        res.send(savedPerson);
        console.log(req.body);
        res.status(200);
    } catch (err) {
        res.status(400).send(err);
    }
});


router.get('/',async(req,res)=>{
    try{
      const persons=await person.find();
      console.log(req.body);
          res.status(200).json(persons);
  
    }
    catch(err){
      res.status(400).send(err);
    }
  
  });


  router.get('/:worktype',async(req,res)=>{ 
    try{
      const worktype=req.params.worktype;
      if(worktype==='manager' || worktype==='staff' || worktype==='waiter'){
        const response=await person.find({work:worktype});
        res.status(200).json(response);
      }else{
        res.status(400).send({error:'Invalid work type'});
      }
    }catch(err){
      res.status(400).send(err);
    }
  })



  router.put('/:id', async (req, res) => {
    try {
      const id=req.params.id;
      const updatedPerson = await person.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
      });
      res.send(updatedPerson);

      if(!updatedPerson){
        res.status(400).send({error:'Invalid id'});
      }
    }
    catch (err) {
      res.status(400).send(err);
    }
  });
  



  router.delete('/:id', async (req, res) => {
    
    try {   
      const id=req.params.id;
      const deletedPerson = await person.findByIdAndDelete(id);

      if(!deletedPerson){
        return res.status(400).send({error:'Invalid id'});
      }
      res.send(deletedPerson);

    } catch (err) {
      res.status(400).send(err);
    }
  });
  module.exports=router;

