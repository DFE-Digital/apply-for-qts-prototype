const fs = require('fs')
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
      res.redirect('/prototype-1/check-eligibility/question-formal-training')
    } else {
      // Send user to ineligible page
      res.redirect('/prototype-1/check-eligibility/ineligible-degree')
    }

  })

router.all('/prototype-1/check-eligibility/question-country', (req, res, next) => {
  res.locals.countries = [{ text: '', value: '' }].concat(JSON.parse(fs.readFileSync('public/govuk-country-and-territory-autocomplete/location-autocomplete-canonical-list.json', 'utf8'))
    .map(country => {
      return { text: country[0], value: country[0] }
    }))

  next()
})

// Run this code when a form is submitted to 'country-answer'
router.post('/country-answer', function (req, res) {
  if (req.session.data['country'] == 'Spain') {
    res.redirect('/prototype-1/check-eligibility/question-degree')
  } else {
    res.redirect('/prototype-1/check-eligibility/ineligible-country')
  }
})

      // Run this code when a form is submitted to 'formal-training-answer'
  router.post('/formal-training-answer', function (req, res) {

    // Make a variable and give it the value from 'formalTraining'
    var formalTraining = req.session.data['formal-training']

    // Check whether the variable matches a condition
    if (formalTraining == "Yes"){
      // Send user to next page
      res.redirect('/prototype-1/check-eligibility/question-special-educational-needs')
    } else {
      // Send user to ineligible page
      res.redirect('/prototype-1/check-eligibility/ineligible-formal-training')
    }

  })

        // Run this code when a form is submitted to 'special-educational-needs-answer'
        router.post('/special-educational-needs-answer', function (req, res) {

          // Make a variable and give it the value from 'specialEducationalNeeds'
          var specialeducationalNeeds = req.session.data['special-educational-needs']

          // Check whether the variable matches a condition
          if (specialeducationalNeeds == "Yes"){
            // Send user to next page
            res.redirect('/prototype-1/check-eligibility/question-registered-teacher')
          } else {
            // Send user to ineligible page
            res.redirect('/prototype-1/check-eligibility/ineligible-special-educational-needs')
          }

      })


        // Run this code when a form is submitted to 'completed-year-answer'
        router.post('/completed-year-answer', function (req, res) {

          // Make a variable and give it the value from 'completedYear'
          var completedYear = req.session.data['completed-year']

          // Check whether the variable matches a condition
          if (completedYear == "Yes"){
            // Send user to next page
            res.redirect('/prototype-1/check-eligibility/question-registered-teacher')
          } else {
            // Send user to ineligible page
            res.redirect('/prototype-1/check-eligibility/ineligible-no-experience')
          }

      })

    // Run this code when a form is submitted to 'registered-teacher-answer'
    router.post('/registered-teacher-answer', function (req, res) {

        // Make a variable and give it the value from 'registeredTeacher'
        var registeredTeacher = req.session.data['registered-teacher']

        // Check whether the variable matches a condition
        if (registeredTeacher == "Yes"){
          // Send user to next page
          res.redirect('/prototype-1/check-eligibility/question-misconduct')
        } else {
          // Send user to ineligible page
          res.redirect('/prototype-1/check-eligibility/ineligible-not-registered')
        }

    })


