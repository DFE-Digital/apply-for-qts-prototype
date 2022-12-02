const fs = require("fs");
const express = require("express");
const { endsWith } = require("lodash");
const router = express.Router();

router.post("/degree-answer", function (req, res) {
  res.redirect(
    "/prototype-1/check-eligibility/question-special-educational-needs"
  );
});

router.all(
  "/prototype-1/check-eligibility/question-country",
  (req, res, next) => {
    res.locals.countries = [{ text: "", value: "" }].concat(
      JSON.parse(
        fs.readFileSync(
          "public/govuk-country-and-territory-autocomplete/location-autocomplete-canonical-list.json",
          "utf8"
        )
      ).map((country) => {
        return { text: country[0], value: country[0] };
      })
    );

    next();
  }
);

const BUCKET_1_COUNTRIES = ["South Africa"];
const BUCKET_2_COUNTRIES = ["Poland"];
const BUCKET_3_COUNTRIES = [];
const BUCKET_4_COUNTRIES = [
  "Hong Kong",
  "Spain",
  "Slovakia",
  "Slovenia",
  "Lithuania",
  "Netherlands",
  "Italy",
  "Iceland",
  "Hungary",
  "Greece",
  "Finland",
  "Denmark",
  "Czech Republic",
  "Austria",
];
const BUCKET_6_COUNTRIES = [
  "India",
  "Luxembourg",
  "Liechtenstein",
  "Cyprus",
  "Ukraine",
];

const BUCKET_1_REGIONS = ["Florida"];
const BUCKET_2_REGIONS = ["North Rhine-Westphalia"];
const BUCKET_3_REGIONS = [
  "Kansas",
  "Minnesota",
  "New Hampshire",
  "Vermont",
  "Virginia",
  "Wisconsin",
  "South Australia",
];
const BUCKET_4_REGIONS = [
  "China-4",
  "Lower Saxony",
  "Mecklenburg-Vorpommern",
  "Rhineland-Palatinate",
  "Saarland",
];
const BUCKET_6_REGIONS = [
  "China-6",
  "Baden-Wurttemberg",
  "Bavaria",
  "Brandenburg",
  "Bremen",
  "Hamburg",
  "Hessen",
  "Saxony-Anhalt",
  "Thuringia",
  "Saxony",
  "German Region",
];
const REGION_COUNTRIES = [
  "United States",
  "China",
  "Australia",
  "Belgium",
  "Germany",
];

const REGIONS = BUCKET_1_REGIONS.concat(BUCKET_2_REGIONS)
  .concat(BUCKET_3_REGIONS)
  .concat(BUCKET_4_REGIONS)
  .concat(BUCKET_6_REGIONS);

const COUNTRIES = BUCKET_1_COUNTRIES.concat(BUCKET_2_COUNTRIES)
  .concat(BUCKET_3_COUNTRIES)
  .concat(BUCKET_4_COUNTRIES)
  .concat(BUCKET_6_COUNTRIES)
  .concat(REGION_COUNTRIES);

router.post("/country-answer", function (req, res) {
  if (COUNTRIES.includes(req.session.data["country"])) {
    var country = req.session.data["country"];
    var region_countries_arr = {
      Belgium: "/prototype-1/check-eligibility/country-belgium",
      Germany: "/prototype-1/check-eligibility/country-germany",
      "United States": "/prototype-1/check-eligibility/country-usa",
      China: "/prototype-1/check-eligibility/country-china",
      Australia: "/prototype-1/check-eligibility/country-australia",
    };

    if (region_countries_arr[country]) {
      res.redirect(region_countries_arr[country]);
    } else {
      res.redirect(
        "/prototype-1/check-eligibility/question-formal-training"
      );
    }
  } else {
    res.redirect("/prototype-1/check-eligibility/ineligible-country");
  }
});

router.post("/region-answer", function (req, res) {
  var region = req.session.data["region"];
  if (REGIONS.includes(region)) {
    res.redirect("/prototype-1/check-eligibility/question-formal-training");
  } else {
    res.redirect("/prototype-1/check-eligibility/ineligible-country");
  }
});

router.post("/formal-training-answer", function (req, res) {
  res.redirect("/prototype-1/check-eligibility/question-degree");
});

