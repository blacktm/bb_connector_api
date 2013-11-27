# Blue Button Connector JavaScript API

View the demo at http://www.blacktm.com/bb_connector_api/

View the JSON response structure at https://gist.github.com/blacktm/7668417

## Usage

Call the `init()` function to call the Google spreadsheet data via an AJAX request. Since this is an asynchronous request, a callback must be provided.

```javascript
function callback() {
  // ...
}

BBConnectorAPI.init(callback);
```

Once the data has been retrieved, there are other public methods available to read the data and diagnose issues.

```javascript
function callback() {
  
  // Get the log
  var log = BBConnectorAPI.getLog();
  // Send the log to console.log() as an array
  BBConnectorAPI.logToConsole(log, "array");
  
  // Get the spreadsheet data
  var data = BBConnectorAPI.getData();
  // Send the data to console.log() as JSON
  BBConnectorAPI.logToConsole(data, "json");
  
}
```
