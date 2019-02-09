// alert("createpostType.js");
function storageAvailable(type) {
      try {
            var storage = window[type],
                  x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
      }
      catch (e) {
            return e instanceof DOMException && (
                  // everything except Firefox
                  e.code === 22 ||
                  // Firefox
                  e.code === 1014 ||
                  // test name field too, because code might not be present
                  // everything except Firefox
                  e.name === 'QuotaExceededError' ||
                  // Firefox
                  e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                  // acknowledge QuotaExceededError only if there's something already stored
                  storage.length !== 0;
      }
}
if (storageAvailable('localStorage')) {
      // Yippee! We can use localStorage awesomeness
      // var location = localStorage.getItem("locationVal");
      var locationVal = localStorage.getItem("locationVal").replace("\"","").replace("\"","");
      var radioTypeValue = localStorage.getItem("radioTypeValue").replace("\"","").replace("\"","");
      var radiocategoryValue = localStorage.getItem("radiocategoryValue").replace("\"","").replace("\"","");
      // alert("radioVal**get::---locationVal:" + locationVal+" +radioTypeValue:"+radioTypeValue+" radiocategoryValue:"+radiocategoryValue);
      $("#locationHeader").prepend(locationVal);
      // $("#locationHeader").attr("value",locationVal);
      $("#cityInput").attr("value",locationVal);
      $("#typeHeader").prepend(radioTypeValue);
      $("#typeHeader").attr("value",radioTypeValue);
      $("#categoryHeader").prepend(radiocategoryValue);
      $("#categoryHeader").attr("value",radiocategoryValue);
      $("#stateInput").attr("value","WA");
      // $("#locationHeader").html(locationVal+" >");
}
else {
      // Too bad, no localStorage for us
      alert("you can't use localStorage");
}
