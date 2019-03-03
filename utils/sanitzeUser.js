//funkcija za restrikciju podataka sto ce bit stavljeni u token
module.exports = (user) => {
  return {
    id:user._id
  };
};