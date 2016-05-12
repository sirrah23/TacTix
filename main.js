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
      //Next player's turn
      setPlayerDisplay(theGame.getCurrentPlayer());
    } else {
      alert("Bad MOVE! Try again!");
    }
  });
});
