const apiObject = (() => {
    return scApiObject = {
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
    document.getElementById('submit_btn').addEventListener('click', getUserInput);
    document.getElementById('user_input').addEventListener('keypress', handleKeyPress);
    // document.getElementById('hide').addEventListener('click', hide);
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

const getUserInput = () => {
    let userInput = document.getElementById('user_input').value
            
    // Reset fields after input received
    clearFields(); 

    // Format & get data from meetup api
    getSCApiData(userInput);
}

// Create the url for JSONP
const buildUrl = (url, endPoint, textInput, uID) => {
    if (endPoint === apiObject.search) {
        return `${url}${endPoint}${textInput}&client_id=${apiObject.clientId}`;
    } 
    
    if (endPoint === apiObject.userTracks) {
        endPoint = endPoint.replace(/\s/gi, uID);
        return `${url}${endPoint}${textInput}&client_id=${apiObject.clientId}`;
    }
    
    if (endPoint === apiObject.favorites) {
        endPoint = endPoint.replace(/\s/gi, uID);
        return `${url}${endPoint}?client_id=${apiObject.clientId}`;
    }
}

// JSONP uses a script to fetch the data from api.soundcloud.com
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
            tracks.collection.length > 0 ? listTracks(tracks) : document.getElementById('display').innerHTML = 
                `<h4>No Groups Found!</h4>`;
        });
    }    
}

const getUserTracks = (userid) => {
    // Build URL
    let url = buildUrl(apiObject.sc, apiObject.userTracks, '', userid);
    console.log("get user tracks url: ", url);
    console.log('uid: ', userid);

    jsonp(url, (userTracks) => {
        console.log(userTracks);
        userTracks.length > 0 ? ulistTracks(userTracks) : document.getElementById('display').innerHTML = 
                `<h4>No Groups Found!</h4>`;
    });
}

const getFavoriters = (trackid) => {
    // let url = 'http://api.soundcloud.com/tracks/35193992/favoriters?client_id=d6i0wruU7ddayTqrhwszluW0i9aNBlb1';
    let url = buildUrl(apiObject.sc, apiObject.favorites, '', trackid);

    console.log('favoriters url: ', url);
    // console.log('favoriters uri: ', uri);

    jsonp(url, (favoriters) => {
        console.log(favoriters);
        favoriters.length > 0 ? favoriteUsers(trackid, favoriters) : document.getElementById('display').innerHTML = 
                `<h4>No Favoriters!</h4>`;
    });
}

const sortByProp = ((prop1, prop2) => {
   ((a,b) => {
      if( a[prop1] > b[prop1]){
          return 1;
      }else if( a[prop1] < b[prop1] ){
          return -1;
      }
      if( a[prop2] > b[prop2]){
          return 1;
      }else if( a[prop2] < b[prop2] ){
          return -1;
      }
      return 0;
   })
});

const favoriteUsers = (track, favList) => {
    let favoredTrack = '',
        string = '';

    // Sorts the response data according to given properties
    favList.sort(sortByProp('followers_count', 'last_name'));
    // console.log('Sorted List: \n', JSON.stringify(favList[0], null, 4));

    document.getElementById('fav_users_list').innerHTML = '';
    // console.log('User Track List: \n', JSON.stringify(userTrackList[0], null, 4));

    try {
            favoredTrack = `<h2>${favList.length}&nbspUsers Favored Track:&nbsp${track}</h2><br>`;
            favList.forEach((fav) => {
                // debugger; 
                string += `<li><div class='f_user'><iframe src= ${fav.avatar_url} scrolling="no" 
                align="middle" width="100" height="70" seamless></iframe><br><a href=${fav.permalink_url}>
                <span id=fName>${fav.full_name}</span></a><br>${fav.followers_count}&nbsp Followers</div></li>`;  
                // console.log('Track Details: \n', JSON.stringify(track.title, null, 4));
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
    // console.log('User Track List: \n', JSON.stringify(userTrackList[0], null, 4));

    try {
        user = `<h2>${userTrackList[0].user.username}'s Tracks</h2><br>`;
        userTrackList.forEach((item) => {
            // debugger;
            string += `<li onclick='getFavoriters(${item.id})'>Track Title:&nbsp&nbsp ${item.title}<br>`;
            if (item.tag_list) {
                string += `tags:&nbsp<em>${item.tag_list}</em><br></li><br>`;
            } else {
                string += `</li><br>`;
            }
            // console.log('Track Details: \n', JSON.stringify(track.title, null, 4));
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

    console.log(`length of data: ${tracks.collection.length}`);

    try {
        tracks.collection.forEach((track) => {
            if (track.user){
                string += `<li onclick='getUserTracks(${track.user.id})'><span id='list_title'>Track Title:</span> ${track.title}<br>Username:&nbsp&nbsp ${track.user.username}<br>`;
                if (track.tag_list) {
                    string += `tags:&nbsp<em>${track.tag_list}</em><br></li><br>`;
                } else {
                    string += `</li><br>`;
                }
                // console.log('Track Details: \n', JSON.stringify(track.title, null, 4));
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

const show = (selector) => {
    // debugger;
    css(selector, 'display', 'block');
}

const hide = (selector) => {
    css(selector, 'display', 'none');
}

addEventListeners();

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
		
	 // });