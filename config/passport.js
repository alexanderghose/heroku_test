let passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const Student = require('../models/student');

console.log(process.env.GOOGLE_CLIENT_ID)
console.log(process.env.GOOGLE_SECRET)
console.log(process.env.GOOGLE_CALLBACK)

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
    Student.findOne({ 'googleId': profile.id }, function(err, student) {
      if (err) return cb(err);
      if (student) {
        return cb(null, student);
      } else {
        // we have a new student via OAuth!
        var newStudent = new Student({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id
        });
        newStudent.save(function(err) {
          if (err) return cb(err);
          return cb(null, newStudent);
        });
      }
    });
  }
));

passport.serializeUser(function(student, done) {
    done(null, student.id);
});

// converting this user's session.id to a database document
passport.deserializeUser(function(id, done) {
    Student.findById(id, function(err, student) {
      done(err, student);
    });
  });