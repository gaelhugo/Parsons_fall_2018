'use strict';
let ZOOM_LEVEL = 17;
class App {
  constructor() {
    console.log('new app');
    this.map;
    this.infoWindow;
    this.canvas = document.getElementsByTagName('canvas')[0];
    this.w = this.canvas.width = window.innerWidth;
    this.h = this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');
    this.initMap();
  }

  // Note: This example requires that you consent to location sharing when
  // prompted by your browser. If you see the error "The Geolocation service
  // failed.", it means you probably did not give permission for the browser to
  // locate you.
  initMap() {
    this.overlay = new google.maps.OverlayView();
    this.map = new google.maps.Map(
        document.getElementById('map'),
        {center: {lat: -34.397, lng: 150.644}, zoom: 6});
    this.infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      console.log('geolocation ok');
      navigator.geolocation.getCurrentPosition(
          (function(position) {
            let pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            this.latlng = new google.maps.LatLng(pos.lat, pos.lng);

            this.infoWindow.setPosition(pos);
            this.infoWindow.setContent('Location found.');
            this.infoWindow.open(this.map);
            this.map.setCenter(pos);
            this.map.setZoom(ZOOM_LEVEL);

            this.map.addListener(
                'idle',
                (function(event) {
                  let point = this.fromLatLngToPixel(this.latlng);
                  console.log(point.x, point.y, this.ctx);
                  this.ctx.strokeStyle = 'red';
                  this.ctx.arc(
                      point.x, point.y, window.innerHeight / 2.5, 0,
                      Math.PI * 2, false);
                  this.ctx.stroke();

                  for (let i = 0; i < 12; i++) {
                    let x = point.x +
                        Math.cos((i * 30) * Math.PI / 180) *
                            window.innerHeight / 2.5;
                    let y = point.y +
                        Math.sin((i * 30) * Math.PI / 180) *
                            window.innerHeight / 2.5;
                    let latlng = this.fromPixelToLatLng({'x': x, 'y': y});
                    new google.maps.Marker({position: latlng, map: this.map});
                  }

                  this.launchSeconds();

                }).bind(this));


          }).bind(this),


          (function() {
            handleLocationError(true, infoWindow, this.map.getCenter());
          }).bind(this));


    } else {
      // Browser doesn't support Geolocation
      console.log('error with geolocation');
      this.handleLocationError(false, infoWindow, this.map.getCenter());
    }
  }

  handleLocationError(browserHasGeolocation, infoWindow, pos) {
    this.infoWindow.setPosition(pos);
    this.infoWindow.setContent(
        browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
    this.infoWindow.open(map);
  }


  fromLatLngToPixel(position) {
    let scale = Math.pow(2, this.map.getZoom());
    let proj = this.map.getProjection();
    let bounds = this.map.getBounds();
    // console.log(proj);

    let nw = proj.fromLatLngToPoint(new google.maps.LatLng(
        bounds.getNorthEast().lat(), bounds.getSouthWest().lng()));
    let point = proj.fromLatLngToPoint(position);

    return new google.maps.Point(
        Math.floor((point.x - nw.x) * scale),
        Math.floor((point.y - nw.y) * scale));
  }

  fromPixelToLatLng(pixel) {
    let scale = Math.pow(2, this.map.getZoom());
    let proj = this.map.getProjection();
    let bounds = this.map.getBounds();

    let nw = proj.fromLatLngToPoint(new google.maps.LatLng(
        bounds.getNorthEast().lat(), bounds.getSouthWest().lng()));
    let point = new google.maps.Point();

    point.x = pixel.x / scale + nw.x;
    point.y = pixel.y / scale + nw.y;

    return proj.fromPointToLatLng(point);
  }

  launchSeconds() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    let center = this.fromLatLngToPixel(this.latlng);
    let time = new Date();

    let seconds = this.getTopPosition(
        time.getSeconds(), 6, window.innerHeight / 2.5, center);
    let hours = this.getTopPosition(
        time.getHours() + (time.getMinutes() / 60), 30, window.innerHeight / 4,
        center);
    let minutes = this.getTopPosition(
        time.getMinutes(), 6, window.innerHeight / 2.5, center);

    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = 'blue';
    this.ctx.beginPath();
    this.ctx.moveTo(center.x, center.y);
    this.ctx.lineTo(minutes.x, minutes.y);
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.strokeStyle = 'blue';
    this.ctx.beginPath();
    this.ctx.moveTo(center.x, center.y);
    this.ctx.lineTo(hours.x, hours.y);
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = 'red';
    this.ctx.beginPath();
    this.ctx.moveTo(center.x, center.y);
    this.ctx.lineTo(seconds.x, seconds.y);
    this.ctx.stroke();
    this.ctx.closePath();

    // UPDATE STREETVIEW
    if (time.getSeconds() % 5 == 0) {
      console.log('now');
      let latlng = this.fromPixelToLatLng(minutes);
      let fenway = {lat: latlng.lat(), lng: latlng.lng()};
      let panorama =
          new google.maps.StreetViewPanorama(document.getElementById('pano'), {
            position: fenway,
            pov: {heading: time.getSeconds() * 6, pitch: 10},
            motionTracking: false,
            motionTrackingControl: false,
            panControl: false,
            zoomControl: false,
            enableCloseButton: false,
            linksControl: false,
            fullscreenControl: false,
            StreetViewAddressControlOptions: false,
            addressControl: false,
          });
    }
    setTimeout(this.launchSeconds.bind(this), 1000);
  }
  getTopPosition(time, degree, ratio, center) {
    let x = center.x + Math.cos((time * degree - 90) * Math.PI / 180) * ratio;
    let y = center.y + Math.sin((time * degree - 90) * Math.PI / 180) * ratio;
    return {'x': x, 'y': y};
  }
}

window.onload = function() {
  new App();
}
