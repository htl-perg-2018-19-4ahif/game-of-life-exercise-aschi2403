window.onload = () => {
  const cellSize = 4;
  const boardCellSize = 200;
  const boardSize = boardCellSize * cellSize;
  let aliveCount = 0;
  const maxAlive = Math.floor((boardCellSize * boardCellSize) * 0.03);

  // Get reference to canvas
  const canvas = <HTMLCanvasElement>document.getElementById('canvas');
  canvas.width = canvas.height = boardSize;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';

  //initializing gameboard
  
  let cells = new Array(boardCellSize);
  for(let x : number = 0; x < boardCellSize; x++) {
    console.log('cell');
    cells[x] = new Array(boardCellSize);
    for(let y : number = 0; y < boardCellSize; y++) {
      let state: boolean = getRandomCellState();
      let cellTemp: Cell = {alive: state, x: x, y: y};
      console.log('cell: ' + cellTemp);
      cells[x][y].push(cellTemp);
    }
  }

  // Call 'draw' function whenever browser renders a frame on the screen
  window.requestAnimationFrame(draw);

  function draw() {
    // Demo code showing how to draw in the canvas
    //ctx.clearRect(0, 0, boardSize, boardSize);
    //ctx.fillRect(10, 10, 4, 4);

    for(let x: number = 0; x < boardCellSize; x++) {
      for(let y: number = 0; y < boardCellSize; y++) {
        let cellTemp: Cell = cells[x][y];
        let neighbours: number = countNeighbors(cellTemp);
        if(cellTemp.alive) {
            if(neighbours < 2 || neighbours > 3) {
              cellTemp.alive = false;
              killCell(x, y);
            }
        } else if (neighbours == 3) {
          cellTemp.alive = true;
          setCellAlive(x, y);
        }
      }
    }
    //console.log(cells[10][20]);
    //console.log(countNeighbors(cells[10][20]));

    window.requestAnimationFrame(draw);
  }

  function countNeighbors(cell: Cell): number {
    let neighbours = 0;
    if(cells[cell.x - 1][cell.y - 1].alive) neighbours++;
    if(cells[cell.x][cell.y - 1].alive) neighbours++;
    if(cells[cell.x + 1][cell.y - 1].alive) neighbours++;
    if(cells[cell.x - 1][cell.y].alive) neighbours;
    if(cells[cell.x + 1][cell.y].alive) neighbours++;
    if(cells[cell.x - 1][cell.y +1].alive) neighbours++;
    if(cells[cell.x][cell.y + 1].alive) neighbours++;
    if(cells[cell.x + 1][cell.y + 1].alive) neighbours++;
    return neighbours;
  }

  function getRandomCellState(): boolean {
    let state : number = Math.floor( Math.random() * 2);
    if(state == 1 && aliveCount <= maxAlive) {
      aliveCount++;
      return true;
    }
  }

  function setCellAlive(x: number, y: number) {
    ctx.fillRect(x, y, cellSize, cellSize);
  }

  function killCell(x: number, y: number) {
    ctx.clearRect(x, y, cellSize, cellSize);
  }

  class Cell {
    alive: boolean;
    x : number;
    y : number;
  }
};