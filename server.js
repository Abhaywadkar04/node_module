const express = require('express')
const app = express()
const db=require('./db');
const passport=require('passport');
const localStrategy=require('passport-local').Strategy;

const bodyParser=require('body-parser');
app.use(bodyParser.json());

const person=require('./models/person');
const menuSchema = require('./models/menu');

app.get('/', passport.authenticate('local',{session:false}),function (req, res) {
  res.send('Hello World')
})



//middleware
app.use(logMiddleware);


app.use(passport.initialize());

//passport setup
passport.use(new localStrategy(
    { usernameField: 'username', passwordField: 'password' },
    async (username, password, done) => {
      try {
        const user = await person.findOne({ username }).exec();
        if (!user) {
          return done(null, false, { message: 'Invalid username' });
        }
        const isMatch = user.password === password;
        if (!isMatch) {
          return done(null, false, { message: 'Invalid password' });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  ));




function logMiddleware(req, res, next) {
    const currentDate = new Date().toISOString();
    console.log(`[${currentDate}] ${req.method} ${req.url}`);
    next();
}
const personRoutes=require('./routes/personRoutes');
app.use('/person',passport.authenticate('local',{session:false}),personRoutes);


const menuRouters=require('./routes/menuRouters');
app.use('/menu',passport.authenticate('local',{session:false}),menuRouters);










app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})