// Event listener for the "Enter" key on both input fields (text & zip code)
const handleKeyPress = (e) => {
   getUserInput();
}

// Add event listeners
const addEventListeners = () => {
	document.getElementById('submit_btn').addEventListener('click', handleKeyPress);
  // document.getElementById('hide_exp').addEventListener('click', hideExp);
}

// Clear input fields and reset focus for next user input request
const clearFields = () => {
    document.getElementById('user_input').value = '';
    document.getElementById('user_input').focus();
}

const getUserInput = () => {
    let userInput = document.getElementById('user_input').value
            
    // Reset fields after input received
    clearFields(); 

    // Format & get data from meetup api
    getApiData(userInput);
}

// Create the url for JSONP
const buildUrl = (textInput) => {
    return `http://api.soundcloud.com/search?q=${textInput}&client_id=7d2a254767bd1fededc0ff2867c94419`;
}

// JSONP uses a script to fetch the data from api.meetup.com
const jsonp = (url, cb) => {

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

// Fetching data from api.meetup.com
const getApiData = (textInput) => {
    
    if (!textInput) {
        // View the error message for 2 seconds before the field is reset
        window.setTimeout(() => {
            clearFields();
        }, 2000)

        // Alert user input is required to proceed
        document.getElementById('display').innerHTML = `<h4>USER INPUT REQUIRED!</h4>`;
        
    } else {
        // Format user input as expected for api request
        // textInput = textInput.replace(/\s/gi, '+');

        // Build URL
        let url = buildUrl(textInput);

        // API Service
        jsonp(url, (tracks) => {
        	console.log(JSON.stringify(tracks, null, 4));
        });
    }
}

// http://api.soundcloud.com/search?q=Prince&client_id=7d2a254767bd1fededc0ff2867c94419
// url + path + ? + q + &client_id

// SoundCloud Api Request
	
	 

// Giphy Api Request
		// const gfApi = (() => {

	 //  let api = {},
	 //      baseUrl = 'http://api.giphy.com',
	 //      path = '/v1/gifs/search',
	 //      q = 'Religion+&+Spirituality'
	 //      api_key = 'dc6zaTOxFJmzC';

	 //  api.getData = function(callback) {
	 //    requestUrl = baseUrl + path + '?q=' + q + '&api_key=' + api_key;
	 //    request = new XMLHttpRequest();
	 //    request.open('get', requestUrl, true);
	 //    request.onload = function(e) {
	 //      var response = request.response;
	 //      response = JSON.parse(response);
	 //      callback(response);
	 //    };
	 //    request.onerror = function(e) {
	 //      callback(request.response, e);
	 //    };
	 //    request.send();
	 //  };
	  
	 //  return api;
		
	 // })();

	 addEventListeners();