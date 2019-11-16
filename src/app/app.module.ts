import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// import { NumberPickerComponent } from 'angular2-number-picker/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PlayerPanelComponent } from './player-panel/player-panel.component';


// videogular
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';


@NgModule({
  declarations: [
    AppComponent,
    PlayerPanelComponent,
    // NumberPickerComponent
  ],
  imports: [
    BrowserModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    FormsModule, 
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
