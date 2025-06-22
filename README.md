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

## 🎨 Design Features

### Visual Elements
- **Glassmorphism**: Translucent panels with backdrop blur
- **Gradient Backgrounds**: Dynamic color transitions
- **Particle Effects**: Subtle floating background elements
- **Smooth Animations**: CSS transitions and keyframe animations

### Interactive Feedback
- **Hover Effects**: Visual feedback on interactive elements
- **Ripple Animations**: Button click feedback
- **Symbol Animation**: Smooth symbol placement
- **Victory Celebrations**: Fireworks and special effects

### Responsive Design
- **Mobile Optimized**: Touch-friendly interface
- **Landscape Detection**: Rotation suggestions for mobile
- **Adaptive Layout**: Scales to different screen sizes
- **Portrait Mode**: Simplified interface for narrow screens

## 🛠️ Technical Details

### Browser Compatibility
- **Chrome**: Fully supported (recommended)
- **Firefox**: Fully supported
- **Safari**: Fully supported
- **Edge**: Fully supported
- **Mobile Browsers**: Optimized support

### Performance
- **Lightweight**: Single HTML file under 100KB
- **No Dependencies**: Pure HTML, CSS, and JavaScript
- **Fast Rendering**: Optimized animations and effects
- **Efficient AI**: Alpha-beta pruning for speed

### Code Structure
```
├── HTML Structure
│   ├── Game Container
│   ├── Mode Selection
│   ├── AI Settings
│   ├── Game Board
│   └── Statistics Display
├── CSS Styling
│   ├── Glassmorphism Effects
│   ├── Responsive Layout
│   ├── Animations
│   └── Component Styles
└── JavaScript Logic
    ├── Game Engine
    ├── AI System
    ├── Statistics Tracking
    └── UI Management
```

## 🎯 Strategy Tips

### For Human Players
1. **Control the Center**: Central positions offer more winning opportunities
2. **Watch for Squares**: Don't focus only on lines - squares can surprise you
3. **Use Hot Blocking**: When enabled, use it to limit opponent options
4. **Plan Ahead**: Think about opponent responses to your moves

### AI Strategy Insights
- **Aggressive** beats **Material** consistently
- **Defensive** counters **Aggressive** well
- **Positional** excels in longer games
- **Pattern** provides balanced performance
- First player (X) advantage varies by strategy

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

## 📱 Mobile Experience

### Portrait Mode Features
- Simplified interface for narrow screens
- Larger touch targets for easier play
- Rotation suggestions for better experience
- Essential features maintained

### Landscape Mode Features
- Full desktop-like experience
- Complete statistics display
- Optimal board size
- All features available

## 🎉 Fun Facts

- Over 65,000 possible game states
- 9 different 2×2 squares can create victories
- AI strategies show distinct personalities
- Hot blocking creates 2^16 different rule variations
- Statistics system can track millions of games

## 🚀 Future Enhancements

### Potential Features
- **Tournament Mode**: Bracket-style competitions
- **Custom AI**: User-defined evaluation functions
- **Game History**: Save and replay games
- **Multiplayer**: Online player vs player
- **Themes**: Different visual styles
- **Sound Effects**: Audio feedback

### Advanced AI
- **Neural Networks**: Machine learning opponents
- **Opening Books**: Predefined strong openings
- **Endgame Tables**: Perfect play databases
- **Adaptive Difficulty**: AI that learns from player skill

## 🔍 Troubleshooting

### Common Issues
- **Slow Performance**: Try reducing AI depth
- **Mobile Layout**: Rotate device for better experience
- **Statistics Not Loading**: Ensure sufficient memory available
- **Animation Lag**: Close other browser tabs

### Browser Requirements
- **JavaScript**: Must be enabled
- **Modern CSS**: CSS3 support required
- **Memory**: 50MB+ recommended for statistics
- **Screen**: 320px minimum width

## 📄 License

This game is provided as-is for educational and entertainment purposes. Feel free to modify and share!

## 🤝 Contributing

Interested in improving the game? Consider these areas:
- Additional AI strategies
- New visual themes
- Performance optimizations
- Mobile enhancements
- Accessibility improvements

---

**Enjoy playing Square-Three!** 🎮✨

*A modern take on classic strategy gaming with cutting-edge AI opponents and beautiful design.*
