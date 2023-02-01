import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  Input
} from '@angular/core';
import { Router } from '@angular/router';
import { getIdToken } from 'firebase/auth';
import { max } from 'rxjs';

declare const videojs: any;

@Component({
  selector: 'sxm-video',
  templateUrl: './hls.component.html',
})
export class HlsComponent implements OnInit, AfterViewInit {

  // reference to the element itself, we use this to access events and methods
  private _elementRef: ElementRef

  seekbarTracker: any = {
    duration: 0,
    time: 0,
    seekPercent: 0,
    hasDVR: false,
  };

  seekTime: number;
  // // video asset url
  // @Input() url: any;

  // declare player var
  private player: any;

  // constructor initializes our declared vars
  constructor(elementRef: ElementRef,private router: Router) {

    // this.url = false;
    this.player = false;

  }

  bd = 'https://coffeemondo-365813-default-rtdb.firebaseio.com/live/';
  zoomArray = {"zoom":0,"inputLR":0,"inputTB":0}

  EncenderCamara() {
    if (confirm("¿Está seguro de querer encender la cámara?")) {
      var Streaming = true

      var datos = {
        Streaming: Streaming
      }
      var datosJson = JSON.stringify(datos);
      var xhr = new XMLHttpRequest();
      xhr.open('PATCH', this.bd + '.json', true);
      xhr.send(datosJson);
      setTimeout(()=>{
        console.log('Camara encendida')
        this.player.src({
          src: 'https://visionsinc.xyz/hls/test.m3u8'
        });
        this.player.load();
      },6000)
      console.log(this.player.src)
    } else {
      console.log("Cámara no encendida");
    }
  }

  ApagarCamara() {
    if (confirm("¿Está seguro de querer apagar la cámara?")) {
    var Streaming = false
    var datos = {
      Streaming: Streaming
    }
    var datosJson = JSON.stringify(datos);
    var xhr = new XMLHttpRequest();
    xhr.open('PATCH', this.bd + '.json', true);
    xhr.send(datosJson);
    console.log('Camara apagada')
    setTimeout(() =>{
      this.player.src({
        src: 'https://visionsinc.xyz/hls/test.m3u8'
      });
      this.player.load();
    }, 5000)
    
  } else {
    console.log("Cámara no encendida");
  }
  }
  sendData(datos){
    var datosJson = JSON.stringify(datos);
    var xhr = new XMLHttpRequest();
    xhr.open('PATCH', this.bd + '.json', true);
    xhr.send(datosJson);
  }
  
  ZoomIn(){
    this.zoomArray['zoom']+=1
    if (this.zoomArray['zoom'] >= 9){
      this.zoomArray['zoom'] = 9
    }
    var datos = {
      zoomInput: this.zoomArray
    }
    this.sendData(datos)


  }
  ZoomOut(){
    this.zoomArray['zoom']-=1;
    if (this.zoomArray['zoom'] <= 0){
      this.zoomArray['zoom'] = 0;
      this.zoomArray['inputTB'] = 0;
      this.zoomArray['inputLR'] = 0; 
    }
    var valueY = this.maxPositionY()
    if (this.zoomArray['inputTB']  >= valueY){
      this.zoomArray['inputTB'] = valueY
    }
    if (this.zoomArray['inputTB']  <= -valueY){
      this.zoomArray['inputTB'] = -valueY
    } 
    var datos = {
      zoomInput: this.zoomArray
    }
    var ValueX = this.maxPositionX()
    if (this.zoomArray['inputLR'] >= ValueX){
      this.zoomArray['inputLR'] = ValueX
    }
    if (this.zoomArray['inputLR'] <= - ValueX){
      this.zoomArray['inputLR'] = -ValueX
    }
    this.sendData(datos)
    
  
  }
  maxPositionY(){
    var cantZoom = this.zoomArray['zoom']
    var maxY = (cantZoom * 5 )* 5
    return maxY
  }

