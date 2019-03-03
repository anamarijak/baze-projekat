const bcrypt = require('bcrypt-nodejs');
//napravljen promise za compare 2 passworda
module.exports = (password,passwordHash) =>{
  return new Promise((resolve, reject) => {
    bcrypt.compare( password, passwordHash, (err, isMatch) => {
      if (err)  reject(err);
       resolve(isMatch);
    });
  });
};