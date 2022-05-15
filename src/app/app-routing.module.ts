import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongSearchComponent } from './song-search/song-search.component';

const routes: Routes = [
  {
    path: '',
    component: SongSearchComponent,
  },
  {
    path: 'songs/keyword/:keyword',
    component: SongSearchComponent,
  },
  {
    path: 'songs/songName/:songName',
    component: SongSearchComponent,
  },
  {
    path: 'imasSongs/ranking/:rankingBrandName',
    component: SongSearchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
