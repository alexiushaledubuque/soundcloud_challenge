# Internship Coding Challenge

## Challenge requirements
1.	Devise a fun way to use the Search Api. 
2.	After you have a simple search working, try to add a new way to explore tracks from the search results.
3.	Use the /search endpoint of our API to search for results.
4.	Optional features: 
		a. Support viewing more tracks from a user who showed up in the results
		b. View the users who favorited a track sorted by their numbers of followers
		c. Integrate with giphy to find gifs to show instead of the track artwork
5.	Have Fun!

## App Description
The purpose of this app is to search for tracks in based upon how the user is feeling or "their mood". Their input is matched in either the username, description, or title of the track in order to return that track in the results. The API has a limit of returning up to 50 items in the results. 

Once the tracks list is built, the elements are rendered to the dom and the div is no longer hidden. Each list item has an event listener which when clicked, will built a new list based upon that user's tracks. Event listeners on these items will invoke 1 additional API request to display all of the the users who've "favorited" the specific track. This last list contain only those users names and possible artwork if they have it. Their names are linked to their profile page in sc. 

## Setup Installation/Compatibility/Execution
1.	Download and unzip the compressed file sc_challenge.zip 
2.	Open either Chrome, Firefox, or Safari browsers
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
1.	Advanced search 
		a.	Autocomplete string
		b.	Persist search queries
2.	Sign Up/In
3.	Username lookup
4.	Email users
5.	Pagination
6.	Embed a player for the user track listing
7.	Live chatting via Socket.io
8.	Improved design to include carousel of giphys
9.	Add a server/Back End
		a.	Node/Express server
10.	Persist data in MongoDB or Postgres Database
		a.	Storage of user object
				1a.	username
				1b.	id
				1c. artwork
11.	Code Deploy for rapid future releases
		a.	Docker
		b.	Heroku
		c.	AWS
12.	Refactor in React.js with Redux
13.	User blog
