/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()
})

function addAnotherSubject() {
  if($('#teachable-subject-container-2').is(':hidden')) {
    $('#teachable-subject-container-2').show()
    $('#add-another-subject-button').show()
  } else if($('#teachable-subject-container-3').is(':hidden')) {
    $('#teachable-subject-container-3').show()
    $('#add-another-subject-button').hide()
  }
}
