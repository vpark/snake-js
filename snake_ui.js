$(function(){

  var View = function(element){
    this.$el = $(element);
  };

  View.prototype.start = function(){
    var that = this;
    this.board = new Board();
    $("*").keypress(function(e){
      that.handleKeyEvents(e);
    })
    setInterval(function(){
      that.step();
      // ('rerendered');
    },150)
  }

  View.prototype.handleKeyEvents = function(e){
    switch(e.keyCode)
    {
    case 97:
      this.board.snake.turn('W');
      break;
    case 119:
      this.board.snake.turn('N');
      break;
    case 100:
      this.board.snake.turn('E');
      break;
    case 115:
      this.board.snake.turn('S');
      break;
    }
  }
  
  View.prototype.render = function() {
    var view = this;
    var board = view.board;
    
    function buildBoardDivs() {
      return _.times(15, function () {
        return _.times(15, function () {
          return $('<div class="cell"></div>');
        });
      });
    }
    
    var cellsMatrix = buildBoardDivs();
    _(board.snake.segments).each(function (seg) {
      cellsMatrix[seg.x][seg.y].attr('id','snake');
      (board.snake.segments);
    });
    
    var apple = board.apple;
    cellsMatrix[apple.x][apple.y].addClass("apple");
    
    this.$el.empty();
    _(cellsMatrix).each(function (row) {
      var $rowEl = $('<div class="row"></div>');
      _(row).each(function ($cell) { $rowEl.append($cell) });
      view.$el.append($rowEl);
    });
  }
  
  View.prototype.step = function(){
    // (this.board.snake.isAlive())
    if(this.board.snake.inBounds() && !this.board.snake.eatingSelf()) {
      this.board.checkApple();
      this.board.snake.move();
      this.render();
    } else {
      alert("You've died!");
      location.reload();
    }

  }


  view = new View(".board");
  view.start();

});