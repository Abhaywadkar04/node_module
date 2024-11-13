const mongoose=require('mongoose');

const personSchema=new mongoose.Schema({
    name:String,
    age:Number,
    favoriteFoods:[String],
    work:{
        type:String,
        enum:['manager','staff','waiter'],
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const Person=mongoose.model('Person',personSchema);
module.exports=Person;