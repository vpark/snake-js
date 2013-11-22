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
    },500)
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

  View.prototype.step = function(){
    // console.log(this.board.snake.isAlive())
    if(this.board.snake.inBounds() && !this.board.snake.eatingSelf()) {
      this.board.snake.move();
      var str = this.board.render()
      this.$el.html("<div>" + str + "</div>")
    } else {
      alert("You've died!");
      location.reload();
    }

  }


  view = new View(".board");
  view.start();

});