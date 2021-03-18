var router = require('express').Router();
var studentsCtrl = require('../controllers/students');

// GET /students
router.get('/students', studentsCtrl.index);

router.get('/students/test', function(req,res) {
    // checks if the user is logged in
    if (req.user) {
        res.send('hey,' + req.user.email)
    } else {
        res.send('FORBIDDEN')
    }
})

// POST /facts
// We will already have access to the logged in student on
// the server, therefore do not use: /students/:id/facts
router.post('/facts', studentsCtrl.addFact);

// DELETE /facts/:id
router.delete('/facts/:id', studentsCtrl.delFact);

module.exports = router;
