var Coord = function(x,y){
  this.x = x;
  this.y = y;
};

Coord.prototype.plus = function(coord_obj){
  newX = this.x + coord_obj.x;
  newY = this.y + coord_obj.y;

  return new Coord(newX, newY);
}

var Snake = function(){
  this.dir = 'W';
  this.segments = [new Coord(8,8)];
};

Snake.prototype.move = function(){
  var snake = this;
  var head = _(this.segments).first();
  var headDirction = snake.dirToCoord();
  var newHead = head.plus(headDirction);
  
  snake.segments.pop();
  snake.segments.unshift(newHead);
}

Snake.prototype.grow = function () {
  var snake = this;
  var head = _(this.segments).first();
  var headDirction = snake.dirToCoord();
  var newHead = head.plus(headDirction);
  
  // snake.segments.pop();
  snake.segments.unshift(newHead);
}

Snake.prototype.inBounds = function(){
  return this.segments.every(function(segment, index1) {
    if (segment.x >= 15 || segment.x < 0 || segment.y >= 15 || segment.y < 0) {
      // console.log("out of bounds")
      return false
    }
    else {
      // console.log("in bounds")
      return true;
    }
  })
}

Snake.prototype.eatingSelf = function(){
  var that = this;
  return this.segments.some(function(segment,index1) {
    return that.segments.some(function(segment2, index2){
      if ((index1 !== index2) && (segment.x === segment2.x && segment.y === segment2.y)) {
        // console.log("eating self");
        return true;
      }
      else {
        return false;
      }
    })
  })
}

Snake.prototype.turn = function(dir) {
  this.dir = dir;
}

Snake.prototype.dirToCoord = function(){
  switch(this.dir)
  {
  case 'N':
    return new Coord(-1,0);
  case 'E':
    return new Coord(0,1);
  case 'S':
    return new Coord(1,0);
  case 'W':
    return new Coord(0,-1);
  }
}


var Board = function() {
  this.snake = new Snake();
  this.grid = this.makeGrid();

  this.addApple();
  this.apple = new Coord(5,5)
}



Board.prototype.makeGrid = function () {
  return _.times(15, function () {
    return _.times(15, function () {
      return $('<div class="cell"></div>')
    });
  });
};

Board.prototype.addApple = function (){
  var that = this;
  coord = new Coord((Math.floor(Math.random()*15)), (Math.floor(Math.random()*15)))
  // console.log(coord)
  if (this.snake.segments.some (function (segment) {
    return (segment.x == coord.x && segment.y == coord.y)
  })) {
    that.addApple()
  }

  else this.apple = coord
}

Board.prototype.checkApple = function () {
  var that = this;
  this.snake.segments.forEach (function (segment) {
    if (segment.x == that.apple.x && segment.y == that.apple.y) {
      that.addApple()
      that.snake.grow()
    }
  })
}

Board.prototype.updateGrid = function () {
  var that = this;
  grid = this.makeGrid(); // Clear grid
  grid[this.apple.x][this.apple.y] = "a"
  this.checkApple();
  this.snake.segments.forEach (function (segment) {
    // console.log(segment)
    grid[segment.x][segment.y] = "s"
  })


  return this.grid = grid;
}

Board.prototype.render = function () {
  this.grid = this.updateGrid();
  return _(this.grid).map(function (row) { return row.join(""); }).join("\n");

}
