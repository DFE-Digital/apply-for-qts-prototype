const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

// Run this code when a form is submitted to 'radio-answer'
router.post('/radio-answer', function (req, res) {

    // Make a variable and give it the value from 'where-do-you-live'
    var whereDoYouLive = req.session.data['where-do-you-live']
  
    // Check whether the variable matches a condition
    if (whereDoYouLive == "England"){
      // Send user to next page
      res.redirect('/question-2-textarea')
    } else {
      // Send user to ineligible page
      res.redirect('/ineligible')
    }
  
  })

module.exports = router