router.post("/special-educational-needs-answer", function (req, res) {
  res.redirect("/prototype-1/check-eligibility/question-english-proficiency");
});

// Run this code when a form is submitted to 'completed-year-answer'
router.post("/completed-year-answer", function (req, res) {
  // Make a variable and give it the value from 'completedYear'
  var completedYear = req.session.data["completed-year"];

  // Check whether the variable matches a condition
  if (completedYear == "Yes") {
    // Send user to next page
    res.redirect("/prototype-1/check-eligibility/question-registered-teacher");
  } else {
    // Send user to ineligible page
    res.redirect("/prototype-1/check-eligibility/ineligible-no-experience");
  }
});

router.post("/misconduct-answer", function (req, res) {
  var country = req.session.data["country"];
  var haveDegree = req.session.data["Degree"];
  var region = req.session.data["region"];
  var formalTraining = req.session.data["formal-training"];
  var workExperience = req.session.data["work-experience"];
  var englishProficiency = req.session.data["english-proficiency"];
  var specialeducationalNeeds = req.session.data["special-educational-needs"];
  var haveMisconduct = req.session.data["misconduct"];

  if (
    haveDegree == "Yes" &&
    formalTraining == "Yes" &&
    specialeducationalNeeds == "Yes" &&
    haveMisconduct == "No" &&
    englishProficiency == "yes" &&
    workExperience != "less-than-1-year"
  ) {
    if (
      BUCKET_1_REGIONS.includes(region) ||
      BUCKET_1_COUNTRIES.includes(country)
    ) {
      res.redirect("/prototype-1/check-eligibility/eligible-bucket-1");
    } else if (
      BUCKET_2_REGIONS.includes(region) ||
      BUCKET_2_COUNTRIES.includes(country)
    ) {
      res.redirect("/prototype-1/check-eligibility/eligible-bucket-2");
    } else if (
      BUCKET_3_REGIONS.includes(region) ||
      BUCKET_3_COUNTRIES.includes(country)
    ) {
      res.redirect("/prototype-1/check-eligibility/eligible-bucket-3");
    } else if (
      BUCKET_4_REGIONS.includes(region) ||
      BUCKET_4_COUNTRIES.includes(country)
    ) {
      res.redirect("/prototype-1/check-eligibility/eligible-bucket-4");
    } else if (
      BUCKET_6_REGIONS.includes(region) ||
      BUCKET_6_COUNTRIES.includes(country)
    ) {
      res.redirect("/prototype-1/check-eligibility/eligible-bucket-6");
    } else {
      res.redirect("/prototype-1/check-eligibility/eligible");
    }
  } else {
    res.redirect("/prototype-1/check-eligibility/ineligible");
  }
});

// Run this code when a form is submitted to 'restrictions'
router.post("/restrictions-answer", function (req, res) {
  // Make a variable and give it the value from 'haveRestrictions'
  var haveRestrictions = req.session.data["restrictions"];

  // Check whether the variable matches a condition
  if (haveRestrictions == "Yes") {
    // Send user to next page
    res.redirect("/prototype-1/check-eligibility/ineligible-restrictions");
  } else {
    // Send user to ineligible page
    res.redirect("/prototype-1/check-eligibility/eligible");
  }
});

// Run this code when a form is submitted to 'Country Trained in'
router.post("/country-trained-answer", function (req, res) {
  // Make a variable and give it the value from 'degree'
  var countryTrained = req.session.data["country"];

  // Check whether the variable matches a condition
  if (countryTrained == "Canada") {
    // Send user to Degree english
    res.redirect("/prototype-1/get-prepared/question-degree-stem");
  } else {
    // Send user to STEM
    res.redirect("/prototype-1/get-prepared/question-degree-english");
  }
});

// Run this code when a form is submitted to 'Degree in STEM'
router.post("/stem-answer", function (req, res) {
  // Make a variable and give it the value from 'degree'
  var countryTrained = req.session.data["DegreeStem"];

  // Check whether the variable matches a condition
  if (countryTrained == "Yes") {
    // Send user to check answers
    res.redirect("/prototype-1/get-prepared/check-prepare-answers");
  } else {
    // Send user to Primary or secondary
    res.redirect("/prototype-1/get-prepared/question-primary-secondary");
  }
});

