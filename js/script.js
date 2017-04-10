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

// Event listener for the "Enter" key on both input fields (text & zip code)
const handleKeyPress = (e) => {
    let key = e.keyCode || e.which;
    if (key === 13) getUserInput();
}

// Add event listeners
const addEventListeners = () => {

    if (document.getElementById('submit_btn')) {
        document.getElementById('submit_btn').addEventListener('click', getUserInput);    
    }

    if (document.getElementById('user_input')) {
        document.getElementById('user_input').addEventListener('keypress', handleKeyPress);
    }  
}

// Clear input fields and reset focus for next user input request
const clearFields = () => {
    document.getElementById('user_input').value = '';
    document.getElementById('user_input').focus();
    document.getElementById('sc').value = '';
    document.getElementById('fav_users_list').value = '';
    document.getElementById('user_tracks_list').value = '';
    document.getElementById('display').innerHTML = '';
}

// Display the spinner before JSONP request
const startSpinner = () =>  {
    document.getElementById("loader").style.visibility = "visible";
}

// Hide the spinner before rendering the data to the dom
const stopSpinner = () => {
    document.getElementById("loader").style.visibility = "hidden";
}

const getUserInput = () => {
    let userInput = document.getElementById('user_input').value
            
    // Reset fields after input received
    clearFields(); 

    getSCApiData(userInput);
    // gfApi(userInput);
}

// Create the url for JSONP
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

// JSONP uses a script to fetch the data from api.soundcloud.com
const jsonp = (url, cb) => {

    // Start the spinner immediately before the api request
    startSpinner();

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

// Fetching tracks from api.soundcloud.com
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
        jsonp(url, (tracks) => {
            tracks.collection.length > 0 ? (stopSpinner(), listTracks(tracks)) : (document.getElementById('display').innerHTML = 
                `<h4>No Groups Found!</h4>`, stopSpinner());
        });
    }    
}

// Fetching more tracks from a specific user
const getUserTracks = (userid) => {

    // Build URL
    let url = buildUrl(apiObject.sc, apiObject.userTracks, '', userid);

    jsonp(url, (userTracks) => {
        userTracks.length > 0 ? (stopSpinner(), ulistTracks(userTracks)) : (document.getElementById('display').innerHTML = 
                `<h4>No Groups Found!</h4>`, stopSpinner());
    });
}

// Fetching favoriters of a specific track
const getFavoriters = (trackid) => {
    let url = buildUrl(apiObject.sc, apiObject.favorites, '', trackid);
    jsonp(url, (favoriters) => {
        favoriters.length > 0 ? (stopSpinner(), favoriteUsers(trackid, favoriters)) : (document.getElementById('display').innerHTML = 
                `<h4>No Favoriters!</h4>`, stopSpinner());
    });
}

// Sort favoriters according to  follower_count & last_name
const sortByProp = (prop1, prop2) => {
   return function(a,b){
      if (a[prop1] > b[prop1]){
          return 1;
      } else if( a[prop1] < b[prop1] ){
          return -1;
      }

      if( a[prop2] > b[prop2]){
          return 1;
      } else if( a[prop2] < b[prop2] ){
          return -1;
      }
      return 0;
   }
}

// Render users whom favorited a track
const favoriteUsers = (track, favList) => {
    let favoredTrack = '',
        string = '';

    favList.sort(sortByProp('followers_count', 'last_name'));

    document.getElementById('fav_users_list').innerHTML = '';

    try {
            favoredTrack = `<div class=col_header><h2>${favList.length}&nbspUsers Favored Track:&nbsp${track}</h2></div><br>`;
            favList.forEach((fav) => {
                string += `<li><div><a href=${fav.permalink_url}>${fav.full_name}</a>`;

                if (fav.artwork_url) {
                    string += `<iframe src=${fav.artwork_url} scrolling="no" align="middle" 
                    width="100" height="70" seamless></iframe><br>`    
                }; 
                
                string += `</div></li>`;
            })
            document.getElementById('fav_users_list').innerHTML += `${favoredTrack}${string}`;  
    }   
    catch(err) {
        document.getElementById('display').innerHTML = err.message;
    }
    show('#favoriters');
}

const ulistTracks = (userTrackList) => {
    let user = '',
        string = '';
    document.getElementById('user_tracks_list').innerHTML = '';

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
                width="100" height="70" seamless></iframe></li><br>` : string += `</li><br>`;
        })

        document.getElementById('user_tracks_list').innerHTML += `${user}${string}`;  
    }   
    catch(err) {
        document.getElementById('display').innerHTML = err.message;
    }
    show('#users');
}

const listTracks = (tracks) => {
    let string = '';
    document.getElementById('tracklist').innerHTML = '';

    try {
        tracks.collection.forEach((track) => {
            if (track.user){
                string += `<li onclick='getUserTracks(${track.user.id})'><span id='list_title'>Track Title:</span> ${track.title}<br>Username:&nbsp&nbsp ${track.user.username}<br>`;
                if (track.tag_list) {
                    string += `tags:&nbsp<em>${track.tag_list}</em><br>`;
                } 

                // Only render artwork if it exists
                track.artwork_url ? 
                    string += `<iframe src=${track.artwork_url} scrolling="no" align="middle" 
                    width="100" height="70" seamless></iframe></li><br>` : string += `</li><br>`;
            }
        })
        show("#mood_tracks");
        document.getElementById('tracklist').innerHTML += string; 
    }   
    catch(err) {
        document.getElementById('display').innerHTML = err.message;
    }
    show('#sc');
}

// Modify CSS rules when necessary 
const css = (selector, property, value) => {
    for (let i = 0; i < document.styleSheets.length; i++) {//Loop through all styles   
        //Try add rule
        try { document.styleSheets[i].insertRule(
            selector + ' {'+property+':'+value+'}', 
            document.styleSheets[i].cssRules.length);
        } catch(err) {
            try { document.styleSheets[i].addRule(selector, property+':'+value);
        } catch(err) {}}//IE
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