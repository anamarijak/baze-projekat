var express = require('express');
var router = express.Router();
const User = require('../models/users');


//GET index page
router.get('/', (req, res, next) => {
  console.log(req.user);
  let user = {
    email: req.user.email,
    name: req.user.name,
    surname: req.user.surname,
    username: req.user.username
  };
  console.log(req.user);
  res.render('chat', { user ,chat:'user'});
});
router.get('/:id', async (req, res, next) => {
  console.log(req.user);
  if(req.params.id  === req.user._id){
    let user = {
      email: req.user.email,
      name: req.user.name,
      surname: req.user.surname,
      username: req.user.username
    };
    res.render('chat', { user ,chat :'user'});
  } else {
    const userById = await User.findById(req.params.id);
    const user = {
      name: userById.name,
      email: userById.email,
      surname: userById.surname,
      username: userById.username,
    };
    res.render('chat', { user , chat:'other'});
  }
  console.log("Ovo je user ", user.username)
});

module.exports = router;