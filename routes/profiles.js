const router = require('express').Router();
const User = require('../models/users');
//ostavljen prostor za mogucnost edit ako zelite posto sada samo radi R od CRUD
//trenutno render dummy profile page
router.get('/', (req, res, next) => {
  console.log(req.user);
  let user = {
    email: req.user.email,
    name: req.user.name,
    surname: req.user.surname,
    username: req.user.username
  };
  console.log(req.user);
  res.render('profile', { user ,profile:'user'});
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
    res.render('profile', { user ,profile :'user'});
  }else {
    const userById = await User.findById(req.params.id);
    const user = {
      name: userById.name,
      email: userById.email,
      surname: userById.surname,
      username: userById.username,
    };
    res.render('profile', { user , profile:'other'});
  }
});
module.exports = router;