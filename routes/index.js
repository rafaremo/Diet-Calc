const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/', (req,res,next)=>{
  
});
router.get('/profile', (req,res)=>{
  res.render('profile')
})

module.exports = router;
