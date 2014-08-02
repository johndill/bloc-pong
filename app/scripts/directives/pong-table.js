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

  		var player = new Player();
  		var computer = new Computer();
  		var ball = new Ball(300, 200);

	    return {
	    	restrict: 'A',
	    	link: function(scope, element) {
	    		var context = element[0].getContext('2d');

	    		var step = function() {
	    			update();
	    			render();
	    			animate(step);
	    		};

	    		var update = function() {

	    		};

	    		var render = function() {
	    			context.fillStyle = '#FF00FF';
	    			context.fillRect(0, 0, element.prop('width'), element.prop('height'));
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