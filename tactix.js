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
