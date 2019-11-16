import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import { VgPlayer, VgAPI } from 'videogular2/core';
import { AlertPromise } from 'selenium-webdriver';
import {Observable} from 'rxjs/Rx';
import {Subscription} from "rxjs";
import { FormsModule } from '@angular/forms';
import { IMediaSubscriptions } from 'videogular2/src/core/vg-media/i-playable';



@Component({
  selector: 'app-player-panel',
  templateUrl: './player-panel.component.html',
  styleUrls: ['./player-panel.component.css']
})
export class PlayerPanelComponent implements OnInit {

  msgDebug : Boolean=false;
  srcName : String;
  // fileURL:String="";
  fileURL: SafeUrl=""; 
  visiblePlayer : Boolean=true;
  msg : String="";
  private timer;
  private timerSubscribe: Subscription;
  private onPlayObservable : Observable<IMediaSubscriptions>;
  private onPauseObservable : Observable<IMediaSubscriptions>;

  waitTime : number=15;

  ticks =0;
  ngOnInit(){

    // let timer = Observable.timer(wait,wait);
    // this.visiblePlayer=true;
    // timer.subscribe(t=>this.ticks = t);
  }


  hideShowVideo(){
    this.visiblePlayer=!(this.visiblePlayer);
  }

  onPlayerReady(api: VgAPI) {
    this.msg="onPlayerReady";
    this.api = api;
    this.onPlayObservable=this.api.getDefaultMedia().subscriptions.play;
    this.setOnPlayEvent();
    this.onPauseObservable=this.api.getDefaultMedia().subscriptions.pause;
    this.setOnPauseEvent();
    }

     setOnPlayEvent(){
      this.msg="setOnPlayEvent";
      this.onPlayObservable.subscribe(
        () => {
              this.startWaiting();
        }
      );
     }

     setOnPauseEvent(){
      this.msg="setOnPauseEvent";
      this.onPauseObservable.subscribe(
        () => {
              this.stopWaiting();
        }
      );
     }     
     
     stopWaiting(){
      this.msg="startPause";
      this.timerSubscribe.unsubscribe();
     }

     pauseAfterTimeout(){
          // Set pause 
          this.api.pause();
          this.msg="pauseAfterTimeout";
          this.visiblePlayer=false;
          // this.setOnPlayEvent();

     }



    

     startWaiting(){
      this.msg="startWaiting";
      let wait=this.waitTime*1000;
      // wait=5000;
      this.timer = Observable.timer(wait);
      // subscribing to a observable returns a subscription object
      this.timerSubscribe = this.timer.subscribe((t) => {
        this.pauseAfterTimeout();
      });
 }

  constructor(private sanitizer:DomSanitizer,private api: VgAPI) { }

 

  setVideo(){

    
    console.log(this.srcName);
     this.fileURL="https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4";

  }


  pauseVideo(){
    this.api.pause();
  }

  playVideo(){
    this.visiblePlayer=true;
    this.api.play();
    console.log("playVideo waitTime="+this.waitTime);
  }

  fileChange(event) {

    var files = event.srcElement.files;
    var file = files[0];
    this.fileURL = this.sanitize(URL.createObjectURL(file));
        // this.fileURL = URL.createObjectURL(file);
    console.log(files);
    console.log("fileURL=["+this.fileURL+"]");
    // this.fileURL="https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4";
    console.log(this.fileURL);
    // this.fileURL=this.safeURL;
  }

  sanitize(url:string){

    if (url=="" )
      return url;
    else
      return this.sanitizer.bypassSecurityTrustUrl(url);
}

a(){

  alert("Click");
}


onNumberChanged(event){

  this.waitTime=event;
}

}