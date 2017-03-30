	// SoundCloud Api Request
	SC.initialize({
		  client_id: 'b8248d692be930536efb3ac01d46199f'
		});

		var page_size = 100;
		SC.get('/tracks', { limit: page_size }).then((tracks) => {
		  // first 100 tracks
		  console.log(tracks.collection.length);
		});

		SC.get('/tracks', {
		  limit: page_size, linked_partitioning: 1
		}).then((tracks) => {
			
			for (let i = 0; i < tracks.collection.length; i++){
				let string = `${tracks.collection[i].title}<br><br>${tracks.collection[i].description}<br><br>`;
				document.getElementById('sc').innerHTML += string;
			}
		   // console.log(JSON.stringify(tracks.collection[0], null, 4));
		});


// Giphy Api Request
		var csApi = (function  () {

	  var api = {},
	      baseUrl = 'http://api.giphy.com',
	      path = '/v1/gifs/search',
	      q = 'Religion+&+Spirituality'
	      api_key = 'dc6zaTOxFJmzC';

	  api.getData = function(callback) {
	    requestUrl = baseUrl + path + '?q=' + q + '&api_key=' + api_key;
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
		
	 })();

	 csApi.getData((response) => {
	 		response.data.forEach((gif) => {
	 			let pic = gif.images.fixed_height.url; 
	 			let string = `<div class='giphys'><iframe src=${pic} scrolling="no" align="middle" 
	 										width="200" height="170" seamless></iframe></div>`

	 			document.getElementById('gify').innerHTML += string;
	 		})
	 	 // console.log(JSON.stringify(response.data[0], null, 4));
	 });