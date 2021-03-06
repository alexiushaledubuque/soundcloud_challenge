// Declare  the SoundCloud API Object as IIFE to use globally
const apiObject = (() => {
    return ApiObject = {
        sc: 'http://api.soundcloud.com',
        clientId: '7d2a254767bd1fededc0ff2867c94419',
        search: '/search?q=',
        userTracks: '/users/ /tracks?',
        favorites: '/tracks/ /favoriters'
    };
})();

// Event listener for the "Enter" key on both input field
const handleKeyPress = (e) => {
    let key = e.keyCode || e.which;
    if (key === 13) getUserInput();
}

// Add event listeners to elements
const addEventListeners = () => {
    let submit = document.getElementById('submit_btn'),
        query = document.getElementById('user_input');

    if (submit) {
        submit.addEventListener('click', getUserInput);    
    }

    if (query) {
        query.addEventListener('keypress', handleKeyPress);
    }  
}

// Clear input fields and reset focus for next user input request
const clearFields = () => {
    document.getElementById('user_input').value = '';
    document.getElementById('user_input').focus();
    document.getElementById('sc').value = '';
    document.getElementById('fav_users_list').value = '';
    document.getElementById('user_tracks_list').value = '';
    document.getElementById('display').value = '';
}

// Getting the input the user entered in the input field
const getUserInput = () => {
    let userInput = document.getElementById('user_input').value
            
    clearFields(); 

    getSCApiData(userInput);
}

// Create the url for the API request
const buildUrl = (url, endPoint, textInput, uID) => {

    if (endPoint === apiObject.search) {
        return `${url}${endPoint}${textInput}&client_id=${apiObject.clientId}`;
    } 
    
    endPoint === apiObject.userTracks ? 
        url = `${url}${endPoint}${textInput}&client_id=${apiObject.clientId}` :
        url = `${url}${endPoint}?client_id=${apiObject.clientId}`;
    
    url = url.replace(/\s/gi, uID);
    return url;
}

// XHR request to fetch the data from api.soundcloud.com
const scApi = (url, cb) => {    
  
  // Start the spinner immediately before the request
    startSpinner();  

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
    };
    request.send();
  };

  api.getData(cb);
  
  return api;       
};

// Fetching tracks from api.soundcloud.com based on user query
const getSCApiData = (textInput) => {
    
    if (!textInput) {
        // View the error message for 2 seconds before the field is reset
        window.setTimeout(() => {
            clearFields();
        }, 2000)

        // Alert user input is required to proceed
        document.getElementById('display').innerHTML = `<h4>USER INPUT REQUIRED!</h4>`;
        
    } else {
        // Format user input as expected for api request
        textInput = textInput.replace(/\s/gi, '+');

        // Build URL
        let url = buildUrl(apiObject.sc, apiObject.search, textInput);

         // SC API Service
        scApi(url, (tracks) => {
            tracks.collection.length > 0 ? (stopSpinner(), listTracks(tracks)) : (document.getElementById('display').innerHTML = 
                `<h4>${textInput.toUpperCase()}<br> not found!</h4>`, stopSpinner());
        });
    }    
}

// Fetching more tracks from a specific user
const getUserTracks = (userid) => {
    let url = buildUrl(apiObject.sc, apiObject.userTracks, '', userid);
    scApi(url, (userTracks) => {
        userTracks.length > 0 ? (stopSpinner(), ulistTracks(userTracks)) : (document.getElementById('display').innerHTML = 
                `<h4>No Groups Found!</h4>`, stopSpinner());
    });
}

// Fetching favoriters of a specific user's track
const getFavoriters = (trackid) => {
    let url = buildUrl(apiObject.sc, apiObject.favorites, '', trackid);
    scApi(url, (favoriters) => {
        favoriters.length > 0 ? (stopSpinner(), favoriteUsers(trackid, favoriters)) : (document.getElementById('display').innerHTML = 
                `<h4>No Favoriters!</h4>`, stopSpinner());
    });
}

// Sort favoriters according to  follower_count & last_name
const sortByProp = (prop1, prop2) => {
   return function(a,b){
      if (a[prop1] > b[prop1]) {
          return 1;
      } else if(a[prop1] < b[prop1]) {
          return -1;
      }

      if(a[prop2] > b[prop2]) {
          return 1;
      } else if(a[prop2] < b[prop2]){
          return -1;
      }
      return 0;
   }
};

