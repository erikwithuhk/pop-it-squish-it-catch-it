class GameTargetView {
  constructor(id) {
    this.gameTarget = new GameTarget();
    this.id = id;
    this.diameter = null;
    this.top = null;
    this.el = document.createElement('div');
  }
  setClickListener() {
    this.el.addEventListener('click', (e) => {
      this.el.style.transition = 'all 0.5s';
      this.el.style.opacity = 0;
      this.el.style.height = '20rem';
      this.el.style.width = '20rem';
      window.setInterval(() => {
        document.body.removeChild(this.el);
      }, 500);
    });
  }
  setInitialTopValue() {
    // Sets top value to a random number between 0 and 100
    this.top = Math.random() * 100;
    this.el.style.top = `${this.top}%`;
  }
  setInitialDiameter() {
    // Sets height and width values to a random integer between 1 and 10
    this.diameter = Math.floor(Math.random() * 9) + 1;
    this.gameTarget.setPointValue('bubbles', this.diameter);
    this.el.style.height = `${this.diameter}rem`;
    this.el.style.width = `${this.diameter}rem`;
  }
  setOpacity() {
    if (this.diameter < 2) {
      this.el.style.opacity = 1;
    } else if (this.diameter < 5) {
      this.el.style.opacity = 0.75;
    } else if (this.diameter < 8) {
      this.el.style.opacity = 0.5;
    } else {
      this.el.style.opacity = 0.25;
    }
  }
  render() {
    this.el.setAttribute('class', 'circle');
    this.el.setAttribute('id', `circle${this.id}`);
    this.setInitialDiameter();
    this.setOpacity();
    this.setInitialTopValue();
    this.setClickListener();
  }
}
