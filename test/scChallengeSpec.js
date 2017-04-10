var assert = chai.assert,
		expect = chai.expect,
		should = chai.should();

describe('Object', function() {
  it('api object should exist on page load', function() {
    var testObj = apiObject;

    assert.equal(typeof testObj, 'object', 'testObj was not type object');
  });

  it('should sort the object based on 2 properties', function () {
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

    assert.deepEqual(testObject, results, 'Object should equal results object');
  }); 

  it('JSONP function should exist for api request', function() {
  	expect(jsonp).to.exist;
  })

  it('Server response should contain data - length greater than 0', function () {
  	  url = 'http://api.soundcloud.com/search?q=Prince&client_id=7d2a254767bd1fededc0ff2867c94419';
  	 
  	 // SC API Service
  	 try {
  	 	jsonpTester(url, (tracks) => {
  	 		console.log(tracks);
        expect(tracks).to.be.ok;
      });
  	 } catch (e) { 
  	 		console.error(e);
  	 }
      
  }); 

});
