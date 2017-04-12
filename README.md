# SoundCloud Internship Coding Challenge

## Challenge requirements

1.	Devise a fun way to use the Search Api. 
2.	After you have a simple search working, try to add a new way to explore tracks from the search results.
3.	Use the /search endpoint of our API to search for results.
4.	Optional features: 
		a. Support viewing more tracks from a user who showed up in the results
		b. View the users who favorited a track sorted by their numbers of followers
		c. Integrate with giphy to find gifs to show instead of the track artwork
5.	Have Fun!

## Description
The purpose of this app is to search for tracks in SoundCloud based upon how the user is feeling or "their mood". Their input is matched in either the username, description, or title of the track in order to return that track in the results. The API has a limit of returning up to 50 items in the results. 

Once the tracks list is built, the elements are rendered to the dom and the div is no longer hidden. Each list item has an event listener which when clicked, will built a new list based upon that user's tracks. Event listeners on these items will invoke 1 additional API request to display all of the the users who've "favorited" the specific track. This last list is of only the users names and possible artwork if they have it. Their names are linked to their profile page in SoundCloud. 

## Setup Installation/Compatibility/Execution

1.	Download and unzip the compressed file soundcloud_challenge.zip 
2.	Open either Chrome, Firefox, or Safari browser
3.	Open the file index.html from the root directory to execute
		a. File > Open File > index.html

### Features:
1.	Single Page Application
2.	Single point of input
3.	API results are formatted and displayed
4.	Scroll added on Y-axis for each list
5.	Spinner/loader while data is retrieved from the api

## Mocha/Chai Testing - Browser testing
1.	Execution - File > Open File > SpecRunner.html

### Tools/Tech Stack
Front End
1.	Vanilla Javascript/ES6
2.	HTML/HTML5
3.	CSS/CSS3
4.	Mocha/Chai
5.	Github

No Back End

###	Future Considerations 
1.	Add a server/Back End
		a.	Node/Express server

2.	Persist data in MongoDB or Postgres Database
		a.	Storage of user object
				1a.	username
				1b.	id
				1c. artwork

3.	Code Deploy for rapid future releases
		a.	Docker
		b.	Heroku
		c.	AWS

4.	Pagination

5. Embed a player for the user track listing to play the track

6. Live chatting via Socket.io with other users currently in the system

7. Improved design to include carousel of giphys
