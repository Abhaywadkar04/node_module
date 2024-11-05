const express = require('express')
const app = express()
const db=require('./db');



const bodyParser=require('body-parser');
app.use(bodyParser.json());

const person=require('./models/person');
const menuSchema = require('./models/menu');

app.get('/', function (req, res) {
  res.send('Hello World')
})




const personRoutes=require('./routes/personRoutes');
app.use('/person',personRoutes);


const menuRouters=require('./routes/menuRouters');
app.use('/menu',menuRouters);










app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})