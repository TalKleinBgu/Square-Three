# Square-Three Game 🎯

An advanced web-based strategy game combining traditional tic-tac-toe with unique square-winning mechanics and sophisticated AI opponents.

## 🎮 Game Overview

**Square-Three** is an innovative 4×4 grid game where players can win in two ways:
- **Line Victory**: Get 4 in a row (horizontal, vertical, or diagonal)
- **Square Victory**: Control all 4 corners of any 2×2 square

The game features multiple AI strategies, comprehensive statistics tracking, and an optional "Hot Adjacency Blocking" mechanic that prevents moves adjacent to the last played position.

## ✨ Features

### 🎯 Game Modes
- **Human vs Human**: Classic two-player mode
- **Human vs AI**: Challenge sophisticated AI opponents
- **AI vs AI**: Watch AI strategies battle each other
- **Multi-Game Statistics**: Comprehensive analysis of AI strategy performance

### 🤖 AI Strategies
1. **Pattern-Based** 🎯: Balanced approach focusing on both offensive and defensive patterns
2. **Aggressive** ⚔️: Prioritizes creating winning threats and attacking patterns
3. **Defensive** 🛡️: Focuses on blocking opponent threats and defensive play
4. **Positional** ♟️: Emphasizes board control and strategic positioning
5. **Material** 🔢: Simple strategy based on token count and basic evaluation

### 📊 Advanced Analytics
- **Strategy Rankings**: Performance comparison across all AI strategies
- **Head-to-Head Matrix**: Win rates for every strategy combination
- **Detailed Results**: Comprehensive breakdown of matchup statistics
- **Visual Performance Indicators**: Color-coded performance metrics

### 🎨 User Interface
- **Glassmorphism Design**: Modern translucent interface with blur effects
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Premium visual effects and transitions
- **Interactive Elements**: Hover effects, ripple animations, and visual feedback

## 🚀 Quick Start

### Installation
1. Download the HTML file
2. Open in any modern web browser
3. No additional setup required!

### How to Play
1. **Choose Game Mode**: Select from Human vs Human, Human vs AI, AI vs AI, or Statistics
2. **Configure Settings**: Adjust AI difficulty, strategy, and hot blocking rules
3. **Make Your Move**: Click on any legal cell to place your symbol
4. **Win Conditions**: 
   - Get 4 in a row (any direction)
   - Control all corners of a 2×2 square

## 🎮 Game Rules

### Basic Rules
- Players alternate turns placing X and O symbols
- Game is played on a 4×4 grid (16 total cells)
- First player is always X

### Winning Conditions
1. **Line Victory**: Four symbols in a row
   - Horizontal: Any complete row
   - Vertical: Any complete column  
   - Diagonal: Main diagonal or anti-diagonal

2. **Square Victory**: Control all four corners of any 2×2 square
   - 9 possible 2×2 squares on the board
   - Often creates surprise victories

### Hot Adjacency Blocking
When enabled (default), players cannot place their symbol adjacent (horizontally or vertically) to the last move played. This mechanic:
- Adds strategic depth
- Prevents simple blocking strategies
- Creates more dynamic gameplay
- Can be toggled on/off

## 🤖 AI System

### Minimax Algorithm
- Uses advanced minimax with alpha-beta pruning
- Configurable search depth (2-6 levels)
- Multiple evaluation functions for different strategies
- Randomization for varied gameplay

### Strategy Details

#### Pattern-Based (Balanced)
- Evaluates both offensive and defensive patterns
- Balanced scoring for lines and squares
- Good all-around performance
- Recommended for beginners

#### Aggressive (Attacker)
- Heavily weights creating threats
- High scores for near-wins
- Less defensive focus
- Exciting, dynamic play style

#### Defensive (Defender)  
- Prioritizes blocking opponent threats
- Strong penalty for allowing opponent patterns
- Cautious, solid gameplay
- Excellent against aggressive opponents

#### Positional (Tactician)
- Emphasizes board control
- Center and corner positioning bonuses
- Strategic long-term planning
- Complex positional understanding

#### Material (Counter)
- Simple piece counting strategy
- Basic pattern recognition
- Fastest computation
- Good baseline strategy

### Difficulty Levels
- **Depth 2**: Very Easy - Quick decisions, limited lookahead
- **Depth 3**: Easy - Basic tactical awareness
- **Depth 4**: Medium - Good strategic play (recommended)
- **Depth 5**: Hard - Strong tactical calculation
- **Depth 6**: Expert - Deep strategic analysis

## 📊 Statistics System

### Strategy Rankings
- Overall win rate for each strategy
- Total games, wins, losses, and draws
- Performance ratings and medals
- Visual progress bars

### Head-to-Head Matrix
- Win rates for every strategy combination
- Color-coded performance indicators
- First player (X) vs Second player (O) analysis
- Mirror match analysis

### Performance Categories
- 🔥 **Dominant** (80%+ win rate)
- ✨ **Excellent** (70-79% win rate)
- 👍 **Good** (60-69% win rate)
- ⚖️ **Balanced** (40-59% win rate)
- 😔 **Struggling** (20-39% win rate)
- 💔 **Dominated** (<20% win rate)

### Statistical Testing
- Configurable test parameters
- Multiple games per strategy combination
- Both X and O positions tested
- Real-time progress tracking

## 🔧 Customization

### Settings You Can Adjust
- **AI Difficulty**: Depth 2-6 for different challenge levels
- **AI Strategy**: Choose from 5 different evaluation functions
- **Hot Blocking**: Enable/disable adjacency restrictions
- **Test Parameters**: Customize statistical analysis
- **Visual Preferences**: Game responds to user interactions

### Advanced Features
- **AI vs AI Battles**: Watch different strategies compete
- **Comprehensive Testing**: Run hundreds of games automatically
- **Performance Analysis**: Detailed statistical breakdowns
- **Strategy Comparison**: Head-to-head matchup analysis



**Enjoy playing Square-Three!** 🎮✨

*A modern take on classic strategy gaming with cutting-edge AI opponents and beautiful design.*
