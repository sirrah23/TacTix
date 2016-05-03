"use strict";

function tactix(){
  this.board = this.generateBoard();
  this.validator = require('./validator.js');

}

tactix.prototype.generateBoard = function(){
  let board = [];
  for(let i = 0; i < 25; i++){
      board.push(true);
  }
  return board;
}

module.exports = tactix;
