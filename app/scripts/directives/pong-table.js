'use strict';

angular.module('blocPongApp')
  .directive('pongTable', ['$rootScope',
  	function ($rootScope) {
  		var animate = window.requestAnimationFrame ||
  			window.webkitRequestAnimationFrame ||
  			window.mosRequestAnimationFrame ||
  			function (callback) { window.setTimeout(callback, 1000/60); };

  		// paddle
  		function Paddle(x, y, width, height) {
  			this.x = x;
  			this.y = y;
  			this.width = width;
  			this.height = height;
  			this.xSpeed = 0;
  			this.ySpeed = 0;
  		}

  		Paddle.prototype.render = function(context) {
  			context.fillStyle = '#0000FF';
  			context.fillRect(this.x, this.y, this.width, this.height);
  		};

  		Paddle.prototype.move = function(x, y, tableHeight) {
  			var paddleTop, paddleBottom;

  			// update speed and location
  			this.x += x;
  			this.y += y;
  			this.xSpeed = x;
  			this.ySpeed = y;
  			paddleTop = this.y;
  			paddleBottom = this.y + this.height;

  			// paddle at top
  			if (paddleTop < 0) {
  				this.y = 0;
  				this.ySpeed = 0;
  			}

  			// paddle at bottom
  			if (paddleBottom > tableHeight) {
  				this.y = tableHeight - this.height;
  				this.ySpeed = 0;
  			}
  		};

  		// player
  		function Player() {
  			this.paddle = new Paddle(580, 150, 10, 50);
  		}

  		Player.prototype.render = function(context) {
  			this.paddle.render(context);
  		};

  		Player.prototype.update = function(tableHeight) {
  			var upArrow = 38, 
  				downArrow  = 40,
  				key,
  				value;

  			// paddle is not moving unless key is pressed
  			this.paddle.xSpeed = 0;
  			this.paddle.ySpeed = 0;

  			// move paddle if key is pressed
  			for (key in keysDown) {
  				value = Number(key);
  				if (value === upArrow) {
  					this.paddle.move(0, -4, tableHeight);
  				}
  				else if (value === downArrow) {
  					this.paddle.move(0, 4, tableHeight);
  				}
  			}
  		};

  		// computer
  		function Computer() {
  			this.paddle = new Paddle(10, 150, 10, 50);
  		}

  		Computer.prototype.render = function(context) {
  			this.paddle.render(context);
  		};

  		Computer.prototype.update = function(ball) {
  			var paddleCenter = this.paddle.y + (this.paddle.height / 2),
  				diff = ball.y - paddleCenter,
  				speed;

  			// set speed
  			if (diff < -3) {
  				speed = -4;  // max speed up
  			}
  			else if (diff > 3) {
  				speed = 4;	// max speed down
  			}
  			else {
  				speed = diff;  // move faster if farthur away
  			}

  			// move paddle
  			this.paddle.move(0, speed);
  		};

  		// ball
  		function Ball(x, y) {
  			this.x = x;
  			this.y = y;
  			this.xSpeed = 3;
  			this.ySpeed = 0;
  			this.radius = 5;
  		}

  		Ball.prototype.render = function(context) {
  			context.beginPath();
  			context.arc(this.x, this.y, this.radius, 2* Math.PI, false);
  			context.fillStyle = '#000000';
  			context.fill();
  		};

  		Ball.prototype.update = function(leftPaddle, rightPaddle, tableWidth, tableHeight) {
  			var ballLeft = this.x - this.radius,
  				ballRight = this.x + this.radius,
  				ballTop = this.y - this.radius,
  				ballBottom = this.y + this.radius,
  				leftPaddleTop = leftPaddle.y,
  				leftPaddleBottom = leftPaddle.y + leftPaddle.height,
  				leftPaddleFace = leftPaddle.x + leftPaddle.width,
  				rightPaddleTop = rightPaddle.y,
  				rightPaddleBottom = rightPaddle.y + rightPaddle.height,
  				rightPaddleFace = rightPaddle.x;

  			// update ball position
  			this.x += this.xSpeed;
  			this.y += this.ySpeed;

  			// check if hitting top
  			if (ballTop < 0) {
  				this.y = this.radius;
  				this.ySpeed = -this.ySpeed;
  			}

  			// check if hitting bottom
  			if (ballBottom > tableHeight) {
  				this.y = tableHeight - this.radius;
  				this.ySpeed = -this.ySpeed;
  			}

  			// check if right player scores
  			if (ballLeft < 0) {
  				this.xSpeed = -3;
  				this.ySpeed = 1;
  				this.x = tableWidth / 2;
  				this.y = tableHeight / 2;
          $rootScope.$broadcast('score-right');
  			}
        // check if left player / computer scores
        if (ballRight > tableWidth) {
          this.xSpeed = 3;
          this.ySpeed = 1;
          this.x = tableWidth / 2;
          this.y = tableHeight / 2;
          $rootScope.$broadcast('score-left');
        }

  			// check if left paddle was hit
  			else if (ballLeft < leftPaddleFace && this.y > leftPaddleTop && this.y < leftPaddleBottom) {
  				this.xSpeed = 3;
  				this.ySpeed += (leftPaddle.ySpeed / 4);
  				this.x += this.xSpeed;
  			}

  			// check if right paddle was hit
  			else if (ballRight > rightPaddleFace && this.y > rightPaddleTop && this.y < rightPaddleBottom) {
  				this.xSpeed = -3;
  				this.ySpeed += (rightPaddle.ySpeed / 4);
  				this.x += this.xSpeed;
  			}

  		};

  		var player = new Player();
  		var computer = new Computer();
  		var ball = new Ball(300, 175);
  		var keysDown = {};

  		window.addEventListener('keydown', function(event) {
  			keysDown[event.keyCode] = true;
  		});

  		window.addEventListener('keyup', function(event) {
  			delete keysDown[event.keyCode];
  		});

	    return {
	    	restrict: 'A',
	    	link: function(scope, element) {
	    		var context = element[0].getContext('2d'),
	    			width = element.prop('width'),
	    			height = element.prop('height');
	    		 
	    		var step = function() {
	    			update();
	    			render();
	    			animate(step);
	    		};

	    		var update = function() {
	    			player.update(height);
	    			computer.update(ball);
	    			ball.update(computer.paddle, player.paddle, width, height);
	    		};

	    		var render = function() {
	    			context.fillStyle = '#FF00FF';
	    			context.fillRect(0, 0, width, height);
	    			player.render(context);
	    			computer.render(context);
	    			ball.render(context);
	    		};

	    		// start animation loop
	    		animate(step);
	    	}
	    };
	  }
  ]);