// Run this code when a form is submitted to 'Country Trained in'
router.post("/passive-country-answer", function (req, res) {
  // Make a variable and give it the value from 'degree'
  var passiveCountry = req.session.data["passiveCountry"];

  // Check whether the variable matches a condition
  if (passiveCountry == "India") {
    // Send user to India guidance page
    res.redirect("/prototype-2/documents-you-will-need-india");
    // Send user to Zimbabwe guidance page
  } else if (passiveCountry == "Zimbabwe") {
    res.redirect("/prototype-2/documents-you-will-need-zimbabwe");
    // Send user to Nigeria guidance page
  } else if (passiveCountry == "Nigeria") {
    res.redirect("/prototype-2/documents-you-will-need-nigeria");
    // Send user to Jamaica guidance page
  } else if (passiveCountry == "Zimbabwe") {
    res.redirect("/prototype-2/documents-you-will-need-jamaica");
  } else {
    // Send user to STEM
    res.redirect("/prototype-1/get-prepared/question-degree-english");
  }
});

// Run this code when a form is submitted to 'together-separate'
router.post("/together-separate-answer", function (req, res) {
  // Make a variable and give it the value from 'togetherSeparate'
  var togetherSeparate = req.session.data["together-separate"];

  // Check whether the variable matches a condition
  if (togetherSeparate == "Together") {
    // Send user to next page
    res.redirect("/prototype-3/qualifications/question-qualification-title");
  } else {
    // Send user to ineligible page
    res.redirect("/prototype-3/qualifications/question-degree-title");
  }
});

// Run this code when a form is submitted to 'evidence-professional-standing-answer'
router.post("/evidence-professional-standing-answer", function (req, res) {
  // Make a variable and give it the value from 'professionalStandingAnswer'
  var professionalStandingAnswer =
    req.session.data["evidence-professional-standing"];

  // Check whether the variable matches a condition
  if (professionalStandingAnswer == "Online Portal") {
    // Send user to online portal page
    res.redirect(
      "/prototype-3/professional-standing/question-reference-number"
    );
    // Send user to upload LOPS
  } else if (professionalStandingAnswer == "Letter of professional standing") {
    res.redirect("/prototype-3/professional-standing/upload-lops");
  } else {
    // Send users who cannot evidence to summary
    res.redirect(
      "/prototype-3/professional-standing/professional-standing-summary"
    );
  }
});

// Run this code when a form is submitted to 'reference-number-answer'
router.post("/question-reference-number-answer", function (req, res) {
  // Make a variable and give it the value from '-'
  var questionReferenceNumberAnswer =
    req.session.data["question-reference-number"];

  // Check whether the variable matches a condition
  if (questionReferenceNumberAnswer == "Yes") {
    // Send user to next page
    res.redirect("/prototype-3/professional-standing/enter-reference-number");
  } else {
    // Send user to ineligible page
    res.redirect(
      "/prototype-3/professional-standing/professional-standing-summary"
    );
  }
});

// Run this code when a form is submitted to 'upload-teacher-ceritficate-seperate'
router.post("/upload-certificate-answer", function (req, res) {
  // Make a variable and give it the value from 'professionalStandingAnswer'
  var uploadCertAnswer = req.session.data["degreeCertificate"];

  // Check whether the variable matches a condition
  if (uploadCertAnswer == "degree-certificate01.jpeg") {
    // Send user to next page
    res.redirect(
      "/prototype-3/qualifications/upload-teacher-degree-certificate-separate-2"
    );
  } else {
    // Send user to ineligible page
    res.redirect("/prototype-3/qualifications/question-qualification-title");
  }
});

// Run this code when a form is submitted to '/upload-teacher-degree-certificate-answer'
router.post("/upload-teacher-degree-certificate-answer", function (req, res) {
  // Make a variable and give it the value from 'togetherSeparate'
  var togetherSeparate = req.session.data["together-separate"];

  // Check whether the variable matches a condition
  if (togetherSeparate == "Together") {
    // Send user to next page
    res.redirect(
      "/prototype-3/qualifications/upload-teacher-degree-certificate"
    );
  } else {
    // Send user to ineligible page
    res.redirect("/prototype-3/qualifications/qualifications-summary");
  }
});

