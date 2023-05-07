import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Genre } from 'src/app/models/genre';
import { GenreService } from 'src/app/services/genre.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { firstValueFrom } from 'rxjs';
import { GenreCreateModalComponent } from '../genre-create-modal/genre-create-modal.component';
import { ModalMode } from 'src/app/enums/modal-mode.enum';
import { Group } from 'src/app/models/group';
import { GroupCreateModalComponent } from '../group-create-modal/group-create-modal.component';

@Component({
  selector: 'app-genres-list',
  templateUrl: './genres-list.component.html',
  styleUrls: ['./genres-list.component.css']
})
export class GenresListComponent {

  private genres : Genre[] = [];
  columns = ['id', 'genreName' , 'actions'];
  dataSource: MatTableDataSource<Genre> = new MatTableDataSource<Genre>([]);
  constructor(private genreService: GenreService , private dialog: MatDialog) { }
  async ngOnInit(): Promise<void> {
    this.genres = await this.genreService.getGenres();
    this.dataSource = new MatTableDataSource<Genre>(this.genres);
  }

   async openDialog(id: number): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: 'Are you sure you want to delete this item?' }
    });

    const close$ = dialogRef.afterClosed();
    const result = await firstValueFrom<boolean>(close$);
    if (result){
      const apiResult = await this.genreService.deleteGenre(id);
      this.dataSource = new MatTableDataSource(apiResult);
    }
  }

  async openCreateDialog() : Promise<void>{
    const ref = this.dialog.open(GenreCreateModalComponent,{
      width: '500px',
      data : {
        mode: ModalMode.CREATE
      }
    });
    const close$ = ref.afterClosed();
    const result = await firstValueFrom(close$);
    if (result != null){
      try{
        const apires = await this.genreService.createGenre(result);
        this.dataSource = new MatTableDataSource(apires);
        alert('Genre created');
      }catch(e){
        console.log(e);
        alert(e);
      }
    }
  }

  async openEditDialog(id: number, genre : Genre): Promise<void>{
    const ref  = this.dialog.open(GenreCreateModalComponent , {
      'width': '500px',
      data:{
        mode: ModalMode.EDIT,
        genre
      }
    });

    const close$ = ref.afterClosed();
    const result = await firstValueFrom(close$);
    if (result != null){
      try{
        const apires = await this.genreService.editGenre(id,result);
        this.dataSource = new MatTableDataSource(apires);
        alert('Genre edited');
      }catch(e){
        console.log(e);
        alert(e);
      }
    }
  }
}
