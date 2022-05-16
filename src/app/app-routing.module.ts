import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongSearchComponent } from './song-search/song-search.component';

const routes: Routes = [
  {
    path: '',
    component: SongSearchComponent,
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
