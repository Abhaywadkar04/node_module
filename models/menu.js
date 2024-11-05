const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        enum:['Beverage','Appetizer','Main Course','Dessert'],

        required: true
    },
    description:{
        type: String,
        required: true
    }
    ,
    is_drink:{
        type: Boolean,
        default: false
    },
    ingredients:{
        type: [String],
        default: []
    },
    num_sales:{
        type: Number,
        default: 0
    }
});

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;