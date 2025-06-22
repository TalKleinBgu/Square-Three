class SquareThree {
    constructor(hotBlocking = true) {
        this.board = Array(16).fill('.');
        this.lastMove = null;
        this.hotBlocking = hotBlocking;
    }

    coord(idx) {
        return [Math.floor(idx / 4), idx % 4];
    }

    index(row, col) {
        return row * 4 + col;
    }

    isAdjacent(a, b) {
        if (a === null || b === null) return false;
        const [r1, c1] = this.coord(a);
        const [r2, c2] = this.coord(b);
        return (Math.abs(r1 - r2) === 1 && c1 === c2) || 
                (Math.abs(c1 - c2) === 1 && r1 === r2);
    }

    legalMoves() {
        const moves = [];
        for (let i = 0; i < 16; i++) {
            if (this.board[i] === '.') {
                if (!this.hotBlocking || this.lastMove === null || !this.isAdjacent(this.lastMove, i)) {
                    moves.push(i);
                }
            }
        }
        return moves;
    }

    lineWin(player) {
        // Check rows and columns
        for (let r = 0; r < 4; r++) {
            if (Array.from({length: 4}, (_, c) => this.board[this.index(r, c)]).every(cell => cell === player)) {
                return true;
            }
        }
        for (let c = 0; c < 4; c++) {
            if (Array.from({length: 4}, (_, r) => this.board[this.index(r, c)]).every(cell => cell === player)) {
                return true;
            }
        }
        // Check diagonals
        if (Array.from({length: 4}, (_, i) => this.board[this.index(i, i)]).every(cell => cell === player)) {
            return true;
        }
        if (Array.from({length: 4}, (_, i) => this.board[this.index(i, 3 - i)]).every(cell => cell === player)) {
            return true;
        }
        return false;
    }

    squareWin(player) {
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                const corners = [
                    this.index(r, c), this.index(r, c + 1),
                    this.index(r + 1, c), this.index(r + 1, c + 1)
                ];
                if (corners.every(i => this.board[i] === player)) {
                    return true;
                }
            }
        }
        return false;
    }

    wins(player) {
        return this.lineWin(player) || this.squareWin(player);
    }

    isFull() {
        return this.board.every(cell => cell !== '.');
    }

    play(idx, player) {
        const prevLast = this.lastMove;
        this.board[idx] = player;
        this.lastMove = idx;
        return prevLast;
    }

    undo(idx, prevLast) {
        this.board[idx] = '.';
        this.lastMove = prevLast;
    }
}
// נתוני המדריך
// נתוני המדריך המעודכנים
const tutorialSteps = [
    {
        title: "Welcome to Square-Three! 🎮",
        text: "This is an amazing strategy game! There are 2 ways to win. Let's learn how to play!",
        action: null,
        sideMode: false
    },
    {
        title: "Way 1: Line of 4 in a Row 📏",
        text: "Look at the board! Try to create a line of 4 X's or O's - horizontal, vertical, or diagonal like in the golden example.",
        action: () => {
            highlightCells([0, 1, 2, 3]);
            showArrowAtCell(1.5, "👈");
        },
        sideMode: true
    },
    {
        title: "Way 2: 2×2 Square 🟦",
        text: "Or capture all 4 corners of any 2×2 square. Look at the golden square!",
        action: () => {
            highlightCells([5, 6, 9, 10]);
            showArrowAtCell(7.5, "👈");
        },
        sideMode: true
    },
    {
        title: "Hot Blocking Example 🚫",
        text: document.getElementById('hotBlocking')?.checked ? 
            "See the red blocked cells? If the last move was here (blue), you can't play in the adjacent cells marked with 🚫!" :
            "Hot Blocking is currently OFF. When enabled, you can't play adjacent to the opponent's last move. Try toggling it on!",
        action: () => {
            clearHighlights();
            const isHotBlockingOn = document.getElementById('hotBlocking')?.checked;
            
            if (isHotBlockingOn) {
                // Show the blocking visualization
                const cells = document.querySelectorAll('.cell');
                if (cells[5]) {
                    // Highlight the "last move" in blue
                    cells[5].style.border = '4px solid #007AFF';
                    cells[5].style.background = 'rgba(0, 122, 255, 0.3)';
                    cells[5].textContent = 'X';
                    cells[5].style.color = '#007AFF';
                    cells[5].style.fontSize = '2rem';
                    cells[5].style.fontWeight = 'bold';
                }
                
                // Show blocked adjacent cells in red
                const adjacentCells = [1, 4, 6, 9]; // Adjacent to cell 5
                adjacentCells.forEach(index => {
                    if (cells[index]) {
                        cells[index].style.border = '4px solid #FF3B30';
                        cells[index].style.background = 'rgba(255, 59, 48, 0.2)';
                        cells[index].innerHTML = '🚫';
                        cells[index].style.fontSize = '1.5rem';
                    }
                });
                
                showArrowAtCell(5, "👆");
            } else {
                // Point to the hot blocking toggle
                const hotBlockingContainer = document.getElementById('hotBlockingContainer');
                if (hotBlockingContainer) {
                    hotBlockingContainer.style.border = '3px solid #FFD700';
                    hotBlockingContainer.style.borderRadius = '10px';
                    hotBlockingContainer.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.6)';
                }
            }
        },
        sideMode: true
    },
    {
        title: "Hot Blocking Toggle 🔄",
        text: "You can enable or disable Hot Blocking in the settings. When enabled, you can't play adjacent to the last move.",
        action: () => {
            clearHighlights();
            hideArrow();
        },
        sideMode: false
    },
    {
        title: "Game Modes 🎮",
        text: "You can play against another human, against an AI, or let two AIs battle each other.",
        action: () => {
            clearHighlights();
            hideArrow();
        },
        sideMode: false
    },
    {
        title: "AI Strategies 🤖",
        text: "The AI uses different strategies to play. You can choose the difficulty and strategy in the settings.",
        action: () => {
            clearHighlights();
            hideArrow();
        },
        sideMode: false
    },
    {
        title: "Multi-Game Statistics 📊",
        text: "You can run multi-game statistics to see how different AI strategies perform against each other.",
        action: () => {
            clearHighlights();
            hideArrow();
        },
        sideMode: false
    },
    {
        title: "Ready to Play! 🚀",
        text: "Now click on any cell and start playing. Good luck!",
        action: () => {
            clearHighlights();
            hideArrow();
        },
        sideMode: false
    }
];

// הצגת שלב במדריך - עודכן
function showTutorialStep(stepIndex) {
    const step = tutorialSteps[stepIndex];
    const overlay = document.getElementById('tutorialOverlay');
    const box = document.getElementById('tutorialBox');
    
    document.getElementById('tutorialTitle').textContent = step.title;
    document.getElementById('tutorialText').textContent = step.text;
    
    // מעבר בין מצב מרכזי לצידי
    if (step.sideMode) {
        overlay.classList.add('side-mode');
        box.classList.add('side-position');
    } else {
        overlay.classList.remove('side-mode');
        box.classList.remove('side-position');
    }
    
    // עדכון פס הקדמה
    const progress = ((stepIndex + 1) / tutorialSteps.length) * 100;
    document.getElementById('tutorialProgress').style.width = progress + '%';
    
    // הפעלת פעולה (אם יש)
    if (step.action) {
        setTimeout(() => step.action(), 300); // דיליי קטן לאנימציה
    }
    // עדכון כפתורים
    const nextBtn = document.getElementById('tutorialNext');
    if (stepIndex === tutorialSteps.length - 1) {
    nextBtn.textContent = "Let's start! 🎮";
    } else {
        nextBtn.textContent = 'Next 👉';
    }
}

// פונקציות עזר להדגשת תאים ומיקום חץ
function highlightCells(indices) {
    clearHighlights();
    const cells = document.querySelectorAll('.cell');
    indices.forEach(index => {
        if (cells[index]) {
            cells[index].style.border = '4px solid #FFD700';
            cells[index].style.boxShadow = '0 0 25px rgba(255, 215, 0, 0.8)';
            cells[index].style.background = 'rgba(255, 215, 0, 0.2)';
            cells[index].style.zIndex = '5000';
        }
    });
}
// Add this function to your JavaScript code
function startTutorial() {
    const overlay = document.getElementById('tutorialOverlay');
    if (overlay) {
        overlay.style.display = 'flex';
        currentTutorialStep = 0;
        showTutorialStep(0);
    }
}

// Also add this variable at the top of your JavaScript section
let currentTutorialStep = 0;

// And add this function for the next button
function nextTutorialStep() {
    currentTutorialStep++;
    if (currentTutorialStep >= tutorialSteps.length) {
        closeTutorial();
    } else {
        showTutorialStep(currentTutorialStep);
    }
}
function showArrowAtCell(cellIndex, arrowSymbol = "👆") {
    const cells = document.querySelectorAll('.cell');
    const arrow = document.getElementById('tutorialArrow');
    
    if (cells[cellIndex] && arrow) {
        const rect = cells[cellIndex].getBoundingClientRect();
        arrow.style.display = 'block';
        arrow.style.left = (rect.left + rect.width/2 - 25) + 'px';
        arrow.style.top = (rect.top - 60) + 'px';
        arrow.textContent = arrowSymbol;
    }
}

