const passport = require('passport');
const UserInfoError = require('passport-google-oauth20/lib/errors/userinfoerror');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user'); //Require your User Model here!


// configuring Passport!
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
    console.log('^----this profile is from google----^')
    User.findOne({googleId: profile.id}, function(err, user) {
      // if user is defined, then we found someone, they have logged in before
      // if user is undefined they have never logged in before
      if(user) return cb(null,user);  // passes the information to the next spot in the middleware chain
      if(err) return cb(err)  
      // if user is undefined, we want to create a user
      User.create({
        name: profile.displayName,
        googleId: profile.id,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value
      }, function(err, createdUser) {
        if(createdUser) return cb(null, createdUser)
        if(err) return cb(err)
      })
    })
    
  })
);



passport.serializeUser(function(user, done) {
  done(null, user.id);  // storing the logged in user id in our session cookie
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {  // Find your User, using your model, and then call done(err, whateverYourUserIsCalled)
    if(err) return done(err);
    done(null, user); // When you call this done function passport assigns the user document to req.user, which will 
  });
});



// be availible in every Single controller function, so you always know the logged in user