  moveY(valor:number){
    this.zoomArray['inputTB'] += valor
    var maxValue = this.maxPositionY()
    if (this.zoomArray['inputTB'] > maxValue ){
     this.zoomArray['inputTB'] = maxValue
    }
    if (this.zoomArray['inputTB'] < -maxValue) {
      this.zoomArray['inputTB'] = -maxValue
    }
    var datos = {
      zoomInput: this.zoomArray
    }
    this.sendData(datos)
  }
  maxPositionX(){
    var maxX = ((this.zoomArray['zoom'] * 5 ) * 2 ) * 3
    return maxX
  }

  moveX(valor:number){
    this.zoomArray['inputLR'] += valor
    var maxValue = this.maxPositionX()
    if (this.zoomArray['inputLR'] > maxValue){
      this.zoomArray['inputLR'] = maxValue
    }
    if (this.zoomArray['inputLR'] < -maxValue){
      this.zoomArray['inputLR'] = -maxValue
    }
    var datos = {
      zoomInput: this.zoomArray
    }
    this.sendData(datos)
  }


  ngOnInit() { }


  // use ngAfterViewInit to make sure we initialize the videojs element
  // after the component template itself has been rendered

  ngAfterViewInit() {
    const self = this;
    this.player = videojs(document.getElementById('sxmvideo'));
    console.log(this.player);
    this.player.muted(true);
    this.player.on('timeupdate', () => {
      let hasDVR = false;
      let duration = Math.floor(this.getDuration(this.player) * 1000);
      let time;
      let seekPercent;
      // this.player.controls(true);
      console.log(this.player.currentTime(), this.getDuration(this.player));

      // if(duration) {
      //   this.seekbarTracker.duration = duration;

      //   // constrain time
      //   time = Math.floor(Math.max(0, Math.min(duration, this.player.currentTime() * 1000)));
      //   this.seekbarTracker.time = time; 
      //   seekPercent = time / duration;
      //   if(seekPercent !== this.seekbarTracker.seekPercent) {
      //     this.onSeekPercentChange(this.player, seekPercent, duration);
      //   }
      //   this.seekbarTracker.seekPercent = seekPercent;

      //   // duration is not Infinity, so if isLive() returns true, then player should have DVR.
      //   hasDVR = this.isLive();
      // }

      // this.seekbarTracker.hasDVR = hasDVR;
    });
  }

  getDuration(player) {
    var seekable = player.seekable();
    return seekable && seekable.length ? seekable.end(0) - seekable.start(0) : 0;
  }

  onSeekPercentChange(player, seekPercent, duration) {
    var seekable = player.seekable();

    if (seekable && seekable.length) {
      // constrain currentTime
      player.currentTime(Math.max(0, Math.min(seekable.end(0), seekable.start(0) + (seekPercent * duration))));
    }
  }

  isLive() {
    if (!isFinite(this.player.duration())) {
      return true;
    }

    var acceptableDelay = 30;
    var seekable = this.player.seekable();
    return seekable && seekable.length && seekable.end(0) - this.player.currentTime() < acceptableDelay;
  }

  ngOnDestroy() {

    // this.player.dispose();
  }

  seek(n) {
    this.player.currentTime(this.seekTime || 1266);
  }
  play(n) {

    if (this.player.paused()) {
      this.player.play();
    }
    else {
      this.player.pause();
    }
  }

  create() {
    //     this.player.src({
    //   src: 'https://oocache-live-delivery-ooyala.akamaized.net/out/u/d8npqvovi8we5/110326/U3cWNvZjE6xpWi6dq7FE2Q8B362hEbfl/en/cc984f46656c4ecc889711165c08b378.m3u8'
    // });

    this.player.src({
      src: ' https://oocache-live-delivery-ooyala.akamaized.net/out/u/d8npqvovi8we5/110326/N5cmNvZjE6U3nnGeGa0yVC66Gaw-NWxS/en/fda8ba2dd9554ad2b668277730469fea.m3u8'

    });
    this.player.play();
    // this.player.controlBar.currentTimeDisplay();  
  }

  destroy() {

  }

}