class App {
  constructor() {
    const state = new BoardState();
    state.randomize();
    this.board = new BoardView(state);
  }
}

window.addEventListener('load', () => {
  window.app = new App();
});