// Run this code when a form is submitted to 'current-legal-name'
router.post("/current-legal-name-answer", function (req, res) {
  // Make a variable and give it the value from 'currentLegalNameAnswer'
  var currentLegalNameAnswer = req.session.data["current-legal-name"];

  // Check whether the variable matches a condition
  if (currentLegalNameAnswer == "Yes") {
    // Send user to next page
    res.redirect("/prototype-3/personal-information/question-nationality");
  } else {
    // Send user to ineligible page
    res.redirect(
      "/prototype-3/personal-information/upload-name-change-evidence"
    );
  }
});

// Run this code when a form is submitted to 'question-country-recognised-answer'
router.post("/question-country-recognised-answer", function (req, res) {
  // Make a variable and give it the value from 'currentLegalNameAnswer'
  var countryRecognised = req.session.data["country-recognised"];

  // Check whether the variable matches a condition
  if (
    countryRecognised == "Australia" ||
    countryRecognised == "Canada" ||
    countryRecognised == "USA"
  ) {
    res.redirect(
      "/prototype-3/professional-standing/question-reference-number"
    );
  } else if (
    countryRecognised == "Nigeria" ||
    countryRecognised == "China" ||
    countryRecognised == "India" ||
    countryRecognised == "Jamaica" ||
    countryRecognised == "Mexico" ||
    countryRecognised == "South Africa" ||
    countryRecognised == "Zimbabwe" ||
    countryRecognised == "Argentina" ||
    countryRecognised == "Philippines" ||
    countryRecognised == "Ghana"
  ) {
    res.redirect("/prototype-3/professional-standing/upload-lops");
  } else {
    res.redirect(
      "/prototype-3/professional-standing/question-certified-teacher"
    );
  }
});

// Run this code when a form is submitted to 'upload-lops-answer'
router.post("/upload-lops-answer", function (req, res) {
  // Make a variable and give it the value from 'currentLegalNameAnswer'
  var anotherLops = req.session.data["another-lops"];

  // Check whether the variable matches a condition
  if (anotherLops == "Yes") {
    res.redirect("/prototype-3/professional-standing/upload-lopsb");
  } else {
    res.redirect(
      "/prototype-3/professional-standing/professional-standing-summary"
    );
  }
});

// Create account or sign in
router.post("/create-account-sign-in-answer", function (req, res) {
  let hasAccount = req.session.data["has-account"];

  if (hasAccount === "yes") {
    res.redirect("/prototype-3/country-check/question-country");
  } else {
    res.redirect("/prototype-1/check-eligibility/question-country");
  }
});

// Run this code when a form is submitted to 'upload-ttq-answer'
router.post("/upload-ttq-answer", function (req, res) {
  // Make a variable and give it the value from 'anotherTtq'
  var anotherTtq = req.session.data["another-ttq"];

  // Check whether the variable matches a condition
  if (anotherTtq == "Yes") {
    res.redirect(
      "/prototype-3/qualifications/teacher-training-qualification-documents/upload-ttqb"
    );
  } else {
    res.redirect("/prototype-3/task-list");
  }
});

// Run this code when a form is submitted to 'another-degree-answer'
router.post("/upload-degree-answer", function (req, res) {
  // Make a variable and give it the value from 'anotherTtq'
  var anotherDegree = req.session.data["another-degree"];

  // Check whether the variable matches a condition
  if (anotherDegree == "Yes") {
    res.redirect(
      "/prototype-3/qualifications/undergraduate-degree-documents/upload-degree-b"
    );
  } else {
    res.redirect("/prototype-3/task-list");
  }
});

// Run this code when a form is submitted to 'another-degree-answer'
router.post("/upload-identification-answer", function (req, res) {
  // Make a variable and give it the value from 'anotherTtq'
  var anotherIdentification = req.session.data["another-identification"];

  // Check whether the variable matches a condition
  if (anotherIdentification == "Yes") {
    res.redirect("/prototype-3/personal-documents/upload-identification-b");
  } else {
    res.redirect("/prototype-3/task-list");
  }
});

// Check to see if translation required for Uploading LOPS
router.post(
  "/prototype-3/professional-standing/upload-lops-english-a",
  function (req, res) {
    let writtenInEnglish = req.session.data["written-in-english"];

    if (writtenInEnglish === "yes") {
      res.redirect("/prototype-3/professional-standing/upload-lops-english-a");
    } else {
      res.redirect(
        "/prototype-3/professional-standing/upload-lops-non-english-a"
      );
    }
  }
);

