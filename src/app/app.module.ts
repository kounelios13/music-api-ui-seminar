import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs'
import { GenreService } from './services/genre.service';

import { GenrePipe } from './pipes/genre.pipe';
import { GroupsListComponent } from './components/groups-list/groups-list.component';
import { GenresListComponent } from './components/genres-list/genres-list.component';
import { SongListComponent } from './components/song-list/song-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { GroupCreateModalComponent } from './components/group-create-modal/group-create-modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { GenreCreateModalComponent } from './components/genre-create-modal/genre-create-modal.component';
import { SongCreateModalComponent } from './components/song-create-modal/song-create-modal.component';

function initializeGenres(gs: GenreService){
  return ()=> gs.getGenres();
}

@NgModule({
  declarations: [
    AppComponent,
    GenrePipe,
    GroupsListComponent,
    GenresListComponent,
    SongListComponent,
    ConfirmationDialogComponent,
    GroupCreateModalComponent,
    GenreCreateModalComponent,
    SongCreateModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,    
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeGenres,
      multi: true,
      deps: [GenreService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