function hideArrow() {
    const arrow = document.getElementById('tutorialArrow');
    if (arrow) {
        arrow.style.display = 'none';
    }
}
function clearHighlights() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.border = '';
        cell.style.boxShadow = '';
        cell.style.background = '';
        cell.style.zIndex = '';
        cell.style.color = '';
        cell.style.fontSize = '';
        cell.style.fontWeight = '';
        cell.textContent = '';
        cell.innerHTML = '';
    });
    
    // Clear hot blocking container highlighting
    const hotBlockingContainer = document.getElementById('hotBlockingContainer');
    if (hotBlockingContainer) {
        hotBlockingContainer.style.border = '';
        hotBlockingContainer.style.borderRadius = '';
        hotBlockingContainer.style.boxShadow = '';
    }
}

// סגירת המדריך - עודכן
function closeTutorial() {
    const overlay = document.getElementById('tutorialOverlay');
    const box = document.getElementById('tutorialBox');
    
    overlay.style.display = 'none';
    overlay.classList.remove('side-mode');
    box.classList.remove('side-position');
    
    clearHighlights();
    hideArrow();
    
    // שמירה שהמדריך הוצג
    localStorage.setItem('tutorialCompleted', 'true');
}

// Event listeners למדריך
document.addEventListener('DOMContentLoaded', function() {
    const tutorialNext = document.getElementById('tutorialNext');
    const tutorialSkip = document.getElementById('tutorialSkip');
    
    if (tutorialNext) {
        tutorialNext.addEventListener('click', nextTutorialStep);
    }
    
    if (tutorialSkip) {
        tutorialSkip.addEventListener('click', closeTutorial);
    }
    
    // בדיקה אם להציג את המדריך
    const tutorialCompleted = localStorage.getItem('tutorialCompleted');
    if (!tutorialCompleted) {
        setTimeout(() => {
            startTutorial();
        }, 1000); // דיליי של שנייה אחרי טעינת הדף
    }
});
// Evaluation Functions
function evalMaterial(game, me, opp) {
    return game.board.filter(cell => cell === me).length - 
            game.board.filter(cell => cell === opp).length;
}

function evalPattern(game, me, opp) {
    let score = 0;

    // Lines (rows, columns, diagonals)
    const lines = [];
    for (let r = 0; r < 4; r++) {
        lines.push(Array.from({length: 4}, (_, c) => game.index(r, c)));
    }
    for (let c = 0; c < 4; c++) {
        lines.push(Array.from({length: 4}, (_, r) => game.index(r, c)));
    }
    lines.push(Array.from({length: 4}, (_, i) => game.index(i, i)));
    lines.push(Array.from({length: 4}, (_, i) => game.index(i, 3 - i)));

    for (const line of lines) {
        const cells = line.map(i => game.board[i]);
        const myCount = cells.filter(cell => cell === me).length;
        const oppCount = cells.filter(cell => cell === opp).length;
        const emptyCount = cells.filter(cell => cell === '.').length;
        
        if (oppCount === 0) {
            if (myCount === 3 && emptyCount === 1) score += 50;
            else if (myCount === 2 && emptyCount === 2) score += 10;
            else if (myCount === 1 && emptyCount === 3) score += 1;
        }
        if (myCount === 0) {
            if (oppCount === 3 && emptyCount === 1) score -= 50;
            else if (oppCount === 2 && emptyCount === 2) score -= 10;
            else if (oppCount === 1 && emptyCount === 3) score -= 1;
        }
    }

    // Squares
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            const corners = [
                game.index(r, c), game.index(r, c + 1),
                game.index(r + 1, c), game.index(r + 1, c + 1)
            ];
            const myCount = corners.filter(i => game.board[i] === me).length;
            const oppCount = corners.filter(i => game.board[i] === opp).length;
            const emptyCount = corners.filter(i => game.board[i] === '.').length;
            
            if (oppCount === 0) {
                if (myCount === 3 && emptyCount === 1) score += 60;
                else if (myCount === 2 && emptyCount === 2) score += 15;
                else if (myCount === 1 && emptyCount === 3) score += 2;
            }
            if (myCount === 0) {
                if (oppCount === 3 && emptyCount === 1) score -= 60;
                else if (oppCount === 2 && emptyCount === 2) score -= 15;
                else if (oppCount === 1 && emptyCount === 3) score -= 2;
            }
        }
    }

    // Center control bonus
    const center = [game.index(1, 1), game.index(1, 2), game.index(2, 1), game.index(2, 2)];
    score += center.filter(i => game.board[i] === me).length;
    score -= center.filter(i => game.board[i] === opp).length;

    return score;
}

function evalAggressive(game, me, opp) {
    let score = 0;

    // Heavily favor creating threats
    const lines = [];
    for (let r = 0; r < 4; r++) {
        lines.push(Array.from({length: 4}, (_, c) => game.index(r, c)));
    }
    for (let c = 0; c < 4; c++) {
        lines.push(Array.from({length: 4}, (_, r) => game.index(r, c)));
    }
    lines.push(Array.from({length: 4}, (_, i) => game.index(i, i)));
    lines.push(Array.from({length: 4}, (_, i) => game.index(i, 3 - i)));

    for (const line of lines) {
        const cells = line.map(i => game.board[i]);
        const myCount = cells.filter(cell => cell === me).length;
        const oppCount = cells.filter(cell => cell === opp).length;
        const emptyCount = cells.filter(cell => cell === '.').length;
        
        if (oppCount === 0) {
            if (myCount === 3 && emptyCount === 1) score += 100; // Much higher for threats
            else if (myCount === 2 && emptyCount === 2) score += 25;
            else if (myCount === 1 && emptyCount === 3) score += 3;
        }
        if (myCount === 0 && oppCount === 3 && emptyCount === 1) {
            score -= 30; // Less defensive focus
        }
    }

    // Squares - even more aggressive
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            const corners = [
                game.index(r, c), game.index(r, c + 1),
                game.index(r + 1, c), game.index(r + 1, c + 1)
            ];
            const myCount = corners.filter(i => game.board[i] === me).length;
            const oppCount = corners.filter(i => game.board[i] === opp).length;
            const emptyCount = corners.filter(i => game.board[i] === '.').length;
            
            if (oppCount === 0) {
                if (myCount === 3 && emptyCount === 1) score += 120;
                else if (myCount === 2 && emptyCount === 2) score += 30;
            }
            if (myCount === 0 && oppCount === 3 && emptyCount === 1) {
                score -= 40;
            }
        }
    }

    return score;
}
function highlightWinningCells(player) {
    const winningCells = getWinningCells(player);
    if (winningCells.length > 0) {
        winningCells.forEach(index => {
            const cell = document.querySelectorAll('.cell')[index];
            if (cell) {
                cell.classList.remove('last-move'); // הסר את last-move
                cell.classList.add('winning-line', player);
            }
        });
    }
}

function getWinningCells(player) {
    // Check rows
    for (let r = 0; r < 4; r++) {
        const row = [r*4, r*4+1, r*4+2, r*4+3];
        if (row.every(i => game.board[i] === player)) return row;
    }
    
    // Check columns
    for (let c = 0; c < 4; c++) {
        const col = [c, c+4, c+8, c+12];
        if (col.every(i => game.board[i] === player)) return col;
    }
    
    // Check diagonals
    const diag1 = [0, 5, 10, 15];
    const diag2 = [3, 6, 9, 12];
    if (diag1.every(i => game.board[i] === player)) return diag1;
    if (diag2.every(i => game.board[i] === player)) return diag2;
    
    // Check squares
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            const square = [r*4+c, r*4+c+1, (r+1)*4+c, (r+1)*4+c+1];
            if (square.every(i => game.board[i] === player)) return square;
        }
    }
    
    return [];
}
function evalDefensive(game, me, opp) {
    let score = 0;

    // Focus heavily on blocking opponent threats
    const lines = [];
    for (let r = 0; r < 4; r++) {
        lines.push(Array.from({length: 4}, (_, c) => game.index(r, c)));
    }
    for (let c = 0; c < 4; c++) {
        lines.push(Array.from({length: 4}, (_, r) => game.index(r, c)));
    }
    lines.push(Array.from({length: 4}, (_, i) => game.index(i, i)));
    lines.push(Array.from({length: 4}, (_, i) => game.index(i, 3 - i)));

    for (const line of lines) {
        const cells = line.map(i => game.board[i]);
        const myCount = cells.filter(cell => cell === me).length;
        const oppCount = cells.filter(cell => cell === opp).length;
        const emptyCount = cells.filter(cell => cell === '.').length;
        
        if (myCount === 0) {
            if (oppCount === 3 && emptyCount === 1) score -= 100; // Heavily penalize opponent threats
            else if (oppCount === 2 && emptyCount === 2) score -= 30;
            else if (oppCount === 1 && emptyCount === 3) score -= 5;
        }
        if (oppCount === 0) {
            if (myCount === 3 && emptyCount === 1) score += 40; // Lower offensive focus
            else if (myCount === 2 && emptyCount === 2) score += 8;
        }
    }

    // Squares - defensive focus
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            const corners = [
                game.index(r, c), game.index(r, c + 1),
                game.index(r + 1, c), game.index(r + 1, c + 1)
            ];
            const myCount = corners.filter(i => game.board[i] === me).length;
            const oppCount = corners.filter(i => game.board[i] === opp).length;
            const emptyCount = corners.filter(i => game.board[i] === '.').length;
            
            if (myCount === 0) {
                if (oppCount === 3 && emptyCount === 1) score -= 120;
                else if (oppCount === 2 && emptyCount === 2) score -= 35;
            }
            if (oppCount === 0) {
                if (myCount === 3 && emptyCount === 1) score += 50;
                else if (myCount === 2 && emptyCount === 2) score += 10;
            }
        }
    }

    return score;
}

