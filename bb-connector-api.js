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
  var data = [];
  var log = [];
  var _callback;
  
  // Private Methods
  ///////////////////////////
  
  /*
   * Store and validate the data.
   */
  var storeData = function (raw) {
    
    for (var i = 0; i < raw.length; i++) {
      
      var alias = raw[i]["alias"];
      
      data.push({
        "organization": validate(alias, "organization", raw[i]["organization"], "string"),
        "category":     validate(alias, "category",     raw[i]["category"],     "string"),
        "alias":        validate(alias, "alias",        raw[i]["alias"],        "string"),
        "location": {
          "street": validate(alias, "location.street", raw[i]["location.street"], "array_of_string"),
          "city":   validate(alias, "location.city",   raw[i]["location.city"],   "string"),
          "state":  validate(alias, "location.state",  raw[i]["location.state"],  "string"),
          "zip":    validate(alias, "location.zip",    raw[i]["location.zip"],    "string"),
          "lat":    validate(alias, "location.lat",    raw[i]["location.lat"],    "number"),
          "lng":    validate(alias, "location.lng",    raw[i]["location.lng"],    "number")
        },
        "phone": validate(alias, "phone", raw[i]["phone"], "string"),
        "url": {
          "login":      validate(alias, "url.login",      raw[i]["url.login"],      "string"),
          "logo":       validate(alias, "url.logo",       raw[i]["url.logo"],       "string"),
          "mobile":     validate(alias, "url.mobile",     raw[i]["url.mobile"],     "string"),
          "screenshot": validate(alias, "url.screenshot", raw[i]["url.screenshot"], "string"),
          "web":        validate(alias, "url.web",        raw[i]["url.web"],        "string")
        },
        "description": validate(alias, "description", raw[i]["description"], "string"),
        "features":    validate(alias, "features",    raw[i]["features"],    "array_of_string"),
        "bb_logo":     validate(alias, "bb_logo",     raw[i]["bblogo"],      "boolean"),
        "view": {
          "active_prescriptions": validate(alias, "view.active_prescriptions", raw[i]["view.activeprescriptions"], "boolean"),
          "allergies":            validate(alias, "view.allergies",            raw[i]["view.allergies"],           "boolean"),
          "appointment_history":  validate(alias, "view.appointment_history",  raw[i]["view.appointmenthistory"],  "boolean"),
          "claims":               validate(alias, "view.claims",               raw[i]["view.claims"],              "boolean"),
          "clinical_notes":       validate(alias, "view.clinical_notes",       raw[i]["view.clinicalnotes"],       "boolean"),
          "diagnostics":          validate(alias, "view.diagnostics",          raw[i]["view.diagnostics"],         "boolean"),
          "family_history":       validate(alias, "view.family_history",       raw[i]["view.familyhistory"],       "boolean"),
          "imaging":              validate(alias, "view.imaging",              raw[i]["view.imaging"],             "boolean"),
          "immunizations":        validate(alias, "view.immunizations",        raw[i]["view.immunizations"],       "boolean"),
          "lab_results":          validate(alias, "view.lab_results",          raw[i]["view.labresults"],          "boolean"),
          "medical_history":      validate(alias, "view.medical_history",      raw[i]["view.medicalhistory"],      "boolean"),
          "medications":          validate(alias, "view.medications",          raw[i]["view.medications"],         "boolean"),
          "pathology":            validate(alias, "view.pathology",            raw[i]["view.pathology"],           "boolean"),
          "prescriptions":        validate(alias, "view.prescriptions",        raw[i]["view.prescriptions"],       "boolean"),
          "problems":             validate(alias, "view.problems",             raw[i]["view.problems"],            "boolean"),
          "visit_history":        validate(alias, "view.visit_history",        raw[i]["view.visithistory"],        "boolean"),
          "vitals":               validate(alias, "view.vitals",               raw[i]["view.vitals"],              "boolean")
        },
        "download": {
          "text":  validate(alias, "download.text",  raw[i]["download.text"],  "boolean"),
          "pdf":   validate(alias, "download.pdf",   raw[i]["download.pdf"],   "boolean"),
          "c32":   validate(alias, "download.c32",   raw[i]["download.c32"],   "boolean"),
          "ccda":  validate(alias, "download.ccda",  raw[i]["download.ccda"],  "boolean"),
          "other": validate(alias, "download.other", raw[i]["download.other"], "array_of_string")
        },
        "transmit": {
          "automation": validate(alias, "transmit.automation", raw[i]["transmit.automation"], "boolean"),
          "direct": {
            "enabled":  validate(alias, "transmit.direct.enabled", raw[i]["transmit.direct.enabled"], "boolean"),
            "trust_bundles": {
              "patient":  validate(alias, "transmit.direct.trust_bundles.patient",  raw[i]["transmit.direct.trustbundles.patient"],  "boolean"),
              "provider": validate(alias, "transmit.direct.trust_bundles.provider", raw[i]["transmit.direct.trustbundles.provider"], "boolean"),
              "other":    validate(alias, "transmit.direct.trust_bundles.other",    raw[i]["transmit.direct.trustbundles.other"],    "array_of_string")
            }
          },
          "rest": {
            "enabled":    validate(alias, "transmit.rest.enabled",    raw[i]["transmit.rest.enabled"],    "boolean"),
            "registries": validate(alias, "transmit.rest.registries", raw[i]["transmit.rest.registries"], "array_of_string")
          }
        },
        "services": {
          "automatic_refills":      validate(alias, "services.automatic_refills",      raw[i]["services.automaticrefills"],      "boolean"),
          "bill_pay":               validate(alias, "services.bill_pay",               raw[i]["services.billpay"],               "boolean"),
          "caregiving":             validate(alias, "services.caregiving",             raw[i]["services.caregiving"],            "boolean"),
          "dispute":                validate(alias, "services.dispute",                raw[i]["services.dispute"],               "boolean"),
          "family_prescriptions":   validate(alias, "services.family_prescriptions",   raw[i]["services.familyprescriptions"],   "boolean"),
          "new_prescriptions":      validate(alias, "services.new_prescriptions",      raw[i]["services.newprescriptions"],      "boolean"),
          "refills":                validate(alias, "services.refills",                raw[i]["services.refills"],               "boolean"),
          "reminders":              validate(alias, "services.reminders",              raw[i]["services.reminders"],             "boolean"),
          "scheduling":             validate(alias, "services.scheduling",             raw[i]["services.scheduling"],            "boolean"),
          "search":                 validate(alias, "services.search",                 raw[i]["services.search"],                "boolean"),
          "secure_messaging":       validate(alias, "services.secure_messaging",       raw[i]["services.securemessaging"],       "boolean"),
          "self_entered":           validate(alias, "services.self_entered",           raw[i]["services.selfentered"],           "boolean"),
          "shop":                   validate(alias, "services.shop",                   raw[i]["services.shop"],                  "boolean"),
          "test_request":           validate(alias, "services.test_request",           raw[i]["services.testrequest"],           "boolean"),
          "transfer_prescriptions": validate(alias, "services.transfer_prescriptions", raw[i]["services.transferprescriptions"], "boolean")
        }
      });
      
    }
    
    _callback();
  };
  

  /*
   * validate each data element.
   */
  var validate = function (alias, property, el, type) {
    
    log.push("Validating: " + alias + "." + property);
    
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
        
        break;
        
      default:
        //...
    }
    
    return el;
  };
  
  
  // Public Methods
  ///////////////////////////
  
  /*
   * Initialize and get data from the spreadsheet
   */
  var init = function (callback) {
    _callback = callback;
    
    Tabletop.init({
      key: key,
      callback: storeData,
      simpleSheet: true
    });
  };
  
  
  /*
   * Return the data.
   */
  var getData = function () {
    return data;
  };
  
  
  /*
   * Retrieve the log.
   */
  var getLog = function () {
    return log;
  };
  
  
  /*
   * Log stuff to the console.
   */
  var logToConsole = function (o, type) {
    switch (type) {
      case "array":
        for (var i = 0; i < o.length; i++) {
          console.log(o[i]);
        }
        break;
      case "json":
        console.log(JSON.stringify(data, null, 2));
        break;
      default:
        console.log(o);
    }
  };
  
  
  // Init
  ///////////////////////////
  
  
  // Reveal public methods
  return {
    init: init,
    getData: getData,
    getLog: getLog,
    logToConsole: logToConsole
  };
  
}();
