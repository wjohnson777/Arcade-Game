// Starts score at 0.
/* var score = 0; */
/* document.getElementById('gameScore').innerHTML = score; */

/* function resetScore() {
	document.getElementById("gameScore").reset();
}; */

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
	// Calls multiSpeed()
	if (this.x > 550) {
		this.x = -100;
		this.multiSpeed();
	}
	// If the enemy and the player collide.
	// Points removed if hit by enemy.
    if (player.x < this.x + 60 &&
		player.x + 37 > this.x &&
		player.y < this.y + 25 &&
		30 + player.y > this.y) {
		score = 0;
		document.getElementById('gameScore').innerHTML = score;
		player.reset();
    }
};

// Variable enemy speed function
var speedFactor = 50;

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

var Player = function () {
    this.sprite = 'images/char-boy.png';
	this.startingX = 200;
	this.startingY = 450;
    this.x = this.startingX;
    this.y = this.startingY;
	this.score = 0;
};

// Called every time the player position is updated
Player.prototype.update = function() {
 	
	// If the player reaches the water
	if (player.y < 20) {
	score++;
	if(score == 5) {
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

// Applies boundries to the player canvas
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

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];

// Row that each enemy is created in
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

    player.handleInput(allowedKeys[e.keyCode]); {
		gameTimer();
	}
	
});