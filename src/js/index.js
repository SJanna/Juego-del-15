window.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.querySelector('#game');
    const cells = document.querySelectorAll('.cell');
    const startButton = document.querySelector('#start-button');
    const shuffleButton = document.querySelector('#shuffle-button');
    const movesCounter = document.querySelector('#moves-counter');
    const timer = document.querySelector('#timer');
    let emptyCellIndex = 15;
    let moves = 0;
    let seconds = 0;
    let interval;
  
    function initGame() {
      shuffleBoard();
      moves = 0;
      seconds = 0;
      movesCounter.textContent = `Movimientos: ${moves}`;
      timer.textContent = `Tiempo: ${seconds} segundos`;
      clearInterval(interval);
      interval = setInterval(() => {
        seconds++;
        timer.textContent = `Tiempo: ${seconds} segundos`;
      }, 1000);
    }
  

    function shuffleBoard() {
        const shuffledIndices = shuffleArray(Array.from(Array(15).keys()));
        cells.forEach((cell, index) => {
          if (index === emptyCellIndex) {
            cell.classList.add('empty');
          } else {
            cell.classList.remove('empty');
            cell.textContent = shuffledIndices[index]+1;
          }
        });
      }
      
      // Función para mezclar un array
      function shuffleArray(array) {
        const shuffledArray = array.slice();
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
      }
  
    function moveCell(index) {
      const emptyCell = cells[emptyCellIndex];
      const cell = cells[index];
      const rowDiff = Math.abs(Math.floor(index / 4) - Math.floor(emptyCellIndex / 4));
      const colDiff = Math.abs(index % 4 - emptyCellIndex % 4);
      if (rowDiff + colDiff === 1) {
        [cell.textContent, emptyCell.textContent] = [emptyCell.textContent, cell.textContent];
        [cell.classList, emptyCell.classList] = [emptyCell.classList, cell.classList];
        emptyCellIndex = index;
        moves++;
        movesCounter.textContent = `Movimientos: ${moves}`;
        if (checkWin()) {
          clearInterval(interval);
          alert(`¡Ganaste en ${moves} movimientos y ${seconds} segundos!`);
        }
      }
    }
  
    function checkWin() {
        // Obtenemos los valores actuales de las celdas en un arreglo
        let cellValues = [];
        for (let i = 0; i < cells.length; i++) {
          cellValues.push(parseInt(cells[i].textContent));
        }
      
        // Creamos el arreglo ordenado y lo comparamos con el arreglo actual
        let sortedValues = Array.from({ length: cells.length-1 }, (_, i) => i + 1);
        sortedValues.push(null)
        console.log(JSON.stringify(cellValues), JSON.stringify(sortedValues));
        if (JSON.stringify(cellValues) === JSON.stringify(sortedValues)) {
          // El jugador ha ganado
          return true;
        } else {
          // El juego continúa
          return false;
        }
      }      
  
    startButton.addEventListener('click', initGame);
    cells.forEach((cell, index) => {
      cell.addEventListener('click', () => moveCell(index));
    });
  });
  