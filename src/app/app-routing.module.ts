import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoComponent } from './info/info.component';
import { SongSearchComponent } from './song-search/song-search.component';

const routes: Routes = [
  {
    path: '',
    component: SongSearchComponent,
  },
  {
    path: 'info',
    component: InfoComponent,
  },
  {
    path: 'imasSongs/keyword/:keyword',
    component: SongSearchComponent,
  },
  {
    path: 'imasSongs/songName/:songName',
    component: SongSearchComponent,
  },
  {
    path: 'imasSongs/ranking/:rankingBrandName',
    component: SongSearchComponent,
  },
  {
    path: 'imasSongs/liveEvent/:liveEventId',
    component: SongSearchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
