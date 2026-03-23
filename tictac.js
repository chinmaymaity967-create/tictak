const board = document.getElementById("board");
    const statusText = document.getElementById("status");

    let currentPlayer = "X";
    let cells = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    function createBoard() {
      board.innerHTML = "";
      cells.forEach((cell, index) => {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.dataset.index = index;
        div.innerText = cell;
        div.addEventListener("click", handleClick);
        board.appendChild(div);
      });
    }

    function handleClick(e) {
      const index = e.target.dataset.index;

      if (cells[index] !== "" || !gameActive) return;

      cells[index] = currentPlayer;
      e.target.innerText = currentPlayer;

      if (checkWinner()) {
        statusText.innerText = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
      }

      if (!cells.includes("")) {
        statusText.innerText = "It's a Draw!";
        gameActive = false;
        return;
      }

      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusText.innerText = `Player ${currentPlayer}'s Turn`;
    }

    function checkWinner() {
      const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
      ];

      return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return cells[a] &&
               cells[a] === cells[b] &&
               cells[a] === cells[c];
      });
    }

    function restartGame() {
      cells = ["", "", "", "", "", "", "", "", ""];
      currentPlayer = "X";
      gameActive = true;
      statusText.innerText = "Player X's Turn";
      createBoard();
    }

    createBoard();