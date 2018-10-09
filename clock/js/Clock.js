'use strict'
let TIMING = 5;
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

    this._singleVideo = json.singleVideo;
    this.SETTING = json.setting;
    /* TO UNCOMMENT IF USING A LOCAL SERVER */
    // fetch('datas/json/images.json')
    //     .then(response => response.json())
    //     .then((data => {
    //             this._content = data.images;
    //             this.loadContent();
    //           }).bind(this));

    // WORKAROUND to use the script without LOCAL server
    /* TO COMMENT IF USING A LOCAL SERVER*/
    this._content = json.images;
    this.loadContent();
  }
  loadContent() {
    let shifted = this._content.shift();
    // check if we have a video (.mp4)
    if (shifted.url != undefined) {
      if (shifted.url.toLowerCase().indexOf('.mp4') != -1) {
        console.log('video');
        let video = document.createElement('video');
        // video.setAttribute('autoplay', '');
        video.setAttribute('loop', '');
        video.pause();
        // video.setAttribute('muted', '');
        video.onloadeddata =
            (function() {
              this.content.push({'data': video, 'text': shifted.text});
              if (this._content.length > 0) {
                this.loadContent();
              } else {
                this.launchApplication();
              }
            }).bind(this);
        video.src = 'datas/' + shifted.url;

      } else {
        console.log('image');
        let img = new Image();
        img.onload = (function() {
                       this.content.push({'data': img, 'text': shifted.text});
                       if (this._content.length > 0) {
                         this.loadContent();
                       } else {
                         this.launchApplication();
                       }
                     }).bind(this);
        img.src = 'datas/' + shifted.url;
      }
    }
  }

  launchApplication() {
    console.log('launch app');
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

    TIMING = this.SETTING.slide_duration;
    // launch timer
    setInterval(this.appear.bind(this), 1000);
    // add interaction
    document.addEventListener('click', this.onClick.bind(this));
    // Twitter
    let _stream =
        twitter.stream('statuses/filter', {track: 'popular', lang: 'en'});
    this.twitt = '';
    _stream.on('data', (function(event) {
                         // console.log(event);
                         this.twitt = event.text;
                       }).bind(this));
  }
  onClick(e) {
    let percentage = e.clientX / window.innerWidth;
    // go to that particular time
    if (this.video) {
      this.video.currentTime = percentage * this.video.duration;
    }
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
        TIMING = this.SETTING.content_duration;
        this.shiftedContent = this.content.shift();

        if (this._singleVideo.url && this.contentLayer.children.length == 0) {
          this.contentLayer.innerHTML = '';
          this.video = document.createElement('video');
          this.video.setAttribute('autoplay', '');
          this.video.setAttribute('loop', '');
          // video.setAttribute('muted', '');
          this.video.src = 'datas/' + this._singleVideo.url;
          this.totalTime = this.video.duration;
          this.contentLayer.appendChild(this.video);
          // video.muted = 'muted';
          this.video.play();
        } else if (!this._singleVideo.url) {
          /*
            We have to check if it's an image or a video
          */
          // console.log(this.shiftedContent.src);
          if (this.shiftedContent.data.src.toLowerCase().indexOf('.mp4') !=
              -1) {
            this.contentLayer.innerHTML = '';
            this.shiftedContent.data.play();
            this.contentLayer.appendChild(this.shiftedContent.data);
            this.totalTime = this.shiftedContent.data.duration;

          } else {
            this.contentLayer.innerHTML = '';
            // images
            this.contentLayer.style.backgroundImage =
                'url("' + this.shiftedContent.data.src + '")';
          }

          /*
            LET'S ADD SOME TEXT CONTENT
          */
          let textLayer = document.createElement('div');
          textLayer.className = 'textLayer';
          // TWITTER OPTION
          // textLayer.textContent = this.twitt;
          textLayer.textContent = this.shiftedContent.text;
          this.contentLayer.appendChild(textLayer);
          this.content.push(this.shiftedContent);
        }

        if (this._singleVideo.url) {
          let timing = this._singleVideo.timing.shift();
          this._singleVideo.timing.push(timing);
          this.video.currentTime = timing;  // percentage * this.video.duration;
        }

        this.contentLayer.style.transform = 'translateY(0px)';
        this.contentLayer.style.transform = 'translateX(0px)';
        this.contentLayer.classList.add('show');

      } else {
        this.previousExit = shifted.id;
        this.contentLayer.style.transform = this.translate[shifted.id];
        this.contentLayer.classList.remove('show');
        if (this.shiftedContent != undefined &&
            this.shiftedContent.data.src.toLowerCase().indexOf('.mp4') != -1) {
          // console.log(this.shiftedContent, 'should pause');
          this.shiftedContent.data.pause();
        } else {
          // console.log('no content', this.shiftedContent);
        }
        TIMING = this.SETTING.slide_duration;
      }
    }  //

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
    // console.log(TIMING);
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