function evalPositional(game, me, opp) {
    let score = 0;

    // Strong center control
    const center = [game.index(1, 1), game.index(1, 2), game.index(2, 1), game.index(2, 2)];
    score += 10 * center.filter(i => game.board[i] === me).length;
    score -= 10 * center.filter(i => game.board[i] === opp).length;

    // Corner control
    const corners = [game.index(0, 0), game.index(0, 3), game.index(3, 0), game.index(3, 3)];
    score += 5 * corners.filter(i => game.board[i] === me).length;
    score -= 5 * corners.filter(i => game.board[i] === opp).length;

    // Edge control
    const edges = [];
    for (let i = 0; i < 4; i++) {
        edges.push(game.index(0, i), game.index(3, i), game.index(i, 0), game.index(i, 3));
    }
    const uniqueEdges = [...new Set(edges)].filter(i => !center.includes(i) && !corners.includes(i));
    score += 3 * uniqueEdges.filter(i => game.board[i] === me).length;
    score -= 3 * uniqueEdges.filter(i => game.board[i] === opp).length;

    // Basic pattern scoring (lighter than pattern-based)
    const lines = [];
    for (let r = 0; r < 4; r++) {
        lines.push(Array.from({length: 4}, (_, c) => game.index(r, c)));
    }
    for (let c = 0; c < 4; c++) {
        lines.push(Array.from({length: 4}, (_, r) => game.index(r, c)));
    }
    lines.push(Array.from({length: 4}, (_, i) => game.index(i, i)));
    lines.push(Array.from({length: 4}, (_, i) => game.index(i, 3 - i)));

    for (const line of lines) {
        const cells = line.map(i => game.board[i]);
        const myCount = cells.filter(cell => cell === me).length;
        const oppCount = cells.filter(cell => cell === opp).length;
        const emptyCount = cells.filter(cell => cell === '.').length;
        
        if (oppCount === 0) {
            if (myCount === 3 && emptyCount === 1) score += 30;
            else if (myCount === 2 && emptyCount === 2) score += 5;
        }
        if (myCount === 0) {
            if (oppCount === 3 && emptyCount === 1) score -= 30;
            else if (oppCount === 2 && emptyCount === 2) score -= 5;
        }
    }

    return score;
}

// Get evaluation function by name
function getEvalFunction(strategy) {
    switch (strategy) {
        case 'material': return evalMaterial;
        case 'aggressive': return evalAggressive;
        case 'defensive': return evalDefensive;
        case 'positional': return evalPositional;
        case 'pattern':
        default: return evalPattern;
    }
}
function createConfettiExplosion() {
    const celebrationDiv = document.createElement('div');
    celebrationDiv.className = 'victory-celebration';
    document.body.appendChild(celebrationDiv);
    
    // יצירת 100 חלקיקי קונפטי
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        celebrationDiv.appendChild(confetti);
    }
    
    // הסרה לאחר 5 שניות
    setTimeout(() => {
        celebrationDiv.remove();
    }, 5000);
}

function addBoardGlow() {
    const board = document.getElementById('board');
    if (board) {
        board.classList.add('board-victory-glow');
        setTimeout(() => {
            board.classList.remove('board-victory-glow');
        }, 1500);
    }
}

function enhancedVictoryAnimation(player) {
    // אפקט קונפטי
    createConfettiExplosion();
    
    // זוהר ללוח
    addBoardGlow();
    
    // אנימציה לטקסט הזכייה
    const gameStatus = document.getElementById('gameStatus');
    if (gameStatus) {
        gameStatus.classList.add('winner-text-explosion');
    }
    
    // רטט קל (אם נתמך)
    if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
    }
}
function minimax(game, depth, alpha, beta, maximizing, me, opp, evalFunc, useRandomness = true, gameNumber = 0) {
    if (game.wins(me)) return [10000 - depth, null];
    if (game.wins(opp)) return [-10000 + depth, null];
    if (depth === 0 || game.isFull()) {
        let score = evalFunc(game, me, opp);
        // Add evaluation noise and game-specific variation
        if (useRandomness) {
            // Stronger noise for more variation
            const noise = score * 0.15 * (Math.random() * 2 - 1);
            // Add game-specific deterministic variation based on game number
            const gameVariation = score * 0.1 * Math.sin(gameNumber * 0.7 + depth);
            score += noise + gameVariation;
        }
        return [score, null];
    }

    const moves = game.legalMoves();
    
    // Handle case where no legal moves are available
    if (moves.length === 0) {
        let score = evalFunc(game, me, opp);
        if (useRandomness) {
            const noise = score * 0.15 * (Math.random() * 2 - 1);
            const gameVariation = score * 0.1 * Math.sin(gameNumber * 0.7 + depth);
            score += noise + gameVariation;
        }
        return [score, null];
    }

    // Randomize move order to prevent deterministic patterns
    if (useRandomness) {
        for (let i = moves.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [moves[i], moves[j]] = [moves[j], moves[i]];
        }
    }

    const moveScores = [];

    if (maximizing) {
        let value = -Infinity;
        for (const move of moves) {
            const prev = game.play(move, me);
            const [score] = minimax(game, depth - 1, alpha, beta, false, me, opp, evalFunc, useRandomness, gameNumber);
            game.undo(move, prev);
            
            moveScores.push({ move, score });
            value = Math.max(value, score);
            alpha = Math.max(alpha, score);
            if (beta <= alpha) break;
        }
        
        // Ensure we have valid moveScores before processing
        if (moveScores.length === 0) {
            return [evalFunc(game, me, opp), null];
        }
        
        // Enhanced randomness: select from top moves with weighted probability
        if (useRandomness) {
            const bestScore = Math.max(...moveScores.map(ms => ms.score));
            const tolerance = 10; // Allow moves within 10 points of best
            const goodMoves = moveScores.filter(ms => ms.score >= bestScore - tolerance);
            
            if (goodMoves.length === 0) {
                return [moveScores[0].score, moveScores[0].move];
            }
            
            // Weighted selection: better moves have higher probability
            const weights = goodMoves.map(ms => Math.exp((ms.score - bestScore + tolerance) / 10));
            const totalWeight = weights.reduce((sum, w) => sum + w, 0);
            const random = Math.random() * totalWeight;
            
            let weightSum = 0;
            for (let i = 0; i < goodMoves.length; i++) {
                weightSum += weights[i];
                if (random <= weightSum) {
                    return [goodMoves[i].score, goodMoves[i].move];
                }
            }
            
            return [goodMoves[goodMoves.length - 1].score, goodMoves[goodMoves.length - 1].move];
        } else {
            const bestMove = moveScores.reduce((best, current) => 
                current.score > best.score ? current : best
            );
            return [bestMove.score, bestMove.move];
        }
    } else {
        let value = Infinity;
        for (const move of moves) {
            const prev = game.play(move, opp);
            const [score] = minimax(game, depth - 1, alpha, beta, true, me, opp, evalFunc, useRandomness, gameNumber);
            game.undo(move, prev);
            
            moveScores.push({ move, score });
            value = Math.min(value, score);
            beta = Math.min(beta, score);
            if (beta <= alpha) break;
        }
        
        // Ensure we have valid moveScores before processing
        if (moveScores.length === 0) {
            return [evalFunc(game, me, opp), null];
        }
        
        // Enhanced randomness for minimizing player
        if (useRandomness) {
            const bestScore = Math.min(...moveScores.map(ms => ms.score));
            const tolerance = 10;
            const goodMoves = moveScores.filter(ms => ms.score <= bestScore + tolerance);
            
            if (goodMoves.length === 0) {
                return [moveScores[0].score, moveScores[0].move];
            }
            
            // Weighted selection for minimizing player
            const weights = goodMoves.map(ms => Math.exp(-(ms.score - bestScore + tolerance) / 10));
            const totalWeight = weights.reduce((sum, w) => sum + w, 0);
            const random = Math.random() * totalWeight;
            
            let weightSum = 0;
            for (let i = 0; i < goodMoves.length; i++) {
                weightSum += weights[i];
                if (random <= weightSum) {
                    return [goodMoves[i].score, goodMoves[i].move];
                }
            }
            
            return [goodMoves[goodMoves.length - 1].score, goodMoves[goodMoves.length - 1].move];
        } else {
            const bestMove = moveScores.reduce((best, current) => 
                current.score < best.score ? current : best
            );
            return [bestMove.score, bestMove.move];
        }
    }
}

function chooseMove(game, player, depth, strategy, useRandomness = true) {
    const me = player;
    const opp = player === 'X' ? 'O' : 'X';
    const evalFunc = getEvalFunction(strategy);
    const [, move] = minimax(game, depth, -Infinity, Infinity, true, me, opp, evalFunc, useRandomness);
    return move;
}

