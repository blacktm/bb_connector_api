/*
 * bb-connector-api.js
 */

var BBConnectorAPI = function () {
  
  // Dependancies
  ///////////////////////////
  
  // Properties
  ///////////////////////////
  
  // The Google spreadsheet key
  var key = "0Al6qrvXQwr4edGF1eHRLVGV2c3JNWWlJWGpTamZsVEE";
  
  // Data of the resulting JSON
  data = [];
  
  // Private Methods
  ///////////////////////////
  
  /*
   * Store and process the data.
   */
  var storeData = function (raw) {
    
    console.log(JSON.stringify(raw, null, 2));
    
    for (var i = 0; i < raw.length; i++) {
      
      var alias = raw[i]["alias"];
      
      data.push({
        "organization": process(alias, "organization", raw[i]["organization"], "string"),
        "category":     process(alias, "category",     raw[i]["category"],     "string"),
        "alias":        process(alias, "alias",        raw[i]["alias"],        "string"),
        "location": {
          "street": process(alias, "location.street", raw[i]["location.street"], "array_of_string"),
          "city":   process(alias, "location.city",   raw[i]["location.city"],   "string"),
          "state":  process(alias, "location.state",  raw[i]["location.state"],  "string"),
          "zip":    process(alias, "location.zip",    raw[i]["location.zip"],    "string"),
          "lat":    process(alias, "location.lat",    raw[i]["location.lat"],    "number"),
          "lng":    process(alias, "location.lng",    raw[i]["location.lng"],    "number")
        },
        "phone": process(alias, "phone", raw[i]["phone"], "string"),
        "url": {
          "login":      process(alias, "url.login",      raw[i]["url.login"],      "string"),
          "logo":       process(alias, "url.logo",       raw[i]["url.logo"],       "string"),
          "mobile":     process(alias, "url.mobile",     raw[i]["url.mobile"],     "string"),
          "screenshot": process(alias, "url.screenshot", raw[i]["url.screenshot"], "string"),
          "web":        process(alias, "url.web",        raw[i]["url.web"],        "string")
        },
        "description": process(alias, "description", raw[i]["description"], "string"),
        "features":    process(alias, "features",    raw[i]["features"],    "array_of_string"),
        "bb_logo":     process(alias, "bb_logo",     raw[i]["bblogo"],      "boolean"),
        "view": {
          "active_prescriptions": process(alias, "view.active_prescriptions", raw[i]["view.activeprescriptions"], "boolean"),
          "allergies":            process(alias, "view.allergies",            raw[i]["view.allergies"],           "boolean"),
          "appointment_history":  process(alias, "view.appointment_history",  raw[i]["view.appointmenthistory"],  "boolean"),
          "claims":               process(alias, "view.claims",               raw[i]["view.claims"],              "boolean"),
          "clinical_notes":       process(alias, "view.clinical_notes",       raw[i]["view.clinicalnotes"],       "boolean"),
          "diagnostics":          process(alias, "view.diagnostics",          raw[i]["view.diagnostics"],         "boolean"),
          "family_history":       process(alias, "view.family_history",       raw[i]["view.familyhistory"],       "boolean"),
          "imaging":              process(alias, "view.imaging",              raw[i]["view.imaging"],             "boolean"),
          "immunizations":        process(alias, "view.immunizations",        raw[i]["view.immunizations"],       "boolean"),
          "lab_results":          process(alias, "view.lab_results",          raw[i]["view.labresults"],          "boolean"),
          "medical_history":      process(alias, "view.medical_history",      raw[i]["view.medicalhistory"],      "boolean"),
          "medications":          process(alias, "view.medications",          raw[i]["view.medications"],         "boolean"),
          "pathology":            process(alias, "view.pathology",            raw[i]["view.pathology"],           "boolean"),
          "prescriptions":        process(alias, "view.prescriptions",        raw[i]["view.prescriptions"],       "boolean"),
          "problems":             process(alias, "view.problems",             raw[i]["view.problems"],            "boolean"),
          "visit_history":        process(alias, "view.visit_history",        raw[i]["view.visithistory"],        "boolean"),
          "vitals":               process(alias, "view.vitals",               raw[i]["view.vitals"],              "boolean")
        },
        "download": {
          "text":  process(alias, "download.text",  raw[i]["download.text"],  "boolean"),
          "pdf":   process(alias, "download.pdf",   raw[i]["download.pdf"],   "boolean"),
          "c32":   process(alias, "download.c32",   raw[i]["download.c32"],   "boolean"),
          "ccda":  process(alias, "download.ccda",  raw[i]["download.ccda"],  "boolean"),
          "other": process(alias, "download.other", raw[i]["download.other"], "array_of_string")
        },
        "transmit": {
          "automation": process(alias, "transmit.automation", raw[i]["transmit.automation"], "boolean"),
          "direct": {
            "enabled":  process(alias, "transmit.direct.enabled", raw[i]["direct.enabled"], "boolean"),
            "trust_bundles": {
              "patient":  process(alias, "transmit.direct.trust_bundles.patient",  raw[i]["direct.trustbundles.patient"],  "boolean"),
              "provider": process(alias, "transmit.direct.trust_bundles.provider", raw[i]["direct.trustbundles.provider"], "boolean"),
              "other":    process(alias, "transmit.direct.trust_bundles.other",    raw[i]["direct.trustbundles.other"],    "array_of_string")
            }
          },
          "rest": {
            "enabled":    process(alias, "transmit.rest.enabled",    raw[i]["transmit.rest.enabled"],    "boolean"),
            "registries": process(alias, "transmit.rest.registries", raw[i]["transmit.rest.registries"], "array_of_string")
          }
        },
        "services": {
          "automatic_refills":      process(alias, "services.automatic_refills",      raw[i]["services.automaticrefills"],      "boolean"),
          "bill_pay":               process(alias, "services.bill_pay",               raw[i]["services.billpay"],               "boolean"),
          "caregiving":             process(alias, "services.caregiving",             raw[i]["services.caregiving"],            "boolean"),
          "dispute":                process(alias, "services.dispute",                raw[i]["services.dispute"],               "boolean"),
          "family_prescriptions":   process(alias, "services.family_prescriptions",   raw[i]["services.familyprescriptions"],   "boolean"),
          "new_prescriptions":      process(alias, "services.new_prescriptions",      raw[i]["services.newprescriptions"],      "boolean"),
          "refills":                process(alias, "services.refills",                raw[i]["services.refills"],               "boolean"),
          "reminders":              process(alias, "services.reminders",              raw[i]["services.reminders"],             "boolean"),
          "scheduling":             process(alias, "services.scheduling",             raw[i]["services.scheduling"],            "boolean"),
          "search":                 process(alias, "services.search",                 raw[i]["services.search"],                "boolean"),
          "secure_messaging":       process(alias, "services.secure_messaging",       raw[i]["services.securemessaging"],       "boolean"),
          "self_entered":           process(alias, "services.self_entered",           raw[i]["services.selfentered"],           "boolean"),
          "shop":                   process(alias, "services.shop",                   raw[i]["services.shop"],                  "boolean"),
          "test_request":           process(alias, "services.test_request",           raw[i]["services.testrequest"],           "boolean"),
          "transfer_prescriptions": process(alias, "services.transfer_prescriptions", raw[i]["services.transferprescriptions"], "boolean")
        }
      });
      
    }
    
    logData();
  };
  

  /*
   * Process each data element.
   */
  var process = function (alias, property, el, type) {
    
    console.log("Processing: " + alias + "." + property);
    
    switch (type) {
      
      case "string":
        //...
        break;
        
      case "array_of_string":
        el = el.split(',');
        // Remove leading and trailing whitespace
        for (var i = 0; i < el.length; i++) {
          el[i] = el[i].replace(/(^\s+|\s+$)/g,'');
        }
        break;
        
      case "number":
        el = parseFloat(el);
        break;
        
      case "boolean":
        el = el.toLowerCase();
        
        if (el === "true") {
          el = true;
        } else {
          el = false;
        }
        
        if (el === true) {
          console.log("it's true");
        }
        break;
        
      default:
        //...
    }
    
    return el;
  };
  
  
  // Public Methods
  ///////////////////////////
  
  /*
   * Return the data.
   */
  var getData = function () {
    return data;
  };
  
  /*
   * Log data to console.
   */
  var logData = function () {
    console.log(JSON.stringify(data, null, 2));
  };
  
  
  // Init
  ///////////////////////////
  
  Tabletop.init({
    key: key,
    callback: storeData,
    simpleSheet: true
  });
  
  // Reveal public methods
  return {
    getData: getData
  };
  
}();



///////////////////////////
// Unused
///////////////////////////

// var url = '';
// jQuery.getJSON('http://spreadsheets.google.com/feeds/cells/key/od6/public/basic?alt=json-in-script&callback=?').success(function(data) {
//   console.log(JSON.stringify(data, null, 2));
// }).error(function(message) {
//   console.error('error' + message);
// }).complete(function() {
//   console.log('completed!');
// });
