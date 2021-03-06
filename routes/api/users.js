const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
//load user model
const User = require('../../models/User');

router.get('/test', (req, res) => res.send({msg:"users works"}));

router.post('/register',(req,res) =>{
    User.findOne({email: req.body.email})
      .then(user => {
          if(user){
              return res.status(400).json({email:"email already exists"})
          }
          else{
              const avatar = gravatar.url(req.body.email, {
                  s:'200',
                  r:'pg',
                  d:'mm'
              });
              const newUser = new User({
                  name:req.body.name,
                  email:req.body.email,
                        avatar,
                  password:req.body.password
              });
              bcrypt.genSalt(10,(err,salt) =>{
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(useer => res.json(user))
                    .catch(err => console.log(err));
                })
              })
          }
      })
})
module.exports = router;