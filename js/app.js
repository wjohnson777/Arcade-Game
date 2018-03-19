// Sets an initial player score of 0.
var score = 0;
document.getElementById('gameScore').innerHTML = score;

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
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
	
	if (this.x > 550) {
		this.x = -100;
		this.multiSpeed();
	}

	// If the enemy and the player collide.
    if (player.x < this.x + 60 &&
		player.x + 37 > this.x &&
		player.y < this.y + 25 &&
		30 + player.y > this.y) {
		score = 0;
		document.getElementById('gameScore').innerHTML = score;
		player.reset();
    }
};

var speedFactor = 50;

Enemy.prototype.multiSpeed = function() {
	this.speed = speedFactor * Math.floor(Math.random() * 10 + 1);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 450;
};

// Is called every time the player position is updated
Player.prototype.update = function() {
 	
	// If the player reaches the water
	if (player.y < 20) {
	score++;
	document.getElementById('gameScore').innerHTML = score;
	this.reset();
}
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    if(direction == 'left' && this.x > 0) {
        this.x -= 50;
    }
    if(direction == 'right' && this.x < 400) {
        this.x += 50;
    }
    if(direction == 'up' && this.y > 3) {
        this.y -= 50;
    }
    if(direction == 'down' && this.y < 400) {
        this.y += 50;
    }
};

// Is called when the player is reset to the starting point
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 450;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var enemyRow = [60, 140, 220, 300];
var enemy;

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