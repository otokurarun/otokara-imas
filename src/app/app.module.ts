import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SongCardComponent } from './shared/song-card/song-card.component';
import { MaterialModule } from '../material.module';
import { SongListComponent } from './shared/song-list/song-list.component';
import { LiveEventListComponent } from './home-page/live-event-list/live-event-list.component';
import { InfoPageComponent } from './info-page/info-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SongSearchPageComponent } from './song-search-page/song-search-page.component';
import { SongSearchFormComponent } from './shared/song-search-form/song-search-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SongCardComponent,
    SongListComponent,
    LiveEventListComponent,
    InfoPageComponent,
    HomePageComponent,
    SongSearchPageComponent,
    SongSearchFormComponent,
  ],
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
