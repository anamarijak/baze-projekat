var express = require('express');
var router = express.Router();
const User = require('../models/users');
const sanitizeUser = require('../utils/sanitzeUser');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config/passport.cred');

//ovo je samo testna bila :D
router.get('/all', function (req, res, next) {
  User.find().then(result =>{
    res.json(result);
  }).catch(err =>{
    res.json(err);
  })
});
//GET index page
router.get('/', function (req, res, next) {
  res.render('index');
});
/*ovde dvije su bespotrebne prema onome sto je napravljeno na frontu LOL
//GET register page
router.get('/user/create', function (req, res, next) {
  res.render('signup');
});*/
//POST register form handle
router.post('/user/create', async (req, res, next) => {
    /** NAPOMENA: Imas 2 opcije ili validaciju ovdje i ovako da vrsimo ili prije insert u bazu*/
    console.log(req.body);
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let name = req.body.name;
    let surname = req.body.surname;
    //sta validira i kako i koji poruku vraca
    //cu morat update validatore preko vikend, this is old version
    req.checkBody('email', 'Email field is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail().escape();
    req.checkBody('username', 'Username field is required').escape();
    req.checkBody('password', 'Password field is required').notEmpty().escape();
    req.checkBody('name', 'Invalid usage of name').escape();
    req.checkBody('surname', 'Invalid usage of surname').escape();
    //izvrsi validacije
    const errors = req.validationErrors();
    //ako ima error ,render istu stranicu ovaj put sa errorima
    if (errors) {
      //u slucaju error vrati "Bad request" i error
      //na client side uz ajax cemo update "alert error"
      //sa porukom ili porukama koje dobijemo odavde
      res.status(400).json(errors);
    } else {
      //ako prodje validaciju insert vrsimo
      //mora bit try catch block zbog kod user.save
      //jer ako se desi error , throw ga
      try {
        let user = new User({
          email: email,
          username: username,
          password: password,
          name: name,
          surname: surname
        });
        //now we save it ( insert in db )
        console.log(user);
        let result = await user.save();
        console.log("result: ", result);
        res.json({msg: 'Successfully register'});
      } catch (err) {
        //409 - conflict , nije mogao da spasi sto je pokusao , nek proba user opet
        console.log(err);
        res.status(409).json(err);
      }
    }
  }
);
//TODO: add login GET page and POST to handle it
/* I ova je bespotrebna prema onome sto je napravljeno
router.get('/user/signin', function (req, res, next) {
  res.render('signin');
}); */
router.post('/user/signin', passport.authenticate('login', { session: false }), function(req, res, next){
  const usr = sanitizeUser(req.user);
  //kreiramo token koji vrijedi 1 h
  const token = jwt.sign(usr,config.secret, { expiresIn: '1h'});
  //cookie u koji cemo ga stavit vrijedi 1 h takodjer
  const expires= new Date(Date.now()+(1000*60*60));
  //Ostavljeno da se vidi interakcija s tokenom
  res.cookie('Bearer',token,{httpOnly:true,expires:expires}).json({token: `${token}`, succes: true});
});

router.get('/user/signout' ,(req, res, next) =>{
  res.clearCookie('Bearer');
  res.redirect('/');
});

module.exports = router;
