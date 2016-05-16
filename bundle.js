(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

let tactix = require('./tactix.js');
let theGame = new tactix();

//Turn squares selected by the player
//red upon click
$(function(){
  $(".square").click(function() {
    $(this).toggleClass("red");
  });
});

//Function that allows us to set the
//player to be displayed as whoever we want
function setPlayerDisplay(player){
  $("#currentPlayer").text(player);
  if(player == "COMPUTER"){
    computerMakeMove();
  }
}

//Puts a spinner on the board to indicate that the CPU
//is currently "thinking" what move it should make
function putSpinnerOnScreen(){
  let spinner = $('<div class="loader"></div>');
  $(".board").append(spinner);
}

//Removes spinner from the board once CPU turn is over
function removeSpinnerFromScreen(){
  $("div").removeClass("loader");
}

function computerMakeMove(){
  //Loading spinner
  putSpinnerOnScreen();
  setTimeout(function(){
    //Compute what squares the computer should choose
    let computerMove = theGame.computeMove(theGame.lastMove);
    console.log(computerMove);
    //Make the move on those squares
    let moveSuccess = theGame.makeMove(computerMove);
    console.log(moveSuccess);
    //Remove squares selected by computer from board
    let boardSquares = $(".square");
    if(moveSuccess){
      computerMove.map(function(squareIndex){
        boardSquares.eq(squareIndex).text("");
      });
      //Remove spinner
      removeSpinnerFromScreen();
      //HUMAN's turn
      setPlayerDisplay(theGame.getCurrentPlayer());
      //Game over message
      if(theGame.gameOver()){
        alert("Game over! The CPU won!");
      }
      return;
    } else {
      alert("This should never happen.");
    }
  },2000);
}

//Display the current player as set in the
//game object
$(function(){
  setPlayerDisplay(theGame.getCurrentPlayer());
});

//Player performs move when he clicks the button
$(function(){
  $("#makeMove").click(function(){
    //DOM nodes for clicked squares
    let squareNodeArr = [];
    //Indices for clicked squares
    let squareIndexArr = [];
    $( ".red" ).each(function( index ) {
      //Store the DOM nodes clicked by user
      squareNodeArr.push($(this));
      //Store the square indices clicked by user
      squareIndexArr.push(parseInt($(this).text()));
    });
    //Let game object handle the move making
    let moveSuccess = theGame.makeMove(squareIndexArr);
    if(moveSuccess){
      //Remove square color and indices if move success
      squareNodeArr.map(function(squareNode){
        squareNode.toggleClass("red"); //remove square color
        squareNode.text(""); //remove the text in the square
        return;
      });
      //COMPUTER's turn
      setPlayerDisplay(theGame.getCurrentPlayer());
    } else {
      alert("Bad MOVE! Try again!");
    }
  });
});

},{"./tactix.js":2}],2:[function(require,module,exports){
"use strict";

/**
 * Represents a Tac Tix game board
 * @constructor
 */
function tactix(){
  this.currentPlayer = "COMPUTER";
  this.board = this.generateBoard(25);
  this.validator = require('./validator.js');
  this.lastMove = [];
  this.movesMade = 0;
}

/**
 * Creates a boolean array and fills with n true.
 * @param {number} n - how long a vector of trues you want
 * @return {Array}
 */
tactix.prototype.generateBoard = function(n){
  let board = [];
  for(let i = 0; i < n ; i++){
      board.push(true);
  }
  return board;
}

/**
 * Given a couple of squares, determine if they
 * have already been selected by a player.
 * @param {Array.<number>}
 * @return boolean
 */
tactix.prototype.alreadySelected = function(squares){
	let alreadySelectedFlag = false;
	squares.forEach(function(square){
		if(this.board[square] === false){
			alreadySelectedFlag = true;
			return;
		}
	}.bind(this));

	if(alreadySelectedFlag){
		return true;
	} else {
		return false;
	}
}

/**
 * Checks to see if the game is over yet or not.
 * Once all 25 squares have been selected it's game over.
 * @return boolean
 */
tactix.prototype.gameOver = function(){
  if(this.movesMade == 25){
    return true;
  } else {
    return false;
  }
}

/**
 * Determines if proposed move is valid and if so
 * applies the move to the current game board.
 * @param {Array.<number>}
 * @return boolean
 */
tactix.prototype.makeMove = function(squares){
	if(!this.validator.validNumberOfSelections(squares)){
		return false;
	}

	if(!this.validator.withinBoundaries(squares)){
		return false;
	}

	if(!this.validator.validRow(squares) &&
		!this.validator.validColumn(squares)){
		return false;
	}

	if(this.alreadySelected(squares)){
		return false;
	}

	squares.forEach(function(square){
		this.board[square] = false;
	}.bind(this));

	this.lastMove = squares;

  this.movesMade += squares.length;

  this.switchPlayers();

	return true;
}

/**
 * There are two players in this game, the human and the computer.
 * This function allows you to switch between them.
 */
tactix.prototype.switchPlayers = function(){
  if (this.currentPlayer == "COMPUTER"){
    this.currentPlayer = "HUMAN";
  } else {
    this.currentPlayer = "COMPUTER";
  }
  return this.currentPlayer;
}

/**
 * Given an array of square indices, it will reflect
 * them across the center of the grid (assumed 5x5 grid)
 * @param {Array.<number>}
 * @return {Array.<number>}
 */
tactix.prototype.computeMove = function(squares){
  let centerSquareIndex = 12;
  //Return the center of the board by default
  if(squares.length == 0){
    return [centerSquareIndex];
  }
  //Reflect x-y for square along the center square
  let reflectedSquares = squares.map(function(square){
    return centerSquareIndex - square + centerSquareIndex;
  });
  reflectedSquares.sort();
  return reflectedSquares;
}

/**
 * Getter for the current player
 * @return {String}
 */
tactix.prototype.getCurrentPlayer = function(){
  return this.currentPlayer;
}


module.exports = tactix;

},{"./validator.js":3}],3:[function(require,module,exports){
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

},{}]},{},[1,3,2]);
