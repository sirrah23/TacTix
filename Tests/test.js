var assert = require('chai').assert;
var validator = require('../validator.js');

describe('Check the boundaries of the board', function(){
	it('should return true for valid square indicies',function(){
		assert.equal(true,validator.withinBoundaries([0]));
		assert.equal(true, validator.withinBoundaries([0,1,2,3]));
		assert.equal(true, validator.withinBoundaries([24,23,22,21,20]));
		assert.equal(true, validator.withinBoundaries([0,4,7,8,10,13]));
	});

	it('should return false for invalid square indicies',function(){
		assert.equal(false,validator.withinBoundaries([]));
		assert.equal(false,validator.withinBoundaries([-1,-2,-3,-4,-5]));
		assert.equal(false,validator.withinBoundaries([26,27,28,29,30]));
	});
});
describe('Check if you have a valid row', function(){
	it('should return true for valid row selections',function(){
		assert.equal(true,validator.validRow([0,1,2,3,4]));
		assert.equal(true,validator.validRow([0,1,2]));
		assert.equal(true,validator.validRow([3,4]));
		assert.equal(true,validator.validRow([20,21,22]));
		assert.equal(true,validator.validRow([15,16,17]));
	});

	it('should return false for invalid row selections', function(){
		assert.equal(false,validator.validRow([]));
		assert.equal(false,validator.validRow([6,12,8,9]));
		assert.equal(false,validator.validRow([4,9,14,19,24]));
		assert.equal(false,validator.validRow([13,17,23]));
	});
});

describe('Check if you have a valid column', function(){
	it('should return true for valid column selections',function(){
    assert.equal(true,validator.validColumn([0,5,10,15,20]));
    assert.equal(true,validator.validColumn([0,5,10]));
    assert.equal(true,validator.validColumn([0,5]));
    assert.equal(true,validator.validColumn([8,13,18]));
    assert.equal(true,validator.validColumn([19,24]));
	});

  it('should return false for invalid column selections',function(){
		assert.equal(false,validator.validColumn([]));
		assert.equal(false,validator.validColumn([0,5,11,16,20]));
		assert.equal(false,validator.validColumn([0,1,2,3,4]));
		assert.equal(false,validator.validColumn([4,9,13]));
		assert.equal(false,validator.validColumn([0,5,11,16,20]));
  });
});
