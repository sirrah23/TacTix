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
