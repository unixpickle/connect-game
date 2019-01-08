class BoardState {
  constructor() {
    this.rows = 8;
    this.cols = 12;
    this.cells = [];
    for (let i = 0; i < this.rows * this.cols; ++i) {
      this.cells.push(null);
    }
  }

  hasMoves() {
    for (let i = 0; i < this.rows; ++i) {
      for (let j = 0; j < this.cols; ++j) {
        if (!this.get(i, j)) {
          continue;
        }
        for (let i1 = 0; i1 < this.rows; ++i1) {
          for (let j1 = 0; j1 < this.cols; ++j1) {
            if (i1 == i && j1 == j) {
              continue;
            }
            if (this.searchPath(i, j, i1, j1)) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  searchPath(row1, col1, row2, col2) {
    if (this.get(row1, col1) != this.get(row2, col2)) {
      return false;
    }
    const visited = {};
    const queue = [];
    const pushIfClear = (i, j) => {
      if (!this.get(i, j) && !visited[[i, j]]) {
        queue.push([i, j]);
        visited[[i, j]] = true;
      }
    };
    const push = (i, j) => {
      if (!visited[[i, j]]) {
        queue.push([i, j]);
        visited[[i, j]] = true;
      }
    };
    const pushNeighbors = (i, j) => {
      if (!this.get(i, j)) {
        push(i + 1, j);
        push(i - 1, j);
        push(i, j + 1);
        push(i, j - 1);
      }
    };
    pushIfClear(row1 + 1, col1);
    pushIfClear(row1 - 1, col1);
    pushIfClear(row1, col1 + 1);
    pushIfClear(row1, col1 - 1);
    while (queue.length > 0) {
      const next = queue.shift();
      if (next[0] === row2 && next[1] === col2) {
        return true;
      }
      pushNeighbors(next[0], next[1]);
    }
    return false;
  }

  randomize() {
    do {
      for (let i = 0; i < this.cells.length; ++i) {
        if (Math.random() < 0.3) {
          this.cells[i] = null;
        } else {
          const choices = ['A', 'B', 'C', 'D', 'E', 'F'];
          this.cells[i] = choices[Math.floor(Math.random() * (choices.length - 1e-4))];
        }
      }
    } while (!this.hasMoves());
  }

  get(row, col) {
    if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
      return 'INVALID';
    }
    return this.cells[this.index(row, col)];
  }

  set(row, col, val) {
    this.cells[this.index(row, col)] = val;
  }

  index(row, col) {
    return row * this.cols + col;
  }
}