// Render users whom favorited a track
const favoriteUsers = (track, favList) => {
    let favoredTrack = '',
        string = '';

    favList.sort(sortByProp('followers_count', 'last_name'));

    document.getElementById('fav_users_list').innerHTML = '';
    document.getElementById('display').innerHTML = '';

    try {
        favoredTrack = `<div class=col_header><h2>Users Favored This Track</h2></div><br>`;
        favList.forEach((fav) => {
            string += `<li><div><a href=${fav.permalink_url}>${fav.full_name}</a>`;

            if (fav.artwork_url) {
                string += `<iframe src=${fav.artwork_url} scrolling="no" align="middle" 
                width="100" height="100" seamless></iframe><br>`    
            }; 
            
            string += `</div></li>`;
        })
        document.getElementById('fav_users_list').innerHTML += `${favoredTrack}${string}`;  
    }   
    catch(err) {
        document.getElementById('display').innerHTML = err.message;
        
        // display the error message for 2 seconds then clear the div
        window.setTimeout(() => {
            clearFields();
        }, 2000);
    }
    show('#favoriters');
}

// Render tracks from a specific user
const ulistTracks = (userTrackList) => {
    let user = '',
        string = '';
    document.getElementById('user_tracks_list').innerHTML = '';
    document.getElementById('display').innerHTML = '';

    try {
        user = `<div class=col_header><h2>${userTrackList[0].user.username}'s Tracks</h2></div><br>
        <h4>click to see who 'favorites' this track</h4>`;
        userTrackList.forEach((item) => {
            string += `<li onclick='getFavoriters(${item.id})'>Track Title:&nbsp&nbsp ${item.title}<br>`;
            if (item.tag_list) {
                string += `tags:&nbsp<em>${item.tag_list}</em><br></li><br>`;
            } 

            // Only render artwork if it exists
            item.artwork_url ? 
                string += `<iframe src=${item.artwork_url} scrolling="no" align="middle" 
                width="100" height="100" seamless></iframe></li><br>` : string += `</li><br>`;
        })

        document.getElementById('user_tracks_list').innerHTML += `${user}${string}`;  
    }   
    catch(err) {
        document.getElementById('display').innerHTML = err.message;

        window.setTimeout(() => {
            clearFields();
        }, 2000);
    }
    show('#users');
}

// Render results from user input query
const listTracks = (tracks) => {
    
    let string = '';
    document.getElementById('tracklist').innerHTML = '';
    document.getElementById('display').innerHTML = '';

    try {
        tracks.collection.forEach((track) => {
            if (track.user){
                string += `<li onclick='getUserTracks(${track.user.id})'><span id='list_title'>
                        Track Title:</span> ${track.title}<br>Username:&nbsp&nbsp 
                        ${track.user.username}<br>`;
                if (track.tag_list) {
                    string += `tags:&nbsp<em>${track.tag_list}</em><br>`;
                } 

                // Only render artwork if it exists
                track.artwork_url ? 
                    string += `<iframe src=${track.artwork_url} scrolling="no" align="middle" 
                    width="100" height="100" seamless></iframe></li><br>` : string += `</li><br>`;
            }
        }) 
        document.getElementById('tracklist').innerHTML += string;
    }   
    catch(err) {
        document.getElementById('display').innerHTML = err.message;

        window.setTimeout(() => {
            clearFields();
        }, 2000);
    }

    if (tracks.collection.length > 1) {
        show('#mood_tracks');
        show('#sc');
    } else {
        document.getElementById('display').innerHTML = `No tracks found`;
    }  
}

// Display the spinner before JSONP request
const startSpinner = () =>  {
    document.getElementById("loader").style.visibility = "visible";
}

// Hide the spinner before rendering the data to the dom
const stopSpinner = () => {
    document.getElementById("loader").style.visibility = "hidden";
}

// Modify CSS rules when necessary 
const css = (selector, property, value) => {

    //Loop through all styles   
    for (let i = 0; i < document.styleSheets.length; i++) {

        //Try add rule
        try { document.styleSheets[i].insertRule(
            selector + ' {'+property+':'+value+'}', 
            document.styleSheets[i].cssRules.length);
        } 
        catch(err) {
            try { 
                document.styleSheets[i].addRule(selector, property+':'+value);
        } 
        catch(err) {}}//IE
    }
}

// Show a dom element hidden in the css
const show = (selector) => {
    css(selector, 'display', 'block');
}

// Hide a dom element 
const hide = (selector) => {
    css(selector, 'display', 'none');
}

addEventListeners();