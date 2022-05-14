import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongListComponent } from './song-list/song-list.component';

const routes: Routes = [
  {
    path: '',
    component: SongListComponent,
  },
  {
    path: 'songs/keyword/:keyword',
    component: SongListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
