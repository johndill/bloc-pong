'use strict';

/*global d3*/

angular.module('blocPongApp')
  .directive('pongTable', ['$log', function ($log) {
    var table = function() {
  		var width = 600, //window.innerWidth,  // width of game board
        height = 400,//window.innerHeight,  // height of game board
        unit = { width: width / 20, height: height / 15 },  // normalize game to different screens
        keysDown = {},  // object that holds pressed keys
        acceleration = 0, // vertical acceleration of y paddle
        color = d3.scale.category10(),  // d3 color pallete
        nodes = [], // array of nodes for d3 force layout
        force = d3.layout.force(),   // d3 force layout
        svg = d3.select('.pong-table-container').append('svg'),  // d3 svg element
        nodeDrag = d3.behavior.drag().on('drag', function(d) {
          // d3 node drag behavior
          d.px += d3.event.dx;
          d.py += d3.event.dy;
          d.x += d3.event.dx;
          d.y += d3.event.dy;
        }),
        bounds = function(rect) {
          // calculates boundaries of rectangle from x, y, width, height and origin
          // where origin is reference point in parent coortinate system
          return {
            left: rect.x - rect.width * rect.origin.x,
            right: rect.x + rect.width * (1 - rect.origin.x),
            top: rect.y - rect.height * rect.origin.y,
            bottom: rect.y + rect.height * (1 - rect.origin.y)
          };
        },
        PongNode = function(a) {
          var args = a || {};
            return {
            x: args.x || 0,
            y: args.y || 0,
            width: args.width || unit.width,
            height: args.height || unit.height,
            px: args.px || 0,
            py: args.py || 0,
            rx: args.rx || 0,
            ry: args.ry || 0,
            origin: args.origin || { x: 0.5, y: 0.5 },
            constrain: args.constrain || { x: false, y: false },
            fixed: args.fixed || false,
            name: args.name || 'pong-node',
            bounds: function() { return bounds(this); },
            fillColor: '#ddd'
          };
        },
        plusOrMinus = function() {
          return Math.random() < 0.5 ? -1 : 1;
        },
        ball = new PongNode({
          x: width / 2,
          y: height / 2,
          px: width / 2 + unit.width / 2,
          py: height / 2 + parseInt(Math.random()*15, 10)-7,
          rx: unit.width / 2,
          ry: unit.height / 2,
          name: 'ball',
          fillColor: '#bbb'
        }),
        leftPaddle = new PongNode({
          x: unit.width,
          y: height / 2,
          height: 3 * unit.height,
          width: unit.width,
          px: unit.width,
          py: height / 2,
          constrain: { x: unit.width, y: false },
          name: 'leftPaddle'
        }),
        rightPaddle = new PongNode({
          x: width - unit.width,
          y: height / 2,
          height: 3 * unit.height,
          width: unit.width,
          px: width - unit.width,
          py: height / 2,
          constrain: { x: width - unit.width, y: false },
          fixed: true,
          name: 'rightPaddle'
        });

      ball.init = function() {
        this.x = width / 2;
        this.y = height / 2;
        this.px = width / 2 + plusOrMinus() * unit.width / 4;
        this.py = height / 2 + plusOrMinus() * parseInt(Math.random()*5);
      };

      // add nodes
      nodes.push(ball, leftPaddle, rightPaddle);
      $log.log(nodes); 

      // configure force layout
      force.gravity(0)
        .friction(1)
        .charge(function(d, i) { return i ? 0 : 100 * unit.width; })
        .nodes(nodes)
        .size([width, height])
        .on('tick', function() {
          collide();
          svg.selectAll('rect')
            .attr('x', function(d) { return d.bounds().left; })
            .attr('y', function(d) { return d.bounds().top; });
        })
        .start();

      // convfigure svg
      svg.attr('width', width)
        .attr('height', height)
        .attr('class', 'pong-table');

      // add nodes to svg
      svg.selectAll('rect')
        .data(nodes)
        .enter().append('rect')
        .attr('width', function(d) { return d.width; })
        .attr('height', function(d) { return d.height; })
        .attr('rx', function(d) { return d.rx; })
        .attr('ry', function(d) { return d.ry; })
        .style('fill', function(d, i) { return d.fillColor; }) //color(i % 5); })
        .attr('class', function(d) { return d.name; });

      // add drag behavior to right paddle
      d3.select('.rightPaddle').call(nodeDrag);

      // listen for keys pressed
  		window.addEventListener('keydown', function(event) {
  			keysDown[event.keyCode] = true;
  		});

  		window.addEventListener('keyup', function(event) {
  			delete keysDown[event.keyCode];
        acceleration = 0;
  		});

      // analyze position of each node and process any collisions
      function collide() {
        var i = 0,
            n = nodes.length,
            dy,
            max;

        // move player paddle based on keyboard input
        if (keysDown[38]) {
          acceleration += 1;
          rightPaddle.py -= 3 + acceleration;
        }
        if (keysDown[40]) {
          acceleration += 1;
          rightPaddle.py += 3 + acceleration;
        }

        // loop through all nodes and apply constraints
        while (++i < n) {
          if (nodes[i].constrain.x) {
            nodes[i].x = nodes[i].constrain.x;
            nodes[i].px = nodes[i].constrain.x;
          }
          if (nodes[i].constrain.y) {
            nodes[i].y = nodes[i].constrain.y;
            nodes[i].py = nodes[i].constrain.y;
          }

          // top and bottom wall
          if (nodes[i].bounds().top < 0) {
            nodes[i].y = nodes[i].height / 2;
            nodes[i].py = nodes[i].height / 2;
          }
          if (nodes[i].bounds().bottom > height) {
            nodes[i].y = height - nodes[i].height / 2;
            nodes[i].py = height - nodes[i].height / 2; 
          }
        }
              
        // ball hits left paddle
        if (ball.bounds().left < leftPaddle.bounds().right) {
          dy = ball.y - leftPaddle.y;
          max = leftPaddle.height / 2 + ball.height / 2;
          if (Math.abs(dy) <= max) {
            ball.px = ball.x - unit.width / 4;
            ball.py = ball.y - dy / max * unit.height;
            force.resume();
          }
        }

        // ball hits right paddle
        if (ball.bounds().right > rightPaddle.bounds().left) {
          dy = ball.y - rightPaddle.y;
          max = rightPaddle.height / 2 + ball.height / 2;
          if (Math.abs(dy) <= max) {
            ball.px = ball.x + unit.width / 4;
            ball.py = ball.y - dy / max * unit.height;
            force.resume();
          }
        }

        // ball hits top or bottom wall
        if (ball.bounds().top < 0 || ball.bounds().bottom > height) {
          ball.py = ball.y + (ball.y - ball.py);
          force.resume();
        }
        
        // score - ball hits left or right wall
        if (ball.bounds().left < 0 || ball.bounds().right > width) {
          ball.init();
          force.resume();
        }
        
      }
    };

    return {
    	restrict: 'A',
      replace: false,
    	link: function() {
    		// start force layout
    		table();
    	}
    };
  }]);