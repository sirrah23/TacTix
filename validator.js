"use strict";

const LOWER_BOUNDARY = 0;
const UPPER_BOUNDARY = 24;

/**
 * Comparator function to be passed to Array.sort
 * in order to sort integers numerically rather
 * than lexicographically...
 */
function sortNumber(a,b) {
    return a - b;
}

function validNumberOfSelections(squares){
  if (squares.length == 0 || squares.length > 5){
    return false;
  } else {
    return true;
  }
}



/**
 * Given a list of numbers, will determine if all
 * of them are within the lower and upper bounds
 * @param {Array.number} squares
 * @return {boolean} Indicates if numbers are within the boundaries
 *
 */
function withinBoundaries(squares){
  function numWithinBoundaries(n){
    if(LOWER_BOUNDARY <= n && n <= UPPER_BOUNDARY){
      return true;
    }
    return false;
  }
  if(squares.length == 0){
    return false;
  }
  return squares.filter(numWithinBoundaries).length == squares.length;
}

/**
 * Given a list of numbers, will determine if all
 * of them fall within a row on a 5x5 grid, without any gaps.
 * @param {Array.number} squares
 * @return {boolean}
 *
 */
function validRow(squares){
  //Check that all given squares are next to each other
  //by checking the difference between their positions
  let squareCopy = squares.slice();
  squareCopy.sort(sortNumber);
  let differences = [];
  for(let i = 0; i < squareCopy.length-1;i++){
    differences.push(squareCopy[i+1]-squareCopy[i]);
  }
  return differences.filter(function(n){return n == 1;}).length == squareCopy.length-1;
}

/**
 * Given a list of numbers, will determine if all
 * of them fall within a column on a 5x5 grid, without any gaps.
 * @param {Array.number} squares
 * @return {boolean}
 *
 */
function validRow(squares){
  //Check that all given squares are next to each other
  //by checking the difference between their positions
  let squareCopy = squares.slice();
  squareCopy.sort(sortNumber);
  let differences = [];
  for(let i = 0; i < squareCopy.length-1;i++){
    differences.push(squareCopy[i+1]-squareCopy[i]);
  }
  return differences.filter(function(n){return n == 1;}).length == squareCopy.length-1;
}

function validColumn(squares){
  //Check that all given squares are next to each other
  //by checking the difference between their positions
  let squareCopy = squares.slice();
  squareCopy.sort(sortNumber);
  let differences = [];
  for(let i = 0; i < squareCopy.length-1;i++){
    differences.push(squareCopy[i+1]-squareCopy[i]);
  }
  return differences.filter(function(n){return n == 5;}).length == squareCopy.length-1;
}

module.exports = {
  withinBoundaries,
  validRow,
  validColumn,
};
function validColumn(squares){
  //Check that all given squares are next to each other
  //by checking the difference between their positions
  let squareCopy = squares.slice();
  squareCopy.sort(sortNumber);
  let differences = [];
  for(let i = 0; i < squareCopy.length-1;i++){
    differences.push(squareCopy[i+1]-squareCopy[i]);
  }
  return differences.filter(function(n){return n == 5;}).length == squareCopy.length-1;
}

module.exports = {
  validNumberOfSelections,
  withinBoundaries,
  validRow,
  validColumn,
};
