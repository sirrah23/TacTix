var assert = require('chai').assert;
//var validator = require('../validator.js');

describe('Check the boundaries of the board', function(){
	it('should return true for valid square indicies',function(){
		assert.equal(true, validator.withinBoundaries([1,2,3,4]));
		assert.equal(true, validator.withinBoundaries([25,24,23,22,21]));
		assert.equal(true, validator.withinBoundaries([1,5,7,8,10,13]));
	});

	it('should return false for invalid square indicies',function(){
		assert.equal(false,validator.withinBoundaries([]));
		assert.equal(false,validator.withinBoundaries([-1,-2,-3,-4,-5]));
		assert.equal(false,validator.withinBoundaries([0]));
		assert.equal(false,validator.withinBoundaries([26,27,28,29,30]));
	});
});
describe('Check if you have a valid row', function(){
	it('should return true for valid row selections',function(){
		assert.equal(true,validator.validRow([1,2,3,4,5]));
		assert.equal(true,validator.validRow([1,2,3]));
		assert.equal(true,validator.validRow([4,5]));
		assert.equal(true,validator.validRow([21,22,23]));
		assert.equal(true,validator.validRow([16,17,18]));
	});

	it('should return false for invalid row selections', function(){
		assert.equal(false,validator.validRow([]));
		assert.equal(false,validator.validRow([0,1,2,3]));
		assert.equal(false,validator.validRow([-1,0,1,2]));
		assert.equal(false,validator.validRow([23,24,25,26]));
		assert.equal(false,validator.validRow([1,7,13,19,25]));
		assert.equal(false,validator.validRow([1,2,3,9,5]));
	});
});

describe('Check if you have a valid column', function(){
	it('should return true for valid column selections',function(){
    assert.equal(true,validator.validColumn([1,6,11,16,21]));
    assert.equal(true,validator.validColumn([1,6,11]));
    assert.equal(true,validator.validColumn([1,6,]));
    assert.equal(true,validator.validColumn([9,14,19]));
    assert.equal(true,validator.validColumn([20,25]));
	});

  it('should return false for invalid column selections',function(){
		assert.equal(false,validator.validColumn([]));
		assert.equal(false,validator.validColumn([1,6,12,17,21]));
		assert.equal(false,validator.validColumn([0,1,6]));
		assert.equal(false,validator.validColumn([20,25,30]));
		assert.equal(false,validator.validColumn([1,2,6,7,11]));
  });
});
