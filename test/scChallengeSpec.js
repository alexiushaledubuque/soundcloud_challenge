var assert = chai.assert,
		expect = chai.expect,
		should = chai.should();

describe('Object', function() {
  it('api object should exist on page load', function() {
    var testObj = apiObject;

    assert.equal(typeof testObj, 'object', 'testObj was not type object');
  });

  it('should have a jsonp function for api requests', function () {
    assert.equal(typeof jsonp, 'function', 'jsop must exist for request');
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

  it('Server response should contain data - length greater than 0', function () {
  	  url = 'http://api.soundcloud.com/search?q=Prince&client_id=7d2a254767bd1fededc0ff2867c94419';
  	 // SC API Service
      jsonpTester(url, (tracks) => {
          assert.equal(tracks.length, 0, 'Server should return data');
      });
  }) 

});
