const { text } = require('express');
const Student = require('../models/student');

module.exports = {
  index,
  addFact,
  delFact
};

function index(req, res, next) {
  console.log(req.query)
  // Make the query object to use with Student.find based up
  // the user has submitted the search form or now
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  // Default to sorting by name
  let sortKey = req.query.sort || 'name';
  Student.find(modelQuery)
  .sort(sortKey).exec(function(err, students) {
    if (err) return next(err);
    // Passing search values, name & sortKey, for use in the EJS
    res.render('students/index', { 
      students, 
      // here we invent a key called "user" whose value is req.user
      // req.user is the magic variable that passport creates
      // that contains the user's document
      user: req.user, 
      name: req.query.name, 
      sortKey });
  });
}

function addFact(req, res, next) {
  // i'm adding a fact to my user model's "facts" embedded array
  req.user.facts.push({
    text: req.body.text,
  })
  
  req.user.save()
  .then(() => {
    return res.redirect('/students')
  })

  // async-await notation:
  await req.user.save()       // do this "save" first
  res.redirect('/students')   // do this redirect second

  // // callback notation
  // req.user.save(function(err) {  // do this "save" first
  //   res.redirect('/students')    // do this redirect second
  // })
}

function delFact(req, res, next) {

}
