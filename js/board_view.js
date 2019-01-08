class BoardView {
  constructor(state) {
    this.state = state;
    this.blocks = new BlocksView(this);
    this.connections = new ConnectionView(this);
    this.update();
  }

  update() {
    this.blocks.update();
    this.connections.update();
  }
}

class BlocksView {
  constructor(board) {
    this.board = board;
    this.element = document.getElementById('blocks');
    this.selected = [-1, -1];
    this.onSelectPath = (row1, col1, row2, col2) => null;
  }

  update() {
    this.element.innerHTML = '';
    this.cells = [];
    const cellWidth = this.element.offsetWidth / this.board.state.cols;
    const cellHeight = this.element.offsetHeight / this.board.state.rows;
    for (let i = 0; i < this.board.state.rows; ++i) {
      for (let j = 0; j < this.board.state.cols; ++j) {
        const cell = document.createElement('div');
        cell.className = 'block';
        cell.textContent = this.board.state.get(i, j) || '';
        const selected = (this.selected[0] === i && this.selected[1] === j);
        if (!this.board.state.get(i, j)) {
          cell.className += ' block-empty';
          if (selected) {
            // The selected cell was deleted.
            this.selected = [-1, -1];
          }
        } else {
          if (selected) {
            cell.className += ' block-selected'
          }
          cell.addEventListener('click', () => this.select(i, j));
        }
        cell.style.left = (cellWidth * j).toFixed(2) + 'px';
        cell.style.top = (cellHeight * i).toFixed(2) + 'px';
        cell.style.width = cellWidth.toFixed(2) + 'px';
        cell.style.height = cellHeight.toFixed(2) + 'px';
        cell.style.lineHeight = cellHeight.toFixed(2) + 'px';
        this.element.appendChild(cell);
        this.cells.push(cell);
      }
    }
  }

  select(i, j) {
    if (this.selected[0] === i && this.selected[1] === j) {
      return;
    }
    if (this.selected[0] < 0) {
      this.selected = [i, j];
      this.cells[this.board.state.index(i, j)].className += ' block-selected';
      return;
    }
    const oldCell = this.cells[this.board.state.index(this.selected[0], this.selected[1])];
    oldCell.className = oldCell.className.replace(' block-selected', '');
    this.cells[this.board.state.index(i, j)].className += ' block-selected';
    const oldSel = this.selected;
    this.selected = [i, j];
    this.onSelectPath(oldSel[0], oldSel[1], i, j);
  }
}

class ConnectionView {
  constructor(board) {
    this.board = board;
    this.canvas = document.getElementById('connections');
  }

  update() {
    // TODO: draw the connections.
  }
}
