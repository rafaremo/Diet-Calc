const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const User = require('../models/User');
require('dotenv').config();

passport.use(new FacebookStrategy({
  clientID: process.env.FACECLIENTID,
  clientSecret: process.env.FACECLIENTSECRET,
  callbackURL: "http://localhost:3000/facebook/callback",
},
function(accessToken, refreshToken, profile, cb) {
  console.log(profile)
  User.findOrCreate({ username: profile.displayName, email: 'Sin email registrado', active: true, notFacebook: false }, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
}
));

passport.serializeUser(function(user,cb){
  cb(null, user)
});

passport.deserializeUser(function(user,cb){
  cb(null, user)
});

module.exports = passport;