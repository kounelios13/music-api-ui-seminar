import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsListComponent } from './components/groups-list/groups-list.component';
import { SongListComponent } from './components/song-list/song-list.component';
import { GenresListComponent } from './components/genres-list/genres-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo : 'groups',
    pathMatch: 'full'
  },
  {
    path: 'groups',
    component : GroupsListComponent
  },
  {
    path: 'songs',
    component: SongListComponent
  },
  {
    path: 'genres',
    component: GenresListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
