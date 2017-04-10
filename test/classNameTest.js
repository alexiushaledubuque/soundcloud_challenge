describe('addClass', function() {
  it('should add class to element', function() {
    var element = { className: '' };

    addClass(element, 'test-class');

    assert.equal(element.className, 'test-class');
  });

  it('should not add a class which already exists', function() {
	  var element = { className: 'exists' };

	  addClass(element, 'exists');

	  var numClasses = element.className.split(' ').length;
	  console.log(numClasses);
	  assert.equal(numClasses, 1);
	});

	it('should append new class after existing one', function() {
	  var element = { className: 'exists' };

	  addClass(element, 'new_class');

	  var classes = element.className.split(' ');
	  console.log(classes);
	  assert.equal(classes[1], 'new_class');
	});
});