// Verify English - Qualification from exempt country
router.post("/exempt-country-citizenship", function (req, res) {
    let exemptCountryCitizenship = req.session.data["exempt-country-citizenship"];

    if (exemptCountryCitizenship === "No") {
        res.redirect(
            "/prototype-3/english-language-proficiency/question-qualification-country"
        );
    } else {
        res.redirect("/prototype-3/task-list");
    }
});

// Verify English - Qualification from exempt country
router.post("/exempt-country-qualification", function (req, res) {
    let exemptCountryQualification = req.session.data["exempt-country-qualification"];

    if (exemptCountryQualification === "No") {
        res.redirect(
            "/prototype-3/english-language-proficiency/how-to-verify-english-language"
        );
    } else {
        res.redirect("/prototype-3/task-list");
    }
});

// Verify English language proficiency
router.post("/verify-english-proficiency", function (req, res) {
  let verifyEnglishProficiency = req.session.data["verify-english-proficiency"];

  if (verifyEnglishProficiency === "upload-method-of-instruction") {
    res.redirect(
      "/prototype-3/english-language-proficiency/upload-method-of-instruction"
    );
  } else {
    res.redirect("/prototype-3/english-language-proficiency/provide-test-details");
  }
});

// See if second page required for MOI
router.post("/upload-method-of-instruction-answer", function (req, res) {
  let anotherMethodOfInstruction =
    req.session.data["another-method-of-instruction"];

  if (anotherMethodOfInstruction === "Yes") {
    res.redirect(
      "/prototype-3/english-language-proficiency/upload-method-of-instruction-b"
    );
  } else {
    res.redirect("/prototype-3/task-list");
  }
});

// See if second page required for English proficiency certificate
router.post(
  "/upload-english-proficiency-certificate-answer",
  function (req, res) {
    let anotherEnglishProficiencyCertificate =
      req.session.data["another-english-proficiency-certificate"];

    if (anotherEnglishProficiencyCertificate === "Yes") {
      res.redirect(
        "/prototype-3/english-language-proficiency/upload-english-proficiency-certificate-b"
      );
    } else {
      res.redirect("/prototype-3/task-list");
    }
  }
);

// Do you need to add another qualification
router.post(
  "/prototype-3/qualifications/teacher-training-qualification/teacher-training-qualification-add-another",
  function (req, res) {
    let wasTeacherTrainingADegree =
      req.session.data["was-teacher-training-a-degree"];

    if (wasTeacherTrainingADegree === "no") {
      res.redirect(
        "/prototype-3/qualifications/undergraduate-degree/degree-details"
      );
    } else {
      res.redirect(
        "/prototype-3/qualifications/teacher-training-qualification/teacher-training-qualification-add-another"
      );
    }
  }
);

// Would you like to add another qualification
router.post(
  "/prototype-3/qualifications/undergraduate-degree/degree-details",
  function (req, res) {
    let addAnotherQualification = req.session.data["add-another-qualification"];

    if (addAnotherQualification === "yes") {
      res.redirect(
        "/prototype-3/qualifications/undergraduate-degree/degree-details"
      );
    } else {
      res.redirect("/prototype-3/task-list");
    }
  }
);

// Do you need to add another qualification? (loop 2)
// This takes the user to a second version of the degree details page but the document uploads and summary page are the same as loop one
router.post(
  "/prototype-3/qualifications/undergraduate-degree/degree-details-2",
  function (req, res) {
    let addAnotherQualification2 =
      req.session.data["add-another-qualification-2"];

    if (addAnotherQualification2 === "yes") {
      res.redirect(
        "/prototype-3/qualifications/undergraduate-degree/degree-details-2"
      );
    } else {
      res.redirect("/prototype-3/task-list");
    }
  }
);


// Add a second work history example
router.post("/work-history",
  function (req, res) {
    let finishedAddingWorkHistory = req.session.data["finished-adding-work-history"];

    if (finishedAddingWorkHistory === "no") {
      res.redirect("/prototype-3/work-history/work-history-in-education-2");
    } else {
      res.redirect("/prototype-3/task-list");
    }
  }
);

module.exports = router;
