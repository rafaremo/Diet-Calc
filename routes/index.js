const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

<<<<<<< HEAD
router.post('/', (req,res,next)=>{
  
});
=======
router.get('/profile', (req,res)=>{
  res.render('profile')
})
>>>>>>> 258cc4f77ebc983f53c60243d4405cde8e599b17

module.exports = router;
