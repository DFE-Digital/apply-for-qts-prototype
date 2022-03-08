const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

// Run this code when a form is submitted to 'degree-answer'
router.post('/degree-answer', function (req, res) {

    // Make a variable and give it the value from 'degree'
    var haveDegree = req.session.data['Degree']
  
    // Check whether the variable matches a condition
    if (haveDegree == "Yes"){
      // Send user to next page
      res.redirect('/prototype-1/question-formal-training')
    } else {
      // Send user to ineligible page
      res.redirect('/prototype-1/ineligible')
    }
  
  })

  // Run this code when a form is submitted to 'formal-training-answer'
  router.post('/formal-training-answer', function (req, res) {
  
      // Make a variable and give it the value from 'degree'
      var formalTraining = req.session.data['formal-training']
    
      // Check whether the variable matches a condition
      if (formalTraining == "Yes"){
        // Send user to next page
        res.redirect('/prototype-1/question-completed-year')
      } else {
        // Send user to ineligible page
        res.redirect('/prototype-1/ineligible')
      }
    
    })

    // Run this code when a form is submitted to 'completed-year'
    router.post('/completed-year-answer', function (req, res) {
    
        // Make a variable and give it the value from 'degree'
        var completedYear = req.session.data['completed-year']
      
        // Check whether the variable matches a condition
        if (completedYear == "Yes"){
          // Send user to next page
          res.redirect('/prototype-1/question-recognised-teacher')
        } else {
          // Send user to ineligible page
          res.redirect('/prototype-1/ineligible')
        }
      
    })

    // Run this code when a form is submitted to 'recognised-teacher'
    router.post('/recognised-teacher-answer', function (req, res) {
    
        // Make a variable and give it the value from 'degree'
        var recognisedTeacher = req.session.data['recognised-teacher']
      
        // Check whether the variable matches a condition
        if (recognisedTeacher == "Yes"){
          // Send user to next page
          res.redirect('/prototype-1/question-sen-only')
        } else {
          // Send user to ineligible page
          res.redirect('/prototype-1/ineligible')
        }
      
    })

    // Run this code when a form is submitted to 'sen-only'
    router.post('/sen-only-answer', function (req, res) {
    
        // Make a variable and give it the value from 'degree'
        var senOnly = req.session.data['sen-only']
      
        // Check whether the variable matches a condition
        if (senOnly == "No"){
          // Send user to next page
          res.redirect('/prototype-1/question-14-16-years')
        } else {
          // Send user to ineligible page
          res.redirect('/prototype-1/ineligible')
        }
      
    })

    // Run this code when a form is submitted to '14-16-years'
    router.post('/14-16-years-answer', function (req, res) {
    
        // Make a variable and give it the value from 'degree'
        var fourteenSixteenYears = req.session.data['14-16-years']
      
        // Check whether the variable matches a condition
        if (fourteenSixteenYears == "Yes"){
          // Send user to next page
          res.redirect('/prototype-1/eligible')
        } else {
          // Send user to ineligible page
          res.redirect('/prototype-1/ineligible')
        }
      
    })

module.exports = router