// Game State
let game;
let currentPlayer = 'X';
let gameMode = 'human'; // 'human', 'ai', 'aivsai', or 'statistics'
let gameEnded = false;
let aiDifficulty = 4;
let aiStrategy = 'pattern';
let sharedDepth = 4;
let aiXStrategy = 'aggressive';
let aiOStrategy = 'defensive';
let aiVsAiRunning = false;
let aiVsAiPaused = false;
let fullStatsRunning = false;

// Full statistics tracking
let fullStatsData = {
    strategies: ['pattern', 'aggressive', 'defensive', 'positional', 'material'],
    results: {}, // Will store results for each combination
    currentCombo: 0,
    totalCombos: 0,
    currentGameInCombo: 0,
    gamesPerCombo: 10,
    testDepth: 4
};

// Strategy descriptions
const strategyDescriptions = {
    'pattern': 'Balanced approach focusing on both offensive and defensive patterns.',
    'aggressive': 'Focuses on creating winning threats and attacking patterns.',
    'defensive': 'Prioritizes blocking opponent threats and defensive play.',
    'positional': 'Emphasizes board control and strategic positioning.',
    'material': 'Simple strategy based on token count and basic evaluation.'
};

function updateStrategyDescription(selectId, descriptionId) {
    const select = document.getElementById(selectId);
    const description = document.getElementById(descriptionId);
    if (select && description) {
        description.textContent = strategyDescriptions[select.value];
    }
}

function initGame() {
    let hotBlocking;
    if (gameMode === 'statistics') {
        hotBlocking = document.getElementById('statsHotBlocking').checked;
    } else if (gameMode === 'ai') {
        // Use the Human vs AI settings hot blocking toggle
        hotBlocking = document.getElementById('aiHotBlocking').checked;
    } else if (gameMode === 'aivsai') {
        // Use the AI vs AI settings hot blocking toggle
        hotBlocking = document.getElementById('aiVsAiHotBlocking').checked;
    } else {
        // Human vs Human mode
        hotBlocking = document.getElementById('hotBlocking').checked;
    }
    game = new SquareThree(hotBlocking);
    currentPlayer = 'X';
    gameEnded = false;
    updateDisplay();
}
function toggleRules() {
    // יצירת popup
    const popup = document.createElement('div');
    popup.id = 'rulesPopup';
    popup.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
    `;
    
    popup.innerHTML = `
        <div style="
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9));
            padding: 30px;
            border-radius: 20px;
            max-width: 95vw;
            width: 50%;
            padding: ${window.innerWidth < 600 ? '15px' : '30px'};
            font-size: ${window.innerWidth < 600 ? '14px' : '16px'};
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            border: 2px solid rgba(255, 255, 255, 0.8);
            position: relative;
        ">
            <button onclick="document.getElementById('rulesPopup').remove()" style="
                position: absolute;
                top: 15px;
                right: 20px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #666;
            ">×</button>
            
            <h3 style="margin-bottom: 20px; color: #4A90E2; text-align: center;">🎮 How to Play Square-Three</h3>
            
            <div style="text-align: left; line-height: 1.8; color: #333;">
                <p><strong>🎯 Win by Line:</strong> Get 4 in a row (horizontal, vertical, or diagonal)</p>
                <p><strong>🟦 Win by Square:</strong> Get all 4 corners of any 2×2 square</p>
                <p><strong>🚫 Hot Blocking:</strong> When enabled, you can't play adjacent to the last move</p>
                <p><strong>🤖 AI Strategies:</strong> Each AI uses different evaluation functions for unique playstyles</p>
                <p><strong>⚡ Strategy:</strong> Block your opponent while creating your own winning patterns!</p>
            </div>
            
            <div style="text-align: center; margin-top: 25px;">
                <button onclick="document.getElementById('rulesPopup').remove()" style="
                    background: linear-gradient(135deg, #4A90E2, #5A67D8);
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 12px;
                    cursor: pointer;
                    font-weight: 600;
                ">Got it! 👍</button>
            </div>
        </div>
    `;
    
    // סגירה בלחיצה על הרקע
    popup.onclick = function(e) {
        if (e.target === popup) {
            popup.remove();
        }
    };
    
    document.body.appendChild(popup);
}
function setGameMode(mode) {
    gameMode = mode;
    aiVsAiRunning = false;
    aiVsAiPaused = false;
    fullStatsRunning = false;
    
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    if (event && event.target) {
        event.target.classList.add('active');
    }
    const hotBlockingLabel = document.getElementById('hotBlockingLabel');
    if (hotBlockingLabel){
        hotBlockingLabel.style.display = (mode === 'human') ? 'inline-block' : 'none';
    }
    const hotBlockingContainer = document.getElementById('hotBlockingContainer');
    if (hotBlockingContainer) {
        // מוצג רק ב-Human vs Human
        hotBlockingContainer.style.display = (mode === 'human') ? 'block' : 'none';
    }
    // const hotBlockingContainer = document.getElementById('hotBlockingContainer');
    // if (hotBlockingContainer) hotBlockingContainer.style.display = 'block';
    const aiSettings = document.getElementById('aiSettings');
    const humanVsAiSettings = document.getElementById('humanVsAiSettings');
    const aiVsAiSettings = document.getElementById('aiVsAiSettings');
    const statisticsSettings = document.getElementById('statisticsSettings');
    const gameControls = document.getElementById('gameControls');
    const pauseBtn = document.getElementById('pauseBtn');
    
    // Hide all settings first
    if (aiSettings) aiSettings.classList.remove('show');
    if (humanVsAiSettings) humanVsAiSettings.style.display = 'none';
    if (aiVsAiSettings) aiVsAiSettings.style.display = 'none';
    if (statisticsSettings) statisticsSettings.style.display = 'none';
    if (pauseBtn) pauseBtn.style.display = 'none';
    
    // Show/hide game controls based on mode
    if (gameControls) {
        if (mode === 'statistics') {
            gameControls.classList.add('hidden');
        } else {
            gameControls.classList.remove('hidden');
        }
    }
    
    if (mode === 'ai') {
        if (aiSettings) aiSettings.classList.add('show');
        if (humanVsAiSettings) humanVsAiSettings.style.display = 'block';
    } else if (mode === 'aivsai') {
        if (aiSettings) aiSettings.classList.add('show');
        if (aiVsAiSettings) aiVsAiSettings.style.display = 'block';
    } else if (mode === 'statistics') {
        if (statisticsSettings) statisticsSettings.style.display = 'block';
    }
    
    if (mode !== 'statistics') {
        resetGame();
    }
}

function resetGame() {
    aiVsAiRunning = false;
    aiVsAiPaused = false;
    fullStatsRunning = false;
    
    const pauseBtn = document.getElementById('pauseBtn');
    const fullStatsBtn = document.getElementById('fullStatsBtn');
    const stopStatsBtn = document.getElementById('stopStatsBtn');
    
    if (pauseBtn) pauseBtn.style.display = 'none';
    if (fullStatsBtn) fullStatsBtn.style.display = 'inline-block';
    if (stopStatsBtn) stopStatsBtn.style.display = 'none';
    
    if (gameMode !== 'statistics') {
        initGame();
    }
}
function updateDisplay() {
    if (gameMode === 'statistics') return; // Don't update display in statistics mode
    
    const board = document.getElementById('board');
    const currentPlayerDiv = document.getElementById('currentPlayer');
    const gameStatus = document.getElementById('gameStatus');

    // Update board
    if (board) {
        // Store which cells already have content to avoid re-animating them
        const existingCells = Array.from(board.querySelectorAll('.cell')).map(cell => ({
            content: cell.textContent,
            classes: Array.from(cell.classList)
        }));
        
        board.innerHTML = '';
        
        // Remove the disabled class - we'll handle click prevention differently
        board.classList.remove('disabled');
        
        for (let i = 0; i < 16; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.textContent = game.board[i] === '.' ? '' : game.board[i];
            
            if (game.board[i] !== '.') {
                cell.classList.add(game.board[i]);
                
                // Only add animation if this is a new symbol
                const wasEmpty = !existingCells[i] || existingCells[i].content === '';
                if (wasEmpty && cell.textContent !== '') {
                    cell.classList.add('just-played');
                    // Remove the animation class after animation completes
                    setTimeout(() => {
                        cell.classList.remove('just-played');
                    }, 600);
                }
            }
            
            if (i === game.lastMove) {
                cell.classList.add('last-move');
            }
            
            const legalMoves = game.legalMoves();
            if (game.board[i] === '.' && !legalMoves.includes(i)) {
                cell.classList.add('blocked');
            }
            
            cell.onclick = () => makeMove(i);
            
            // Disable clicking in AI vs AI mode but keep normal appearance
            if (gameMode === 'aivsai') {
                cell.style.cursor = 'default';
                cell.style.pointerEvents = 'none';
                // Keep normal opacity and appearance
                cell.style.opacity = '1';
            } else if (gameMode !== 'statistics') {
                cell.style.cursor = 'pointer';
                cell.style.opacity = '1';
                cell.style.pointerEvents = 'auto';
            }
            if (game.wins('X')) {
                highlightWinningCells('X');
                enhancedVictoryAnimation('X');
                // ... קוד קיים ...
            } else if (game.wins('O')) {
                highlightWinningCells('O');
                enhancedVictoryAnimation('O');
                // ... קוד קיים ...
            }
            board.appendChild(cell);
        }
    }

    // Update current player
    if (currentPlayerDiv && !gameEnded) {
        if (gameMode === 'aivsai') {
            const currentStrategy = currentPlayer === 'X' ? aiXStrategy : aiOStrategy;
            const statusText = aiVsAiRunning ? (aiVsAiPaused ? '(Paused)' : '<span class="spinner"></span>') : '(Ready)';
            currentPlayerDiv.innerHTML = `<span style="color: rgba(0, 0, 0, 0.8); font-weight: 500;">AI Battle:</span> <span style="color: ${currentPlayer === 'X' ? '#ff6b6b' : '#4ecdc4'}; font-weight: 600;">AI ${currentPlayer}</span> <span style="color: rgba(0, 0, 0, 0.7);">(${currentStrategy.charAt(0).toUpperCase() + currentStrategy.slice(1)}) <span style="color: rgba(0, 0, 0, 0.6); font-style: italic;">${statusText}</span></span>`;
        } else {
            currentPlayerDiv.textContent = `Current Player: ${currentPlayer}`;
            currentPlayerDiv.style.color = currentPlayer === 'X' ? '#ff6b6b' : '#4ecdc4';
        }
    }

    // Check game status
    if (gameStatus) {
        if (game.wins('X')) {
            // Show X-strategy only in AI-vs-AI mode
            const strategy =
                gameMode === 'aivsai'
                    ? ` (${aiXStrategy.charAt(0).toUpperCase() + aiXStrategy.slice(1)})`
                    : '';
            gameStatus.innerHTML = `🎉 <span class="winner">Player X${strategy} Wins!</span> 🎉`;
            gameEnded = true;

        } else if (game.wins('O')) {
            const strategy =
                gameMode === 'aivsai'
                    ? ` (${aiOStrategy.charAt(0).toUpperCase() + aiOStrategy.slice(1)})`
                    : '';
            gameStatus.innerHTML = `🎉 <span class="winner">Player O${strategy} Wins!</span> 🎉`;
            gameEnded = true;

        } else if (game.isFull() || game.legalMoves().length === 0) {
            gameStatus.innerHTML = `🤝 <span class="winner">It's a Tie!</span> 🤝`;
            gameEnded = true;
        } else {
            gameStatus.textContent = '';          // keep area blank while game is running
        }
    }
}
function makeMove(index) {
    if (gameMode === 'statistics') return; // No manual moves in statistics mode
    if (gameMode === 'aivsai') return; // No manual moves in AI vs AI mode
    if (gameEnded || game.board[index] !== '.' || !game.legalMoves().includes(index)) {
        return;
    }

    game.play(index, currentPlayer);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateDisplay();

    // AI move for Human vs AI mode
    if (gameMode === 'ai' && currentPlayer === 'O' && !gameEnded) {
        setTimeout(() => {
            aiDifficulty = parseInt(document.getElementById('aiDifficulty').value);
            aiStrategy = document.getElementById('aiStrategy').value;
            const aiMove = chooseMove(game, 'O', aiDifficulty, aiStrategy, false);
            if (aiMove !== null) {
                game.play(aiMove, 'O');
                currentPlayer = 'X';
                updateDisplay();
            }
        }, 500);  // <-- Remove this 500ms delay!
    }
}

