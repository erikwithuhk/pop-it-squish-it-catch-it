class RoundView {
  constructor(round, timerView, scoreView) {
    this.round = round || new Round();
    this.timerView = timerView || new TimerView();
    this.scoreView = scoreView || new ScoreView();
    this.targetId = 1;
    this.el = document.createElement('div');
    this.startEl = document.createElement('div');
    this.parentNode = document.querySelector('main');
    this.generationInterval = null;
  }
  generateGameTargets() {
    const gameTargetView = new GameTargetView(this.targetId);
    this.round.addGameTarget(gameTargetView.gameTarget);
    gameTargetView.render();
    this.setClickListener(gameTargetView);
    this.el.appendChild(gameTargetView.el);
    this.targetId += 1;
  }
  setClickListener(gameTargetView) {
    const gameTargetNode = gameTargetView.el;
    gameTargetNode.addEventListener('click', () => {
      gameTargetNode.style.transition = 'all 0.5s';
      gameTargetNode.style.opacity = 0;
      gameTargetNode.style.height = '20rem';
      gameTargetNode.style.width = '20rem';
      gameTargetView.gameTarget.setPointValue('bubbles', gameTargetView.diameter);
      this.scoreView.render();
      setTimeout(() => {
        gameTargetNode.style.display = 'none';
      }, 500);
    });
  }
  clearGameTargets() {
    clearInterval(this.generationInterval);
    const targetNodes = document.querySelectorAll('.circle');
    targetNodes.forEach((target) => {
      document.querySelector('.board').removeChild(target);
    });
  }
  removeClass(node, classToRemove) {
    const classes = node.getAttribute('class');
    const classesArray = classes.split(' ');
    classesArray.forEach((classToCompare, i) => {
      if (classToRemove === classToCompare) {
        classesArray.splice(i, 1);
      }
    });
    const updatedClass = classesArray.join(' ');
    this.el.setAttribute('class', updatedClass);
  }
  startRound() {
    this.el.setAttribute('class', 'board');
    this.el.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    this.startEl.setAttribute('class', 'start');
    this.startEl.innerHTML = 'Start!';
    this.el.appendChild(this.startEl);
    this.parentNode.appendChild(this.el);
  }
  endRound() {
    this.el.style.opacity = 1;
    this.el.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
    this.clearGameTargets();
  }
  render() {
    this.startEl.style.opacity = '0';
    this.startEl.style.fontSize = '125vh';
    setTimeout(() => {
      this.el.removeChild(this.startEl);
    }, 1000);
    this.el.style.backgroundColor = 'rgba(255, 255, 255, 0)';
    this.timerView.render();
    this.timerView.appendToBoard(this.el);
    this.scoreView.render();
    this.scoreView.appendToBoard(this.el);
    this.parentNode.appendChild(this.el);
    this.generationInterval = setInterval(() => { this.generateGameTargets(); }, 500);
  }
}
