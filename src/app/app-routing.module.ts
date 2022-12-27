import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { InfoPageComponent } from './info-page/info-page.component';
import { SongSearchPageComponent } from './song-search-page/song-search-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'info',
    component: InfoPageComponent,
  },
  {
    path: ':brandName/imasSongs/keyword/:keyword',
    component: SongSearchPageComponent,
  },
  {
    path: ':brandName/imasSongs/songName/:songName',
    component: SongSearchPageComponent,
  },
  {
    path: ':brandName/imasSongs/liveEvent/:liveEventId',
    component: SongSearchPageComponent,
  },
  {
    path: ':brandName',
    component: HomePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
