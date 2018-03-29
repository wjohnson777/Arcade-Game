// Variable assigned to increase enemy speed
var speedFactor = 50;
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
  this.speed = speed;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// Credit https://discussions.udacity.com/t/need-help-refactoring/32466/2
// I found the methods used in the udacity discussions link gave the code
// a cleaner easier to read look and more understandable.
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.halfBoxHeight = 50;
  this.halfBoxWidth = 37;
  this.x += this.speed * dt;
  if (this.x > 550) {
    this.x = -100;
    this.multiSpeed();
  }
  var enemyKeyUp = this.y - this.halfBoxHeight;
  var enemyKeyDown = this.y + this.halfBoxHeight;
  var enemyKeyLeft = this.x - this.halfBoxWidth;
  var enemyKeyRight = this.x + this.halfBoxWidth;
  // If the enemy and the player collide.
  // Score resets to "0" if hit by an enemy.
    if (player.y > enemyKeyUp &&
		player.y < enemyKeyDown &&
		player.x > enemyKeyLeft &&
		player.x < enemyKeyRight) {
    score = 0;
    document.getElementById('gameScore').innerHTML = score;
    player.reset();
  }
};

// Function randomly assigns different speed to each enemy
Enemy.prototype.multiSpeed = function() {
  this.speed = speedFactor * Math.floor(Math.random() * 10 + 1);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var score = 0;
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Credit https://discussions.udacity.com/t/need-help-refactoring/32466/2
// Used the method in the udacity discussions to make the Player function
// easier to read like the enemy.prototype.update above.
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.startingX = 200;
  this.startingY = 450;
  this.x = this.startingX;
  this.y = this.startingY;
  this.score = 0;
};

// Called every time the player position is updated
Player.prototype.update = function() {

// If the player reaches the water, the score increments by 1
// If the score reaches "10" an alert box activates with "You Win"
// After click "Ok" the game restarts
  if (player.y < 20) {
    score++;
    if (score == 5) {
      alert("You Win!");
      document.location.reload();
    }
    document.getElementById('gameScore').innerHTML = score;
    this.reset();
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Called when the player is reset to the starting point
Player.prototype.reset = function() {
  this.x = this.startingX;
  this.y = this.startingY;
};

// Applies boundries to the player canvas/grid
Player.prototype.handleInput = function(arrowkey) {
  if (arrowkey == 'left' && this.x > 0) {
    this.x -= 50;
  }
  if (arrowkey == 'right' && this.x < 400) {
    this.x += 50;
  }
  if (arrowkey == 'up' && this.y > 4) {
    this.y -= 50;
  }
  if (arrowkey == 'down' && this.y < 400) {
    this.y += 50;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];

// The row that each enemy is created in on the grid
// Added a fourth enemy row for increased difficulty
var enemyRow = [60, 140, 220, 300];
var enemy;

// Creates new enemy in each row
enemyRow.forEach(function(rowY) {
  enemy = new Enemy(0, rowY, 100 + Math.floor(Math.random() * 512));
  allEnemies.push(enemy);
});

// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);

});
