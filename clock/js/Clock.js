'use strict'
const TIMING = 5;
class Clock {
  constructor() {
    this.top = document.getElementById('top');
    this.right = document.getElementById('right');
    this.bottom = document.getElementById('bottom');
    this.left = document.getElementById('left');
    this.clock = document.getElementById('clock');
    this.contentLayer = document.getElementById('content');
    this.contentLayer.addEventListener(
        'transitionend', this.layerontransitionend.bind(this));
    this.allLayers = [this.top, this.right, this.bottom, this.left];
    for (let i in this.allLayers) {
      this.allLayers[i].addEventListener(
          'transitionend', this.ontransitionend.bind(this));
    }

    this.content = [];
    this.translate = {
      'top': 'translateY(100%)',
      'right': 'translateX(-100%)',
      'bottom': 'translateY(-100%)',
      'left': 'translateX(100%)'
    };

    fetch('datas/json/images.json')
        .then(response => response.json())
        .then((data => {
                this.images = data.images;
                this.loadImage();
              }).bind(this));
  }
  loadImage() {
    let img = new Image();
    let shifted = this.images.shift();
    img.onload = (function() {
                   this.content.push(img.src);
                   if (this.images.length > 0) {
                     this.loadImage();
                   } else {
                     this.launchApplication();
                   }
                 }).bind(this);
    img.src = '/datas/' + shifted.url;
  }

  launchApplication() {
    // sound effect
    this.context = new AudioContext();
    this.o = this.context.createOscillator();
    this.g = this.context.createGain();
    this.o.connect(this.g);
    this.o.type = 'sine';
    this.g.connect(this.context.destination);
    this.o.start(0);
    this.g.gain.exponentialRampToValueAtTime(
        0.00001, this.context.currentTime + 0.3);
    // launch timer
    setInterval(this.appear.bind(this), 1000);
  }
  appear() {
    let shifted = this.allLayers.shift();
    shifted.classList.add('show');
    this.allLayers.push(shifted);

    //
    let time = new Date();
    this.clock.innerHTML = this.leading(time.getHours()) + ':' +
        this.leading(time.getMinutes()) + ':' + this.leading(time.getSeconds());
    this.contentLayer.style.visibility = 'visible';
    //
    if (time.getSeconds() % TIMING == 0) {
      if (!this.contentLayer.classList.contains('show')) {
        let shiftedContent = this.content.shift();
        this.contentLayer.style.backgroundImage =
            'url("' + shiftedContent + '")';
        this.contentLayer.style.transform = 'translateY(0px)';
        this.contentLayer.style.transform = 'translateX(0px)';
        this.contentLayer.classList.add('show');
        this.content.push(shiftedContent);
      } else {
        this.previousExit = shifted.id;
        this.contentLayer.style.transform = this.translate[shifted.id];
        this.contentLayer.classList.remove('show');
      }
    }

    // sound effect
    this.o.frequency.value = (time.getSeconds() % 2 == 0) ? 800 : 400;
    this.g.gain.exponentialRampToValueAtTime(1, this.context.currentTime);
    this.g.gain.exponentialRampToValueAtTime(
        0.00001, this.context.currentTime + 0.3);
  }
  ontransitionend(e) {
    if (e.target.classList.contains('show')) {
      for (let i in this.allLayers) {
        if (this.allLayers[i].id != e.target.id) {
          this.allLayers[i].classList.remove('show');
          this.allLayers[i].classList.remove('tmp');
        } else if (this.allLayers[i].classList.contains('show')) {
          this.allLayers[i].classList.add('tmp');
        }
      }
    }
  }
  layerontransitionend(e) {
    if (!this.contentLayer.classList.contains('show')) {
      this.contentLayer.style.visibility = 'hidden';
      // only work for 5 SECOND TIMING
      switch (this.previousExit) {
        case 'top':
          this.contentLayer.style.transform = 'translate(100%,0px)';
          break;
        case 'right':
          this.contentLayer.style.transform = 'translate(0px,100%)';
          break;
        case 'bottom':
          this.contentLayer.style.transform = 'translate(-100%,0px)';
          break;
        case 'left':
          this.contentLayer.style.transform = 'translate(0px,-100%)';
          break;
      }
    }
  }
  leading(nbr) {
    return (nbr < 10) ? '0' + nbr : nbr;
  }
}
window.onload = function() {
  new Clock();
}