// Run this code when a form is submitted to 'misconduct-answer'
router.post('/misconduct-answer', function (req, res) {

  // Make a variable and give it the value from 'haveMisconduct'
  var haveMisconduct = req.session.data['misconduct']

  // Check whether the variable matches a condition
  if (haveMisconduct == "Yes"){
    // Send user to next page
    res.redirect('/prototype-1/check-eligibility/eligible')
  } else {
    // Send user to ineligible page
    res.redirect('/prototype-1/check-eligibility/ineligible-misconduct')
  }

})


        // Run this code when a form is submitted to 'restrictions'
        router.post('/restrictions-answer', function (req, res) {

          // Make a variable and give it the value from 'haveRestrictions'
          var haveRestrictions = req.session.data['restrictions']

          // Check whether the variable matches a condition
          if (haveRestrictions == "Yes"){
            // Send user to next page
            res.redirect('/prototype-1/check-eligibility/ineligible-restrictions')
          } else {
            // Send user to ineligible page
            res.redirect('/prototype-1/check-eligibility/eligible')
          }

      })

    // Run this code when a form is submitted to 'Country Trained in'
    router.post('/country-trained-answer', function (req, res) {

      // Make a variable and give it the value from 'degree'
      var countryTrained = req.session.data['country']

      // Check whether the variable matches a condition
      if (countryTrained == "Canada"){
        // Send user to Degree english
        res.redirect('/prototype-1/get-prepared/question-degree-stem')
      } else {
        // Send user to STEM
        res.redirect('/prototype-1/get-prepared/question-degree-english')
      }

  })

  // Run this code when a form is submitted to 'Degree in STEM'
  router.post('/stem-answer', function (req, res) {

      // Make a variable and give it the value from 'degree'
      var countryTrained = req.session.data['DegreeStem']

      // Check whether the variable matches a condition
      if (countryTrained == "Yes"){
        // Send user to check answers
        res.redirect('/prototype-1/get-prepared/check-prepare-answers')
      } else {
        // Send user to Primary or secondary
        res.redirect('/prototype-1/get-prepared/question-primary-secondary')
      }

  })

        // Run this code when a form is submitted to 'Country Trained in'
        router.post('/passive-country-answer', function (req, res) {

          // Make a variable and give it the value from 'degree'
          var passiveCountry = req.session.data['passiveCountry']

          // Check whether the variable matches a condition
          if (passiveCountry == "India"){
            // Send user to India guidance page
            res.redirect('/prototype-2/documents-you-will-need-india')
            // Send user to Zimbabwe guidance page
          } else if (passiveCountry == "Zimbabwe") {
            res.redirect('/prototype-2/documents-you-will-need-zimbabwe')
            // Send user to Nigeria guidance page
          } else if (passiveCountry == "Nigeria") {
            res.redirect('/prototype-2/documents-you-will-need-nigeria')
            // Send user to Jamaica guidance page
          } else if (passiveCountry == "Zimbabwe") {
            res.redirect('/prototype-2/documents-you-will-need-jamaica')
          } else {
            // Send user to STEM
            res.redirect('/prototype-1/get-prepared/question-degree-english')
          }

      })

       // Run this code when a form is submitted to 'together-separate'
      router.post('/together-separate-answer', function (req, res) {

        // Make a variable and give it the value from 'togetherSeparate'
        var togetherSeparate = req.session.data['together-separate']

        // Check whether the variable matches a condition
        if (togetherSeparate == "Together"){
          // Send user to next page
          res.redirect('/prototype-3/qualifications/question-qualification-title')
        } else {
          // Send user to ineligible page
          res.redirect('/prototype-3/qualifications/question-degree-title')
        }

      })

      // Run this code when a form is submitted to 'evidence-professional-standing-answer'
      router.post('/evidence-professional-standing-answer', function (req, res) {

        // Make a variable and give it the value from 'professionalStandingAnswer'
        var professionalStandingAnswer = req.session.data['evidence-professional-standing']

        // Check whether the variable matches a condition
        if (professionalStandingAnswer== "Online Portal"){
          // Send user to online portal page
          res.redirect('/prototype-3/professional-standing/question-reference-number')
      // Send user to upload LOPS
      } else if (professionalStandingAnswer == "Letter of professional standing") {
        res.redirect('/prototype-3/professional-standing/upload-lops')
          } else {
            // Send users who cannot evidence to summary
            res.redirect('/prototype-3/professional-standing/professional-standing-summary')
          }

      })

      // Run this code when a form is submitted to 'reference-number-answer'
      router.post('/question-reference-number-answer', function (req, res) {

        // Make a variable and give it the value from '-'
        var questionReferenceNumberAnswer = req.session.data['question-reference-number']

        // Check whether the variable matches a condition
        if (questionReferenceNumberAnswer== "Yes"){
          // Send user to next page
          res.redirect('/prototype-3/professional-standing/enter-reference-number')
        } else {
          // Send user to ineligible page
          res.redirect('/prototype-3/professional-standing/professional-standing-summary')
        }

    })

    // Run this code when a form is submitted to 'upload-teacher-ceritficate-seperate'
    router.post('/upload-certificate-answer', function (req, res) {

      // Make a variable and give it the value from 'professionalStandingAnswer'
      var uploadCertAnswer = req.session.data['degreeCertificate']

      // Check whether the variable matches a condition
      if (uploadCertAnswer== "degree-certificate01.jpeg"){
        // Send user to next page
        res.redirect('/prototype-3/qualifications/upload-teacher-degree-certificate-separate-2')
      } else {
        // Send user to ineligible page
        res.redirect('/prototype-3/qualifications/question-qualification-title')
      }

  })

      // Run this code when a form is submitted to '/upload-teacher-degree-certificate-answer'
      router.post('/upload-teacher-degree-certificate-answer', function (req, res) {

        // Make a variable and give it the value from 'togetherSeparate'
        var togetherSeparate = req.session.data['together-separate']

        // Check whether the variable matches a condition
        if (togetherSeparate == "Together"){
          // Send user to next page
          res.redirect('/prototype-3/qualifications/upload-teacher-degree-certificate')
        } else {
          // Send user to ineligible page
          res.redirect('/prototype-3/qualifications/qualifications-summary')
        }

    })

    // Run this code when a form is submitted to 'current-legal-name'
    router.post('/current-legal-name-answer', function (req, res) {

      // Make a variable and give it the value from 'currentLegalNameAnswer'
      var currentLegalNameAnswer = req.session.data['current-legal-name']

      // Check whether the variable matches a condition
      if (currentLegalNameAnswer== "Yes"){
        // Send user to next page
        res.redirect('/prototype-3/personal-information/question-nationality')
      } else {
        // Send user to ineligible page
        res.redirect('/prototype-3/personal-information/upload-name-change-evidence')
      }

  })

  // Run this code when a form is submitted to 'question-country-recognised-answer'
  router.post('/question-country-recognised-answer', function (req, res) {

    // Make a variable and give it the value from 'currentLegalNameAnswer'
    var countryRecognised = req.session.data['country-recognised']

    // Check whether the variable matches a condition
    if (countryRecognised == "Australia" || countryRecognised == "Canada" || countryRecognised == "USA"){

      res.redirect('/prototype-3/professional-standing/question-reference-number')
    } else if (countryRecognised == "Nigeria" || countryRecognised == "China" || countryRecognised == "India" || countryRecognised == "Jamaica" || countryRecognised == "Mexico" || countryRecognised == "South Africa" || countryRecognised == "Zimbabwe" || countryRecognised == "Argentina" || countryRecognised == "Philippines" || countryRecognised == "Ghana" ) {

      res.redirect('/prototype-3/professional-standing/upload-lops')
    } else {

      res.redirect('/prototype-3/professional-standing/question-certified-teacher')
    }

  })

  // Run this code when a form is submitted to 'upload-lops-answer'
  router.post('/upload-lops-answer', function (req, res) {

    // Make a variable and give it the value from 'currentLegalNameAnswer'
    var anotherLops = req.session.data['another-lops']

    // Check whether the variable matches a condition
    if (anotherLops == "Yes"){

      res.redirect('/prototype-3/professional-standing/upload-lopsb')

    } else {

      res.redirect('/prototype-3/professional-standing/professional-standing-summary')
    }

})

                          // Run this code when a form is submitted to 'create-account-sign-in'
                          router.post('/create-account-sign-in-answer', function (req, res) {

                            // Make a variable and give it the value from 'createAccountSignInAnswer'
                            var createAccountSignInAnswer = req.session.data['create-account-sign-in']

                            // Check whether the variable matches a condition
                            if (createAccountSignInAnswer== "No"){
                              // Send user to next page
                              res.redirect('/prototype-3/create-an-account')
                            } else {
                              // Send user to ineligible page
                              res.redirect('/prototype-3/task-list')
                            }

                        })

  // Run this code when a form is submitted to 'upload-ttq-answer'
  router.post('/upload-ttq-answer', function (req, res) {

    // Make a variable and give it the value from 'anotherTtq'
    var anotherTtq = req.session.data['another-ttq']

    // Check whether the variable matches a condition
    if (anotherTtq == "Yes"){

      res.redirect('/prototype-3/qualifications/teacher-training-qualification-documents/upload-ttqb')

    } else {

      res.redirect('/prototype-3/task-list')
    }

})

  // Run this code when a form is submitted to 'another-degree-answer'
  router.post('/upload-degree-answer', function (req, res) {

    // Make a variable and give it the value from 'anotherTtq'
    var anotherDegree = req.session.data['another-degree']

    // Check whether the variable matches a condition
    if (anotherDegree == "Yes"){

      res.redirect('/prototype-3/qualifications/undergraduate-degree-documents/upload-degree-b')

    } else {

      res.redirect('/prototype-3/task-list')
    }

})



  // Run this code when a form is submitted to 'another-degree-answer'
  router.post('/upload-identification-answer', function (req, res) {

    // Make a variable and give it the value from 'anotherTtq'
    var anotherIdentification = req.session.data['another-identification']

    // Check whether the variable matches a condition
    if (anotherIdentification == "Yes"){

      res.redirect('/prototype-3/personal-documents/upload-identification-b')

    } else {

      res.redirect('/prototype-3/task-list')
    }

})

module.exports = router
