import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SongListComponent } from './song-list/song-list.component';
import { MaterialModule } from '../material.module';
import { SongSearchComponent } from './song-search/song-search.component';
import { LiveEventListComponent } from './live-event-list/live-event-list.component';

@NgModule({
  declarations: [AppComponent, SongListComponent, SongSearchComponent, LiveEventListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
