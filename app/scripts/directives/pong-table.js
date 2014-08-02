'use strict';

angular.module('blocPongApp')
  .directive('pongTable',
  	function () {
  		var animate = window.requestAnimationFrame ||
  			window.webkitRequestAnimationFrame ||
  			window.mosRequestAnimationFrame ||
  			function (callback) { window.setTimeout(callback, 1000/60) };

  		// paddle
  		function Paddle(x, y, width, height) {
  			this.x = x;
  			this.y = y;
  			this.width = width;
  			this.height = height;
  			this.x_speed = 0;
  			this.y_speed = 0;
  		}

  		Paddle.prototype.render = function(context) {
  			context.fillStyle = '#0000FF';
  			context.fillRect(this.x, this.y, this.width, this.height);
  		};

  		// player
  		function Player() {
  			this.paddle = new Paddle(580, 175, 10, 50);
  		}

  		Player.prototype.render = function(context) {
  			this.paddle.render(context);
  		};

  		// computer
  		function Computer() {
  			this.paddle = new Paddle(10, 175, 10, 50);
  		}

  		Computer.prototype.render = function(context) {
  			this.paddle.render(context);
  		};

  		// ball
  		function Ball(x, y) {
  			this.x = x;
  			this.y = y;
  			this.x_speed = 3;
  			this.y_speed = 0;
  			this.radius = 5;
  		}

  		Ball.prototype.render = function(context) {
  			context.beginPath();
  			context.arc(this.x, this.y, this.radius, 2* Math.PI, false);
  			context.fillStyle = '#000000';
  			context.fill();
  		};

  		Ball.prototype.update = function(leftPaddle, rightPaddle, tableWidth, tableHeight) {
  			this.x += this.x_speed;
  			this.y += this.y_speed;

  			var ballLeft = this.x - this.radius,
  				ballRight = this.x + this.radius,
  				ballTop = this.y + this.radius,
  				ballBottom = this.y - this.radius,
  				leftPaddleTop = leftPaddle.y,
  				leftPaddleBottom = leftPaddle.y + leftPaddle.height,
  				leftPaddleFace = leftPaddle.x + leftPaddle.width,
  				rightPaddleTop = rightPaddle.y,
  				rightPaddleBottom = rightPaddle.y + rightPaddle.height,
  				rightPaddleFace = rightPaddle.x;

  			// check if hitting top
  			if (ballTop < 0) {
  				this.x = this.radius;
  				this.x_speed = -this.x_speed;
  			}

  			// check if hitting bottom
  			if (ballBottom > tableHeight) {
  				this.x = tableHeight - this.radius;
  				this.x_speed = -this.x_speed;
  			}

  			// check if hitting left or right wall (point scored)
  			if (ballLeft < 0 || ballRight > tableWidth) {
  				this.x_speed = 3;
  				this.y_speed = 0;
  				this.x = tableWidth / 2;
  				this.y = tableHeight / 2;
  			}

  			// check if left paddle was hit
  			if (ballLeft < leftPaddleFace && this.y > leftPaddleTop && this.y < leftPaddleBottom) {
  				this.x_speed = 3;
  				this.y_speed += (leftPaddle.y_speed / 2);
  				this.x += this.x_speed;
  			}

  			// check if right paddle was hit
  			if (ballRight > rightPaddleFace && this.y > rightPaddleTop && this.y < rightPaddleBottom) {
  				this.x_speed = -3;
  				this.y_speed += (rightPaddle.y_speed / 2);
  				this.x += this.x_speed;
  			}

  		};

  		var player = new Player();
  		var computer = new Computer();
  		var ball = new Ball(300, 200);

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
  );