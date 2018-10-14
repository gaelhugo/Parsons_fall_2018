class Test {
  constructor() {
    console.log('load app');
    this.grey = 100;
    this.allImages = ['2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '1.jpg'];
    this.img = document.getElementById('test_img');
    this.img.onload = (function() {
                        // this.img.width =
                        this.img.style.width = this.img.width;
                        this.img.style.height = this.img.height;
                        this.img.style.webkitFilter =
                            'grayscale(' + this.grey + '%)';
                      }).bind(this);
    this.img.src = 'datas/images/1.jpg';
    setInterval(this.changeImage.bind(this), 2000);
    this.draw();
  }

  draw() {
    this.grey -= 0.1;
    if (this.grey <= 0) {
      this.grey = 100;
      console.log('grey');
    }
    this.img.style.webkitFilter = 'grayscale(' + Math.round(this.grey) + '%)';
    requestAnimationFrame(this.draw.bind(this));
  }
  changeImage() {
    let shifted = this.allImages.shift();
    this.allImages.push(shifted);
    this.img.src = 'datas/images/' + shifted;
  }
}

window.onload = function() {
  new Test();
}
