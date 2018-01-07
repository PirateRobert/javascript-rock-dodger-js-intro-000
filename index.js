
const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const ROCKS = [];
const START = document.getElementById('start');

var gameInterval = null;


function checkCollision(rock) {
  const top = positionToInteger(rock.style.top);
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);

    const dodgerRightEdge =  dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + 20;

      if (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) {
      return true;
    } if (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) {
      return true;
    } if (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge) {
      return true;
    }
  } return false;
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  var top = 0;
  rock.style.top = top;

  document.getElementById("game").appendChild(rock);
  moveRock(rock);

  function moveRock(rock) {

     if (checkCollision(rock)){
       endGame();
     }

     else if (rock.style.top < 400){
       var topper = rock.style.top.replace('px', '');
       var num = parseInt(topper, 10);
       rock.style.top = `${num + 2}px`;
       window.requestAnimationFrame(moveRock);
     }
    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
     else{
        document.getElementById("game").remove(rock);
     }
  }

  // We should kick of the animation of the rock around here
  window.requestAnimationFrame(moveRock);
  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock);

  // Finally, return the rock element you've created
  return rock;
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  for (let i = 0;i<ROCKS.length;i++){
    document.getElementById("game").removeChild(ROCKS[i]);
  }
  window.removeEventListener('keydown', moveDodger);
  alert("YOU LOSE!");
}

function moveDodger(e) {
     if (e.which===LEFT_ARROW){
       e.preventDefault();
       e.stopPropagation();
       moveDodgerLeft();
     } else if (e.which ===RIGHT_ARROW){
       e.preventDefault();
       moveDodgerRight();
     }
   }

function moveDodgerLeft() {
  var leftNumbers = DODGER.style.left.replace('px', '');
  var left = parseInt(leftNumbers, 10);

  if (left > 0) {
    DODGER.style.left = `${left - 3}px`;
}
}

function moveDodgerRight() {
  var rightNumbers = DODGER.style.right.replace('px', '');
  var right = parseInt(rightNumbers, 10);

  if (right > 0) {
    DODGER.style.right = `${right - 3}px`;
}
}
/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0;
}

function start() {
  window.addEventListener('keydown', moveDodger);

  START.style.display = 'none';

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)));
  }, 1000);
}
