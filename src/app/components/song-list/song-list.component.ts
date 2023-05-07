import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Song } from 'src/app/models/song';
import { SongsService } from 'src/app/services/songs.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SongCreateModalComponent } from '../song-create-modal/song-create-modal.component';
import { ModalMode } from 'src/app/enums/modal-mode.enum';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit, AfterViewInit {

  songs: Song[] = [];
  columns = ['id', 'songName', 'songURL', 'groupId', 'actions'];
  dataSource: MatTableDataSource<Song> = new MatTableDataSource(this.songs);
  @ViewChild('paginator') paginator: MatPaginator | undefined;
  constructor(private songService: SongsService, private dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    this.songs = await this.songService.getSongs();
    this.dataSource.data = this.songs;
  }

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource(this.songs);
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  async openDialog(id: number): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: 'Are you sure you want to delete this item?' }
    });

    const close$ = dialogRef.afterClosed();
    const result = await firstValueFrom<boolean>(close$);
    if (result) {
      const apiResult = await this.songService.deleteSong(id);
      this.dataSource = new MatTableDataSource(apiResult);
    }
  }

  async openCreateDialog(): Promise<void> {
    const ref = this.dialog.open(SongCreateModalComponent, {
      width: '500px',
      data: {
        mode: ModalMode.CREATE
      }
    });
    const close$ = ref.afterClosed();
    const result = await firstValueFrom(close$);
    if (result != null) {
      try {
        await this.songService.createSong(result);
        this.songs = await this.songService.getSongs();
        this.dataSource.data = this.songs;
        this.dataSource = new MatTableDataSource(this.songs);
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        alert('Song created');
      } catch (e) {
        console.log(e);
        alert(e);
      }
    }
  }

  async openEditDialog(id: number, song: Song): Promise<void> {
    const ref = this.dialog.open(SongCreateModalComponent, {
      'width': '500px',
      data: {
        mode: ModalMode.EDIT,
        song
      }
    });

    const close$ = ref.afterClosed();
    const result = await firstValueFrom(close$);
    if (result != null) {
      try {
        await this.songService.editSong(id, result);
        this.songs = await this.songService.getSongs();
        this.dataSource.data = this.songs;
        alert('Group edited');
      } catch (e) {
        console.log(e);
        alert(e);
      }
    }
  }
}