function startAiVsAi() {
    if (gameEnded) {
        resetGame();
    }
    
    aiVsAiRunning = true;
    aiVsAiPaused = false;
    
    const pauseBtn = document.getElementById('pauseBtn');
    const sharedDepthSelect = document.getElementById('sharedDepth');
    const aiXStrategySelect = document.getElementById('aiXStrategy');
    const aiOStrategySelect = document.getElementById('aiOStrategy');
    
    if (pauseBtn) pauseBtn.style.display = 'inline-block';
    
    if (sharedDepthSelect) sharedDepth = parseInt(sharedDepthSelect.value);
    if (aiXStrategySelect) aiXStrategy = aiXStrategySelect.value;
    if (aiOStrategySelect) aiOStrategy = aiOStrategySelect.value;
    
    // Reinitialize game to apply current hot blocking setting
    initGame();
    
    updateDisplay();
    runAiVsAi();
}

function pauseAiVsAi() {
    aiVsAiPaused = !aiVsAiPaused;
    const pauseBtn = document.getElementById('pauseBtn');
    if (pauseBtn) {
        pauseBtn.textContent = aiVsAiPaused ? 'Resume' : 'Pause';
    }
    updateDisplay();
    
    if (!aiVsAiPaused) {
        runAiVsAi();
    }
}

function runAiVsAi(fastMode = false) {
    if (!aiVsAiRunning || aiVsAiPaused || gameEnded) {
        return;
    }

    const strategy = currentPlayer === 'X' ? aiXStrategy : aiOStrategy;
    const useRandomness = true; // Always use randomness in AI vs AI for variety
    const aiMove = chooseMove(game, currentPlayer, sharedDepth, strategy, useRandomness);
    
    if (aiMove !== null) {
        game.play(aiMove, currentPlayer);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateDisplay();
        
        // Check if game ended
        if (game.wins('X') || game.wins('O') || game.isFull() || game.legalMoves().length === 0) {
            aiVsAiRunning = false;
            
            if (fullStatsRunning) {
                recordStatGameResult();
            } else {
                const pauseBtn = document.getElementById('pauseBtn');
                if (pauseBtn) pauseBtn.style.display = 'none';
            }
            return;
        }
        
        // Continue with next move
        const delay = fastMode ? 50 : (fullStatsRunning ? 100 : 1500);
        setTimeout(() => {
            runAiVsAi(fastMode);
        }, delay);
    } else {
        // No legal moves available
        aiVsAiRunning = false;
        
        if (fullStatsRunning) {
            recordStatGameResult();
        } else {
            const pauseBtn = document.getElementById('pauseBtn');
            if (pauseBtn) pauseBtn.style.display = 'none';
            updateDisplay();
        }
    }
}

// Full Statistics Functions
function startFullStatistics() {
    fullStatsRunning = true;
    const gamesPerCombo = parseInt(document.getElementById('gamesPerCombo').value);
    const testDepth = parseInt(document.getElementById('testDepth').value);
    
    // Initialize full stats data
    fullStatsData.gamesPerCombo = gamesPerCombo;
    fullStatsData.testDepth = testDepth;
    fullStatsData.results = {};
    fullStatsData.currentCombo = 0;
    fullStatsData.currentGameInCombo = 0;
    
    // Calculate all combinations (each strategy vs each other strategy)
    const strategies = fullStatsData.strategies;
    fullStatsData.totalCombos = strategies.length * strategies.length;
    
    // Initialize results structure
    strategies.forEach(strategy1 => {
        fullStatsData.results[strategy1] = {};
        strategies.forEach(strategy2 => {
            fullStatsData.results[strategy1][strategy2] = {
                wins: 0,
                losses: 0,
                draws: 0,
                games: 0
            };
        });
    });
    
    // Show progress and hide results
    const progressDiv = document.getElementById('statisticsProgress');
    const resultsDiv = document.getElementById('fullStatisticsResults');
    const fullStatsBtn = document.getElementById('fullStatsBtn');
    const stopStatsBtn = document.getElementById('stopStatsBtn');
    
    if (progressDiv) progressDiv.style.display = 'block';
    if (resultsDiv) resultsDiv.style.display = 'none';
    if (fullStatsBtn) fullStatsBtn.style.display = 'none';
    if (stopStatsBtn) stopStatsBtn.style.display = 'inline-block';
    
    runNextStatCombo();
}

function stopFullStatistics() {
    fullStatsRunning = false;
    aiVsAiRunning = false;
    
    const progressDiv = document.getElementById('statisticsProgress');
    const fullStatsBtn = document.getElementById('fullStatsBtn');
    const stopStatsBtn = document.getElementById('stopStatsBtn');
    
    if (progressDiv) progressDiv.style.display = 'none';
    if (fullStatsBtn) fullStatsBtn.style.display = 'inline-block';
    if (stopStatsBtn) stopStatsBtn.style.display = 'none';
    
    // Show partial results if any data exists
    if (fullStatsData.currentCombo > 0) {
        displayFullStatistics();
    }
}

function runNextStatCombo() {
    if (!fullStatsRunning) return;
    
    const strategies = fullStatsData.strategies;
    const totalCombos = strategies.length * strategies.length;
    
    if (fullStatsData.currentCombo >= totalCombos) {
        // All combinations complete
        fullStatsRunning = false;
        stopFullStatistics();
        displayFullStatistics();
        return;
    }
    
    // Get current strategy combination
    const strategy1Index = Math.floor(fullStatsData.currentCombo / strategies.length);
    const strategy2Index = fullStatsData.currentCombo % strategies.length;
    const strategy1 = strategies[strategy1Index];
    const strategy2 = strategies[strategy2Index];
    
    // Update UI
    const currentTestInfo = document.getElementById('currentTestInfo');
    if (currentTestInfo) {
        currentTestInfo.textContent = `Testing: ${strategy1.charAt(0).toUpperCase() + strategy1.slice(1)} (X - goes first) vs ${strategy2.charAt(0).toUpperCase() + strategy2.slice(1)} (O - goes second)`;
    }
    
    // Set up game with these strategies
    aiXStrategy = strategy1;
    aiOStrategy = strategy2;
    sharedDepth = fullStatsData.testDepth;
    fullStatsData.currentGameInCombo = 0;
    
    runNextStatGame();
}

