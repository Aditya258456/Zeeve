class SnakeGame {
  constructor() {
      this.gameArea = document.getElementById('game-area');
      this.scoreElement = document.getElementById('score');
      this.highScoreElement = document.getElementById('high-score');
      
      this.gridSize = 20;
      this.areaWidth = this.gameArea.clientWidth;
      this.areaHeight = this.gameArea.clientHeight;
      
      this.snake = [{x: 100, y: 100}];
      this.food = null;
      this.direction = 'right';
      this.score = 0;
      this.highScore = localStorage.getItem('snakeHighScore') || 0;
      
      this.setupControls();
      this.highScoreElement.textContent = `High Score: ${this.highScore}`;
      
      this.generateFood();
      this.drawSnake();
      this.drawFood();
      
      this.gameInterval = setInterval(() => this.moveSnake(), 200);
  }
  
  setupControls() {
      document.getElementById('up-btn').addEventListener('click', () => this.changeDirection('up'));
      document.getElementById('down-btn').addEventListener('click', () => this.changeDirection('down'));
      document.getElementById('left-btn').addEventListener('click', () => this.changeDirection('left'));
      document.getElementById('right-btn').addEventListener('click', () => this.changeDirection('right'));
      
      document.addEventListener('keydown', (e) => {
          switch(e.key) {
              case 'ArrowUp': this.changeDirection('up'); break;
              case 'ArrowDown': this.changeDirection('down'); break;
              case 'ArrowLeft': this.changeDirection('left'); break;
              case 'ArrowRight': this.changeDirection('right'); break;
          }
      });
  }
  
  generateFood() {
      const maxX = Math.floor(this.areaWidth / this.gridSize);
      const maxY = Math.floor(this.areaHeight / this.gridSize);
      
      this.food = {
          x: Math.floor(Math.random() * maxX) * this.gridSize,
          y: Math.floor(Math.random() * maxY) * this.gridSize
      };
  }
  
  drawSnake() {
      // Hapus snake lama
      const oldSnakes = this.gameArea.querySelectorAll('.snake');
      oldSnakes.forEach(el => el.remove());
      
      // Gambar snake baru
      this.snake.forEach((segment, index) => {
          const snakeEl = document.createElement('div');
          snakeEl.classList.add('snake');
          snakeEl.style.left = `${segment.x}px`;
          snakeEl.style.top = `${segment.y}px`;
          this.gameArea.appendChild(snakeEl);
      });
  }
  
  drawFood() {
      // Hapus makanan lama
      const oldFood = this.gameArea.querySelector('.food');
      if (oldFood) oldFood.remove();
      
      // Gambar makanan baru
      const foodEl = document.createElement('div');
      foodEl.classList.add('food');
      foodEl.style.left = `${this.food.x}px`;
      foodEl.style.top = `${this.food.y}px`;
      this.gameArea.appendChild(foodEl);
  }
  
  moveSnake() {
      const head = {...this.snake[0]};
      
      switch(this.direction) {
          case 'up': head.y -= this.gridSize; break;
          case 'down': head.y += this.gridSize; break;
          case 'left': head.x -= this.gridSize; break;
          case 'right': head.x += this.gridSize; break;
      }
      
      // Periksa tabrakan dinding
      if (head.x < 0 || head.x >= this.areaWidth || 
          head.y < 0 || head.y >= this.areaHeight) {
          this.gameOver();
          return;
      }
      
      // Periksa tabrakan diri sendiri
      if (this.snake.some(segment => 
          segment.x === head.x && segment.y === head.y
      )) {
          this.gameOver();
          return;
      }
      
      // Tambah kepala baru
      this.snake.unshift(head);
      
      // Periksa makan makanan
      if (head.x === this.food.x && head.y === this.food.y) {
          this.score++;
          this.scoreElement.textContent = `Skor: ${this.score}`;
          
          // Update high score
          if (this.score > this.highScore) {
              this.highScore = this.score;
              this.highScoreElement.textContent = `High Score: ${this.highScore}`;
              localStorage.setItem('snakeHighScore', this.highScore);
          }
          
          this.generateFood();
          this.drawFood();
      } else {
          // Hapus ekor jika tidak makan
          this.snake.pop();
      }
      
      this.drawSnake();
  }
  
  changeDirection(newDirection) {
      // Cegah pergerakan mundur
      const oppositeDirections = {
          'up': 'down',
          'down': 'up',
          'left': 'right',
          'right': 'left'
      };
      
      if (oppositeDirections[newDirection] !== this.direction) {
          this.direction = newDirection;
      }
  }
  
  gameOver() {
      clearInterval(this.gameInterval);
      alert(`Game Over! Skor Anda: ${this.score}`);
      location.reload();
  }
}

// Inisialisasi game
document.addEventListener('DOMContentLoaded', () => {
  new SnakeGame();
});