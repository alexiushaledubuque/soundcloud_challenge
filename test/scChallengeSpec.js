var assert = chai.assert,
		expect = chai.expect,
		should = chai.should();

describe('Object tests - exist & sorting', function() {
  it('api object should exist', function() {
    var testObj = apiObject;

    expect(testObj).to.be.a('object');
  })

  it('sorted object should deep equal preassigned object', function () {
  	let testObject = [
  		{ "first_name": "Ted", "last_name": "Baker" },
  		{ "first_name": "Sed", "last_name": "Andrews" },
  		{ "first_name": "Mary", "last_name": "Thumb" },
  		{ "first_name": "Taylor", "last_name": "Xi" },
  		{ "first_name": "Carolyn", "last_name": "Rudy" },
  	];

  	let results = [ 
  		{ first_name: 'Carolyn', last_name: 'Rudy' },
		  { first_name: 'Mary', last_name: 'Thumb' },
		  { first_name: 'Sed', last_name: 'Andrews' },
		  { first_name: 'Taylor', last_name: 'Xi' },
		  { first_name: 'Ted', last_name: 'Baker' } 
		];

  	testObject.sort(sortByProp('first_name', 'last_name'));
    expect(testObject).to.deep.equal(results);
  }) 
})

describe('XHR Request tests', function() {
  it('SCAPI function should exist for api request', function() {
  	expect(scApi).to.exist;
  })

  it('Object should contain data - length greater than 0', function () {
  	  url = 'http://api.soundcloud.com/search?q=Prince&client_id=7d2a254767bd1fededc0ff2867c94419';
  	 
  	 // SC API Service
  	 try {
  	 	scApiTester(url, (tracks) => {
        expect(tracks).to.be.ok;
        expect(tracks).to.not.be.empty;
      });
  	 } catch (e) { 
  	 		console.error(e);
  	 }  
  }) 

  it('Space is replaced with endpoint in url', function() {
    uID = '/search?q=';
    url = 'http://api.soundcloud.com/ /Prince&client_id=7d2a254767bd1fededc0ff2867c94419';
    url = url.replace(/\s/gi, uID);

    expect(url).to.not.include(' ');
  })
})

describe('DOM behavior', function() {
  const newItem = document.getElementById('display');
  it('should be able to add messages to the DOM', function() {
    newItem.innerHTML = 'No tracks found!';
    expect(newItem.length).to.not.equal(0);
  })

  it('should be able to remove messages from the DOM', function() {
    newItem.innerHTML += 'Found new tracks for this user';
    clearFieldsTester();
    expect(newItem.children.length).to.equal(0);
  })
})