function runNextStatGame() {
    if (!fullStatsRunning) return;
    
    if (fullStatsData.currentGameInCombo >= fullStatsData.gamesPerCombo) {
        // This combination is complete, move to next
        fullStatsData.currentCombo++;
        fullStatsData.currentGameInCombo = 0; // Reset game counter
        updateStatProgress();
        setTimeout(() => runNextStatCombo(), 100);
        return;
    }
    
    // Increment the game counter before starting
    fullStatsData.currentGameInCombo++;
    
    // Start a new game with current strategies
    initGame();
    aiVsAiRunning = true;
    
    runAiVsAi(true); // Fast mode
}

function recordStatGameResult() {
    if (!fullStatsRunning) return;
    
    const strategies = fullStatsData.strategies;
    const strategy1Index = Math.floor(fullStatsData.currentCombo / strategies.length);
    const strategy2Index = fullStatsData.currentCombo % strategies.length;
    const strategy1 = strategies[strategy1Index];
    const strategy2 = strategies[strategy2Index];
    
    const result = fullStatsData.results[strategy1][strategy2];
    result.games++;
    
    if (game.wins('X')) {
        result.wins++;
    } else if (game.wins('O')) {
        result.losses++;
    } else {
        result.draws++;
    }
    
    // Update progress immediately after recording result
    updateStatProgress();
    
    // Continue with next game after short delay
    setTimeout(() => {
        if (fullStatsRunning) {
            runNextStatGame();
        }
    }, 50);
}

function updateStatProgress() {
    const totalGames = fullStatsData.totalCombos * fullStatsData.gamesPerCombo;
    // Calculate completed games more accurately
    const completedCombos = fullStatsData.currentCombo;
    const completedGamesInCurrentCombo = Math.max(0, fullStatsData.currentGameInCombo - 1);
    const completedGames = (completedCombos * fullStatsData.gamesPerCombo) + completedGamesInCurrentCombo;
    
    // Ensure we don't exceed totals
    const safeCompletedGames = Math.min(completedGames, totalGames);
    const percentage = Math.round((safeCompletedGames / totalGames) * 100);
    
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    if (progressBar) progressBar.style.width = percentage + '%';
    if (progressText) progressText.textContent = `${percentage}% - ${safeCompletedGames}/${totalGames} games completed`;
}

function displayFullStatistics() {
    const resultsDiv = document.getElementById('fullStatisticsResults');
    if (resultsDiv) resultsDiv.style.display = 'block';
    
    displayStrategyRankings();
    displayMatchupMatrix();
    displayDetailedResults();
}

