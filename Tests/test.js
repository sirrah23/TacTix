var assert = require('chai').assert;
var validator = require('../validator.js');
var tactix = require('../tactix.js');

describe('Make sure player chose between 1 and 5 squares', function(){
		it('should return true for 1<= size <= 5', function(){
				assert.equal(true, validator.validNumberOfSelections([0,5,3,2,1]));
				assert.equal(true, validator.validNumberOfSelections([0]));
				assert.equal(true, validator.validNumberOfSelections([18,19]));
				assert.equal(true, validator.validNumberOfSelections([21,26,27]));
				assert.equal(true, validator.validNumberOfSelections([1,2,3,4]));
				assert.equal(true, validator.validNumberOfSelections([13,12,11,10]));
		})

		it('should return false for size 0 or more than 5', function(){
				assert.equal(false, validator.validNumberOfSelections([]));
				assert.equal(false, validator.validNumberOfSelections([0,1,2,3,4,5,6]));
				assert.equal(false, validator.validNumberOfSelections([25,26,27,28,29,30]));
		})
})


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

describe('The game board should work...', function(){
	it('should initialize correctly',function(){
		var game = new tactix();
		assert.deepEqual(game.board,[true,true,true,
			true,true,true,
			true,true,true,
			true,true,true,
			true,true,true,
			true,true,true,
			true,true,true,
			true,true,true,true,])
		assert.deepEqual(game.validator,validator);
	});
});
