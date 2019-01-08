class BoardState {
  constructor() {
    this.rows = 8;
    this.cols = 12;
    this.cells = [];
    for (let i = 0; i < this.rows * this.cols; ++i) {
      this.cells.push(null);
    }
  }

  randomize() {
    for (let i = 0; i < this.cells.length; ++i) {
      if (Math.random() < 0.3) {
        this.cells[i] = null;
      } else {
        const choices = ['A', 'B', 'C', 'D', 'E', 'F'];
        this.cells[i] = choices[Math.floor(Math.random() * (choices.length - 1e-4))];
      }
    }
  }

  get(row, col) {
    return this.cells[this.index(row, col)];
  }

  set(row, col, val) {
    this.cells[this.index(row, col)] = val;
  }

  index(row, col) {
    return row * this.cols + col;
  }
}