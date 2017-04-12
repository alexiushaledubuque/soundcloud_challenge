// XHR request to fetch the data from api.soundcloud.com
const scApiTester = (url, cb) => {    
  
  let api = {};

  api.getData = (callback) => {
    requestUrl = url;
    request = new XMLHttpRequest();
    request.open('get', requestUrl, true);
    request.onload = function(e) {
      var response = request.response;
      response = JSON.parse(response);
      callback(response);
    };
    request.onerror = function(e) {
        document.getElementById('display').innerHTML = e;
      // callback(request.response, e);
    };
    request.send();
  };

  api.getData(cb);
  
  return api;       
};