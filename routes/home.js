const router = require('express').Router();
//manje vise nece imat ruta (bar mislim sad za sad) ovdje
//jer dovoljno je samo da render homepage
router.get('/' ,(req, res, next) => {
  res.render('home');
});

module.exports = router;