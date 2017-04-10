const scApi = ( function () {

	console.log('input value: ', userInput);

  let api = {},
      baseUrl = 'http://api.soundcloud.com',
      path = '/search',
      q = document.getElementById('user_input').value,
      client_id = '7d2a254767bd1fededc0ff2867c94419';

      console.log('api: ', api);

  api.getData = (callback) => {
    requestUrl = baseUrl + path + '?q=' + q + '&client_id=' + client_id;
    request = new XMLHttpRequest();
    request.open('get', requestUrl, true);
    request.onload = function(e) {
      var response = request.response;
      response = JSON.parse(response);
      callback(response);
    };
    request.onerror = function(e) {
      callback(request.response, e);
    };
    request.send();
  };
  
  return api;		
});

const jsonpTester = (url, cb) => {

    let cbName = `jsonp_cb_${Math.round(100000 * Math.random())}`;
    window[cbName] = (response) => {
        delete window[cbName];
        document.body.removeChild(script);
        cb(response);
    };

    let script = document.createElement('script');
    script.src = `${url}${(url.indexOf('?') >= 0 ? '&' : '?')}callback=${cbName}`;
    document.body.appendChild(script);
}