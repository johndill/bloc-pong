'use strict';

angular.module('blocPongApp')
  .directive('pongTable',
  	function () {
	    return {
	    	restrict: 'A',
	    	link: function(scope, element) {
	    		var ctx = element[0].getContext('2d');

	    		// variable that decides if something should be drawn on canvas
	    		var drawing = false;

	    		// current and previous x and y coords
	    		var lastX, lastY, currentX, currentY;

	    		element.bind('mousedown', function(e) {
	    			if (e.offsetX !== undefined) {
	    				lastX = e.offsetX;
	    				lastY = e.offsetY;
	    			} 
	    			else {
	    				lastX = e.layerX - e.currentTarget.offsetLeft;
	    				lastY = e.layerY - e.currentTarget.offsetTop;
	    			}

	    			// begins new line
	    			ctx.beginPath();

	    			drawing = true;
	    		});

	    		element.bind('mousemove', function(e) {
	    			if (drawing) {
	    				// get current mouse position
	    				if (e.offsetX !== undefined) {
	    					currentX = e.offsetX;
	    					currentY = e.offsetY;
	    				}
	    				else {
	    					currentX = e.layerX - e.currentTarget.offsetLeft;
	    					currentY = e.layerY - e.currentTarget.offsetTop;
	    				}

	    				draw(lastX, lastY, currentX, currentY);

	    				// set last coords to current
	    				lastX = currentX;
	    				lastY = currentY;
	    			}
	    		});

	    		element.bind('mouseup', function() {
	    			// stop drawing
	    			drawing = false;
	    		});

	    		element.bind('dblclick', function() {
	    			reset();
	    			return false;
	    		});

	    		// reset canvas
	    		function reset() {
	    			element[0].width = element[0].width;
	    		}

	    		function draw(lX, lY, cX, cY) {
	    			// line from
	    			ctx.moveTo(lX, lY);
	    			// to
	    			ctx.lineTo(cX, cY);
	    			// color
	    			ctx.strokeStyle = '#4bf';
	    			// draw line
	    			ctx.stroke();
	    		}
	    	}
	    };
	  }
  );