// Enhanced Strategy Rankings with icons, colors, and animations
function displayStrategyRankings() {
    const strategies = fullStatsData.strategies;
    const rankings = [];
    
    strategies.forEach(strategy => {
        let totalWins = 0;
        let totalLosses = 0;
        let totalDraws = 0;
        let totalGames = 0;
        
        strategies.forEach(opponent => {
            const result = fullStatsData.results[strategy][opponent];
            totalWins += result.wins;
            totalLosses += result.losses;
            totalDraws += result.draws;
            totalGames += result.games;
        });
        
        const winRate = totalGames > 0 ? (totalWins / totalGames) * 100 : 0;
        const lossRate = totalGames > 0 ? (totalLosses / totalGames) * 100 : 0;
        const drawRate = totalGames > 0 ? (totalDraws / totalGames) * 100 : 0;
        
        rankings.push({
            strategy,
            winRate,
            lossRate,
            drawRate,
            totalWins,
            totalLosses,
            totalDraws,
            totalGames
        });
    });
    
    rankings.sort((a, b) => b.winRate - a.winRate);
    
    // Strategy icons and colors
    const strategyInfo = {
        'pattern': { icon: '🎯', color: '#007AFF', description: 'Balanced' },
        'aggressive': { icon: '⚔️', color: '#FF3B30', description: 'Attacker' },
        'defensive': { icon: '🛡️', color: '#34C759', description: 'Defender' },
        'positional': { icon: '♟️', color: '#AF52DE', description: 'Tactician' },
        'material': { icon: '🔢', color: '#FF9500', description: 'Counter' }
    };
    
    // Medal icons for rankings
    const medals = ['🥇', '🥈', '🥉', '🏅', '🏅'];
    
    const rankingsList = document.getElementById('rankingsList');
    if (rankingsList) {
        rankingsList.innerHTML = rankings.map((rank, index) => {
            const info = strategyInfo[rank.strategy];
            const medal = medals[index] || '🏅';
            const performanceClass = rank.winRate >= 60 ? 'excellent' : rank.winRate >= 50 ? 'good' : rank.winRate >= 40 ? 'average' : 'poor';
            
            return `
                <div class="ranking-item enhanced ${performanceClass}" style="border-left: 4px solid ${info.color};">
                    <div class="ranking-left">
                        <span class="ranking-medal">${medal}</span>
                        <span class="ranking-position">#${index + 1}</span>
                        <div class="strategy-info">
                            <span class="strategy-icon">${info.icon}</span>
                            <div class="strategy-details">
                                <span class="strategy-name" style="color: ${info.color};">${rank.strategy.charAt(0).toUpperCase() + rank.strategy.slice(1)}</span>
                                <span class="strategy-type">${info.description}</span>
                            </div>
                        </div>
                    </div>
                    <div class="ranking-stats-enhanced">
                        <div class="win-rate-bar">
                            <div class="win-rate-fill" style="width: ${rank.winRate}%; background: linear-gradient(90deg, ${info.color}40, ${info.color});"></div>
                            <span class="win-rate-text">${rank.winRate.toFixed(1)}%</span>
                        </div>
                        <div class="detailed-stats">
                            <span class="stat-item wins">🏆 ${rank.totalWins}</span>
                            <span class="stat-item losses">💔 ${rank.totalLosses}</span>
                            <span class="stat-item draws">🤝 ${rank.totalDraws}</span>
                            <span class="stat-total">📊 ${rank.totalGames} total</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
}

function displayMatchupMatrix() {
    const strategies = fullStatsData.strategies;
    const matrixTable = document.getElementById('matrixTable');
    
    // Strategy info with enhanced icons and colors
    const strategyInfo = {
        'pattern': { icon: '🎯', color: '#007AFF', bgColor: 'rgba(0, 122, 255, 0.15)', name: 'Pattern' },
        'aggressive': { icon: '⚔️', color: '#FF3B30', bgColor: 'rgba(255, 59, 48, 0.15)', name: 'Aggressive' },
        'defensive': { icon: '🛡️', color: '#34C759', bgColor: 'rgba(52, 199, 89, 0.15)', name: 'Defensive' },
        'positional': { icon: '♟️', color: '#AF52DE', bgColor: 'rgba(175, 82, 222, 0.15)', name: 'Positional' },
        'material': { icon: '🔢', color: '#FF9500', bgColor: 'rgba(255, 149, 0, 0.15)', name: 'Material' }
    };
    
    if (matrixTable) {
        let html = '<div class="matrix-table-enhanced">';
        
        // Enhanced title section with gradient and icons
        html += '<div class="matrix-title-section">';
        html += '<div class="matrix-main-title">';
        html += '<span class="title-icon">🏆</span>';
        html += '<h3>Head-to-Head Win Rate Matrix</h3>';
        html += '<span class="title-icon">⚔️</span>';
        html += '</div>';
        html += '<div class="matrix-subtitle">';
        html += '<div class="axis-explanation-fixed">';
        html += '<div class="x-player-indicator-fixed">🔴 X Players (First Move)</div>';
        html += '<div class="vs-divider">VS</div>';
        html += '<div class="o-player-indicator-fixed">🔵 O Players (Second Move)</div>';
        html += '</div>';
        html += '<div class="reading-guide">💡 <em>Each cell shows X player\'s win rate against O player</em></div>';
        html += '</div>';
        html += '</div>';
        
        // Enhanced corner header with gradient
        html += '<div class="matrix-corner-header">';
        html += '<div class="corner-content">';
        html += '<span class="corner-x">🔴 X</span>';
        html += '<span class="corner-divider">\\</span>';
        html += '<span class="corner-o">🔵 O</span>';
        html += '</div>';
        html += '</div>';
        
        // Enhanced column headers (O players)
        strategies.forEach(strategy => {
            const info = strategyInfo[strategy];
            html += `<div class="matrix-header-enhanced o-player" style="background: ${info.bgColor}; border-color: ${info.color};">
                <div class="strategy-header-content">
                    <span class="strategy-player-icon">🔵</span>
                    <span class="strategy-icon">${info.icon}</span>
                    <div class="strategy-header-text">
                        <span class="strategy-header-name" style="color: ${info.color};">${info.name}</span>
                        <span class="strategy-header-role">Second Move</span>
                    </div>
                </div>
            </div>`;
        });
        
        // Enhanced data rows
        strategies.forEach(strategy1 => {
            const info1 = strategyInfo[strategy1];
            
            // Row header (X player)
            html += `<div class="matrix-header-enhanced x-player" style="background: ${info1.bgColor}; border-color: ${info1.color};">
                <div class="strategy-header-content">
                    <span class="strategy-player-icon">🔴</span>
                    <span class="strategy-icon">${info1.icon}</span>
                    <div class="strategy-header-text">
                        <span class="strategy-header-name" style="color: ${info1.color};">${info1.name}</span>
                        <span class="strategy-header-role">First Move</span>
                    </div>
                </div>
            </div>`;
            
            // Data cells - NO BACKGROUND COLORS
            strategies.forEach(strategy2 => {
                const result = fullStatsData.results[strategy1][strategy2];
                const info1 = strategyInfo[strategy1];
                const info2 = strategyInfo[strategy2];
                
                if (result.games === 0) {
                    html += '<div class="matrix-cell-enhanced-clean no-data"><span class="no-data-icon">⏳</span><span class="no-data-text">No Data</span></div>';
                } else {
                    const winRate = ((result.wins / result.games) * 100).toFixed(1);
                    const winRateInt = parseInt(winRate);
                    
                    let cellClass = 'matrix-cell-enhanced-clean';
                    let performanceIcon = '';
                    let performanceText = '';
                    let cellColor = '';
                    
                    if (winRateInt >= 80) {
                        performanceIcon = '🔥';
                        performanceText = 'Dominant';
                        cellColor = '#FF6B35';
                    } else if (winRateInt >= 70) {
                        performanceIcon = '✨';
                        performanceText = 'Excellent';
                        cellColor = '#4ECDC4';
                    } else if (winRateInt >= 60) {
                        performanceIcon = '👍';
                        performanceText = 'Good';
                        cellColor = '#45B7D1';
                    } else if (winRateInt >= 40) {
                        performanceIcon = '⚖️';
                        performanceText = 'Balanced';
                        cellColor = '#FFA07A';
                    } else if (winRateInt >= 20) {
                        performanceIcon = '😔';
                        performanceText = 'Struggling';
                        cellColor = '#FF7F7F';
                    } else {
                        performanceIcon = '💔';
                        performanceText = 'Dominated';
                        cellColor = '#FF4757';
                    }
                    
                    // Special styling for mirror matches
                    if (strategy1 === strategy2) {
                        performanceIcon = '🪞';
                        performanceText = 'Mirror';
                        cellColor = '#9B59B6';
                    }
                    
                    html += `<div class="${cellClass}" 
                        style="border-left-color: ${info1.color}; border-top-color: ${info2.color};"
                        title="${performanceIcon} ${info1.name} (🔴 X) vs ${info2.name} (🔵 O): ${performanceText} - ${result.wins} wins, ${result.losses} losses, ${result.draws} draws out of ${result.games} games">
                        <div class="cell-performance">
                            <span class="performance-indicator" style="color: ${cellColor};">${performanceIcon}</span>
                            <span class="performance-label">${performanceText}</span>
                        </div>
                        <div class="cell-winrate">
                            <span class="winrate-main">${winRate}%</span>
                            <div class="winrate-bar">
                                <div class="winrate-fill" style="width: ${winRate}%; background: linear-gradient(90deg, ${cellColor}80, ${cellColor});"></div>
                            </div>
                        </div>
                        <div class="cell-details">
                            <span class="wins-count">🏆${result.wins}</span>
                            <span class="games-total">📊${result.games}</span>
                        </div>
                    </div>`;
                }
            });
        });
        
        html += '</div>';
        
        // Add legend
        html += '<div class="matrix-legend">';
        html += '<h4>📖 Performance Guide</h4>';
        html += '<div class="legend-items">';
        html += '<div class="legend-item"><span class="legend-icon">🔥</span><span>Dominant (80%+)</span></div>';
        html += '<div class="legend-item"><span class="legend-icon">✨</span><span>Excellent (70-79%)</span></div>';
        html += '<div class="legend-item"><span class="legend-icon">👍</span><span>Good (60-69%)</span></div>';
        html += '<div class="legend-item"><span class="legend-icon">⚖️</span><span>Balanced (40-59%)</span></div>';
        html += '<div class="legend-item"><span class="legend-icon">😔</span><span>Struggling (20-39%)</span></div>';
        html += '<div class="legend-item"><span class="legend-icon">💔</span><span>Dominated (<20%)</span></div>';
        html += '<div class="legend-item"><span class="legend-icon">🪞</span><span>Mirror Match</span></div>';
        html += '</div>';
        html += '</div>';
        
        matrixTable.innerHTML = html;
    }
}
// Enhanced Detailed Results with better formatting and visual elements
function displayDetailedResults() {
    const strategies = fullStatsData.strategies;
    const detailsList = document.getElementById('detailsList');
    
    const strategyInfo = {
        'pattern': { icon: '🎯', color: '#007AFF' },
        'aggressive': { icon: '⚔️', color: '#FF3B30' },
        'defensive': { icon: '🛡️', color: '#34C759' },
        'positional': { icon: '♟️', color: '#AF52DE' },
        'material': { icon: '🔢', color: '#FF9500' }
    };
    
    if (detailsList) {
        let html = '<div class="detail-header-enhanced">';
        html += '<div class="detail-col-matchup"><span>🥊</span><span>Matchup Details</span></div>';
        html += '<div class="detail-col-stat"><span>🏆</span><span>Wins</span></div>';
        html += '<div class="detail-col-stat"><span>💔</span><span>Losses</span></div>';
        html += '<div class="detail-col-stat"><span>🤝</span><span>Draws</span></div>';
        html += '<div class="detail-col-stat"><span>📈</span><span>Win Rate</span></div>';
        html += '</div>';
        
        // Group by X strategy for better organization
        strategies.forEach(strategy1 => {
            const info1 = strategyInfo[strategy1];
            
            // Add strategy section header
            html += `<div class="strategy-section-header" style="border-left: 4px solid ${info1.color};">
                <span class="section-icon">${info1.icon}</span>
                <strong>${strategy1.charAt(0).toUpperCase() + strategy1.slice(1)} as X Player (First Move)</strong>
            </div>`;
            
            strategies.forEach(strategy2 => {
                const result = fullStatsData.results[strategy1][strategy2];
                if (result.games > 0) {
                    const info2 = strategyInfo[strategy2];
                    const winRate = ((result.wins / result.games) * 100).toFixed(1);
                    const winRateNum = parseFloat(winRate);
                    
                    let performanceClass = 'performance-neutral';
                    let performanceIcon = '➖';
                    if (winRateNum >= 70) { performanceClass = 'performance-excellent'; performanceIcon = '🔥'; }
                    else if (winRateNum >= 60) { performanceClass = 'performance-good'; performanceIcon = '✨'; }
                    else if (winRateNum >= 40) { performanceClass = 'performance-average'; performanceIcon = '⚖️'; }
                    else { performanceClass = 'performance-poor'; performanceIcon = '❄️'; }
                    
                    html += `<div class="detail-item-enhanced ${performanceClass}">`;
                    html += `<div class="detail-col-matchup">
                        <div class="matchup-visual">
                            <span class="player-x" style="color: ${info1.color};">${info1.icon} ${strategy1.charAt(0).toUpperCase() + strategy1.slice(1)}</span>
                            <span class="vs-text">vs</span>
                            <span class="player-o" style="color: ${info2.color};">${info2.icon} ${strategy2.charAt(0).toUpperCase() + strategy2.slice(1)}</span>
                        </div>
                    </div>`;
                    html += `<div class="detail-col-stat stat-wins">${result.wins}</div>`;
                    html += `<div class="detail-col-stat stat-losses">${result.losses}</div>`;
                    html += `<div class="detail-col-stat stat-draws">${result.draws}</div>`;
                    html += `<div class="detail-col-stat stat-winrate">
                        <span class="performance-icon">${performanceIcon}</span>
                        <span class="winrate-value">${winRate}%</span>
                        <div class="mini-bar">
                            <div class="mini-bar-fill" style="width: ${winRate}%;"></div>
                        </div>
                    </div>`;
                    html += '</div>';
                }
            });
        });
        
        detailsList.innerHTML = html;
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    const hotBlockingToggle = document.getElementById('hotBlocking');
    if (hotBlockingToggle) {
        hotBlockingToggle.addEventListener('change', resetGame);
    }
    
    const aiHotBlockingToggle = document.getElementById('aiHotBlocking');
    if (aiHotBlockingToggle) {
        aiHotBlockingToggle.addEventListener('change', resetGame);
    }
    
    const aiVsAiHotBlockingToggle = document.getElementById('aiVsAiHotBlocking');
    if (aiVsAiHotBlockingToggle) {
        aiVsAiHotBlockingToggle.addEventListener('change', resetGame);
    }
    
    const statsHotBlockingToggle = document.getElementById('statsHotBlocking');
    if (statsHotBlockingToggle) {
        statsHotBlockingToggle.addEventListener('change', function() {
            // No need to reset game in statistics mode
        });
    }
    
    const aiDifficultySelect = document.getElementById('aiDifficulty');
    if (aiDifficultySelect) {
        aiDifficultySelect.addEventListener('change', function() {
            aiDifficulty = parseInt(this.value);
        });
    }
    
    const aiStrategySelect = document.getElementById('aiStrategy');
    if (aiStrategySelect) {
        aiStrategySelect.addEventListener('change', function() {
            aiStrategy = this.value;
        });
    }
    
    const sharedDepthSelect = document.getElementById('sharedDepth');
    if (sharedDepthSelect) {
        sharedDepthSelect.addEventListener('change', function() {
            sharedDepth = parseInt(this.value);
        });
    }
    
    const aiXStrategySelect = document.getElementById('aiXStrategy');
    if (aiXStrategySelect) {
        aiXStrategySelect.addEventListener('change', function() {
            aiXStrategy = this.value;
            updateStrategyDescription('aiXStrategy', 'aiXDescription');
        });
    }
    
    const aiOStrategySelect = document.getElementById('aiOStrategy');
    if (aiOStrategySelect) {
        aiOStrategySelect.addEventListener('change', function() {
            aiOStrategy = this.value;
            updateStrategyDescription('aiOStrategy', 'aiODescription');
        });
    }
    const hotBlockingLabel = document.getElementById('hotBlockingLabel');
    if (hotBlockingLabel){ hotBlockingLabel.style.display = 'inline-block'; }   // ברירת-מחדל: human

// Enhanced Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Add smooth entrance animation to game container
    const gameContainer = document.querySelector('.game-container');
    if (gameContainer) {
        gameContainer.style.opacity = '0';
        gameContainer.style.transform = 'translateY(50px) scale(0.95)';
        
        setTimeout(() => {
            gameContainer.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            gameContainer.style.opacity = '1';
            gameContainer.style.transform = 'translateY(0) scale(1)';
        }, 100);
    }
    
    // Add hover sound effects (visual feedback)
    function addHoverEffects() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.addEventListener('mouseenter', function() {
                if (!this.classList.contains('blocked') && this.textContent === '') {
                    this.style.transform = 'translateY(-2px) scale(1.02)';
                    this.style.transition = 'all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)'; /* מהיר יותר */
                }
            });
            
            cell.addEventListener('mouseleave', function() {
                if (!this.classList.contains('blocked')) {
                    this.style.transform = 'translateY(0) scale(1)';
                }
            });
        });
    }
    
    // Add ripple effect to buttons
    function addRippleEffect(button) {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
    
    // Add ripple CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .cell-highlight {
            animation: cellHighlight 0.6s ease-out;
        }
        
        @keyframes cellHighlight {
            0% { 
                box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7);
                transform: scale(1);
            }
            70% { 
                box-shadow: 0 0 0 10px rgba(102, 126, 234, 0);
                transform: scale(1.05);
            }
            100% { 
                box-shadow: 0 0 0 0 rgba(102, 126, 234, 0);
                transform: scale(1);
            }
        }
        
        .mode-transition {
            animation: modeTransition 0.5s ease-out;
        }
        
        @keyframes modeTransition {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
        }
        
        .winner-fireworks {
            position: relative;
            overflow: visible;
        }
        
        .firework {
            position: absolute;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            animation: firework 1s ease-out forwards;
        }
        
        @keyframes firework {
            0% {
                opacity: 1;
                transform: scale(0);
            }
            50% {
                opacity: 1;
                transform: scale(1);
            }
            100% {
                opacity: 0;
                transform: scale(1) translate(var(--dx), var(--dy));
            }
        }
        
        .floating-symbol {
            position: absolute;
            pointer-events: none;
            font-size: 2rem;
            font-weight: bold;
            opacity: 0;
            animation: floatUp 2s ease-out forwards;
        }
        
        @keyframes floatUp {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-100px) scale(0.5);
            }
        }
        
        @keyframes thinkingPulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
        }
        
        .thinking-dots {
            margin-left: 5px;
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);
    
    // Apply ripple effect to all buttons
    const buttons = document.querySelectorAll('.reset-btn, .stats-btn, .mode-btn, .primary-button');
    buttons.forEach(addRippleEffect);
    
    // Enhanced cell click animation
    function enhancedCellClick(cell, player) {
        // Add highlight animation
        cell.classList.add('cell-highlight');
        
        // Create floating symbol effect
        const floatingSymbol = document.createElement('div');
        floatingSymbol.textContent = player;
        floatingSymbol.className = `floating-symbol ${player}`;
        floatingSymbol.style.left = '50%';
        floatingSymbol.style.top = '50%';
        floatingSymbol.style.transform = 'translate(-50%, -50%)';
        floatingSymbol.style.zIndex = '1000';
        
        cell.appendChild(floatingSymbol);
        
        setTimeout(() => {
            cell.classList.remove('cell-highlight');
            floatingSymbol.remove();
        }, 2000);
    }
    
    // Fireworks effect for winner
    function createFireworks(element) {
        element.classList.add('winner-fireworks');
        
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.className = 'firework';
                firework.style.background = colors[Math.floor(Math.random() * colors.length)];
                firework.style.left = '50%';
                firework.style.top = '50%';
                
                const angle = (Math.PI * 2 * i) / 20;
                const distance = 100 + Math.random() * 50;
                const dx = Math.cos(angle) * distance;
                const dy = Math.sin(angle) * distance;
                
                firework.style.setProperty('--dx', dx + 'px');
                firework.style.setProperty('--dy', dy + 'px');
                
                element.appendChild(firework);
                
                setTimeout(() => {
                    firework.remove();
                }, 1000);
            }, i * 50);
        }
    }
    
    // Smooth mode transitions
    function smoothModeTransition(targetElement) {
        targetElement.style.opacity = '0';
        targetElement.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            targetElement.style.transition = 'all 0.5s ease-out';
            targetElement.style.opacity = '1';
            targetElement.style.transform = 'translateY(0)';
            targetElement.classList.add('mode-transition');
        }, 100);
    }
    
    // Enhanced board update with animations
    const originalUpdateDisplay = window.updateDisplay;
    window.updateDisplay = function() {
        if (typeof originalUpdateDisplay === 'function') {
            originalUpdateDisplay();
        }
        
        // Re-add hover effects after board update
        addHoverEffects();
        
        // Check for winner and add fireworks
        const gameStatus = document.getElementById('gameStatus');
        if (gameStatus && gameStatus.innerHTML.includes('Wins!')) {
            setTimeout(() => {
                createFireworks(gameStatus);
            }, 500);
        }
    };
    
    // Enhanced make move with animation
    const originalMakeMove = window.makeMove;
    window.makeMove = function(index) {
        const cell = document.querySelectorAll('.cell')[index];
        const currentPlayer = window.currentPlayer;
        
        if (typeof originalMakeMove === 'function') {
            const result = originalMakeMove(index);
            
            // Add enhanced animation if move was successful
            if (cell && cell.textContent && cell.textContent !== '') {
                enhancedCellClick(cell, currentPlayer);
            }
            
            return result;
        }
    };
    
    // Smooth page transitions
    function addPageTransitions() {
        const aiSettings = document.getElementById('aiSettings');
        const gameControls = document.getElementById('gameControls');
        const statisticsSettings = document.getElementById('statisticsSettings');
        
        // Override setGameMode for smooth transitions
        const originalSetGameMode = window.setGameMode;
        window.setGameMode = function(mode) {
            // Fade out current content
            const activeElements = [aiSettings, gameControls, statisticsSettings].filter(el => 
                el && (el.classList.contains('show') || el.style.display !== 'none')
            );
            
            activeElements.forEach(el => {
                el.style.transition = 'opacity 0.3s ease-out';
                el.style.opacity = '0';
            });
            
            setTimeout(() => {
                if (typeof originalSetGameMode === 'function') {
                    originalSetGameMode(mode);
                }
                
                // Fade in new content
                setTimeout(() => {
                    const newActiveElements = [aiSettings, gameControls, statisticsSettings].filter(el => 
                        el && (el.classList.contains('show') || el.style.display !== 'none')
                    );
                    
                    newActiveElements.forEach(el => {
                        smoothModeTransition(el);
                    });
                }, 100);
            }, 300);
        };
    }
    

    
    // Add loading animation for AI moves
    function addAIThinkingAnimation() {
        const originalRunAiVsAi = window.runAiVsAi;
        
        window.runAiVsAi = function(fastMode) {
            if (!fastMode) {
                const currentPlayerDiv = document.getElementById('currentPlayer');
                if (currentPlayerDiv && currentPlayerDiv.innerHTML.includes('Thinking')) {
                    // Add thinking animation
                    const dots = document.createElement('span');
                    dots.innerHTML = '<span class="thinking-dots">...</span>';
                    dots.style.animation = 'thinkingPulse 1.5s ease-in-out infinite';
                    currentPlayerDiv.appendChild(dots);
                }
            }
            
            if (typeof originalRunAiVsAi === 'function') {
                return originalRunAiVsAi(fastMode);
            }
        };
    }
    
    // Initialize all enhancements
    addHoverEffects();
    addPageTransitions();
    // addParallaxEffect();
    addAIThinkingAnimation();
    
    // Add smooth scroll for long content
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add focus animations for form elements
    const formElements = document.querySelectorAll('select, input');
    formElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        element.addEventListener('blur', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    console.log('🎮 Enhanced game interface loaded with premium animations!');
});
    // Initialize strategy descriptions
    updateStrategyDescription('aiXStrategy', 'aiXDescription');
    updateStrategyDescription('aiOStrategy', 'aiODescription');

    // Initialize game
    initGame();
});
