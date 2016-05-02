const LOWER_BOUNDARY = 0;
const UPPER_BOUNDARY = 24;

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

module.exports = {
  withinBoundaries,
}
