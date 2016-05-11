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
  setPlayerDisplay(theGame.currentPlayer);
});

//Player performs move when he clicks the button
$(function(){
  $("#makeMove").click(function(){
    $( ".red" ).each(function( index ) {
      console.log( index + ": " + $( this ).text() );
    });
  });
});
