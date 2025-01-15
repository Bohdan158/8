const chessboard = document.getElementById('chessboard');
const queensPositionsElement = document.getElementById('queensPositions');
let queens = [];

// Створюємо шахівницю 8x8
for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
        const cell = document.createElement('div');
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.addEventListener('click', () => placeQueen(row, col));
        chessboard.appendChild(cell);
    }
}

// Массив для збереження позицій ферзів
function placeQueen(row, col) {
    if (queens.length < 8 && !isAttacking(row, col)) {
        const queen = document.createElement('div');
        queen.id = 'queen';
        const cell = chessboard.children[row * 8 + col];
        cell.appendChild(queen);

        queens.push({ row, col });
        updateQueensPositions();
    } else {
        alert('Ця клітинка або вже зайнята ферзем, або ферзь може бити інших!');
    }
}

// Перевірка, чи не атакує ферзь
function isAttacking(row, col) {
    for (const queen of queens) {
        if (queen.row === row || queen.col === col || Math.abs(queen.row - row) === Math.abs(queen.col - col)) {
            return true;
        }
    }
    return false;
}

// Оновлення позицій ферзів
function updateQueensPositions() {
    const positions = queens.map(queen => `(${queen.row + 1}, ${String.fromCharCode(65 + queen.col)})`).join(', ');
    queensPositionsElement.textContent = positions || 'Немає ферзів на дошці.';
}

// Алгоритм для автоматичного розв\'язку задачі 8 ферзів
function solve8Queens() {
    queens = [];
    let attempts = 0;

    function solve(row) {
        if (row === 8) return true;

        for (let col = 0; col < 8; col++) {
            if (!isAttacking(row, col)) {
                queens.push({ row, col });
                updateQueensPositions();
                if (solve(row + 1)) return true;
                queens.pop();
            }
        }
        return false;
    }

    if (solve(0)) {
        alert('Задача розв\'язана!');
    } else {
        alert('Не вдалося розв\'язати задачу.');
    }
}
