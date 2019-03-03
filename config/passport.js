//TODO: reconfig passport
const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt,
  LocalStrategy = require('passport-local').Strategy,
  config = require('./passport.cred'),
  comparePassword = require('../utils/comparePassword'),
  User = require('../models/users');

//custom funkcija za vadjenje tokena iz cookie
const cookieExtractor = function(req) {
  let token = null;
  if (req && req.cookies) token = req.cookies['Bearer'];
  return token;
};
module.exports = (passport) => {
  //definisemo opcije (jednostavnosti radi, samo secret include da moze iz hasha vratit podatke) i extractor
  const opts = {};
  opts.jwtFromRequest = cookieExtractor;
  opts.secretOrKey = config.secret;
  //konfigurisemo passport da koristi i ovu strategiju authentikacije
  passport.use(new JwtStrategy(opts, async (payload, done) => {
    //payload token kad vrati iz hash
    try{
      //provjeri jesu li validni podaci iz tokena
      let user = await User.findById(payload.id);
      //ako jesu callback da je uredu
      if(user) done(null,user);
      //callback da nije
      else done(null, false);
    }catch (err){
      //u slucaju da se desi error
      done(err, null);
    }
  }));
//isti princip samo sada dodajemo jos jednu strategiju
  // ova strategija se koristi kad se logujemo da authentikaciju uradimo
  //dok ona gornja, provjerava da li je logovan user, kad god trazi protected stvari
  const localOpts = {
    usernameField: 'email'
  };
  passport.use('login', new LocalStrategy(localOpts,async (email, password, done) => {
    try{
      console.log(email, password);
      let user = await User.findOne({ email: email });
      console.log(user);
      if(user){
        let isMatch = await comparePassword(password, user.password);
        console.log('isMatch: ', isMatch);
        if(isMatch)
          return done(null,user);
      }
      done(null,false);
    } catch (err){
      return done(err,null);
    }
  }));
};