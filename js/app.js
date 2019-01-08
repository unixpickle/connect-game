class App {
  constructor() {
    const state = new BoardState();
    state.randomize();
    this.board = new BoardView(state);
    this.board.onSelectPath = (row1, col1, row2, col2) => {
      if (state.searchPath(row1, col1, row2, col2)) {
        this.board.state.set(row1, col1, null);
        this.board.state.set(row2, col2, null);
        this.board.update();
        if (!this.board.state.hasMoves()) {
          alert('You win!');
        }
      }
    };
  }
}

window.addEventListener('load', () => {
  window.app = new App();
});
