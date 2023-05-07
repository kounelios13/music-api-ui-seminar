import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Group } from 'src/app/models/group';
import { GroupService } from 'src/app/services/group.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { firstValueFrom } from 'rxjs';
import { GroupCreateModalComponent } from '../group-create-modal/group-create-modal.component';
import { ModalMode } from 'src/app/enums/modal-mode.enum';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit , AfterViewInit {
  groups: Group[] = [];
  columns = ['id', 'groupName', 'description', 'groupGenreID','actions'];
  dataSource: MatTableDataSource<Group> = new MatTableDataSource<Group>(this.groups);
  @ViewChild('paginator') paginator: MatPaginator | undefined;
  constructor(private groupService: GroupService , private dialog : MatDialog) { }
  async ngOnInit(): Promise<void> {
    this.groups = await this.groupService.getGroups();
    console.log('init groups finished', this.groups)
    this.dataSource = new MatTableDataSource<Group>(this.groups);
    if(this.paginator){
      this.dataSource.paginator = this.paginator;
    }
  }
  ngAfterViewInit(): void {
    console.log(this.paginator , this.groups)
    this.dataSource = new MatTableDataSource(this.groups);
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
    if (result){
      const apiResult = await this.groupService.deleteGroup(id);
      this.dataSource = new MatTableDataSource(apiResult);
    }
  }

  async openCreateDialog() : Promise<void>{
    const ref = this.dialog.open(GroupCreateModalComponent,{
      width: '500px',
      data : {
        mode: ModalMode.CREATE
      }
    });
    const close$ = ref.afterClosed();
    const result = await firstValueFrom(close$);
    if (result != null){
      try{
        const apires = await this.groupService.createGroup(result);
        this.dataSource = new MatTableDataSource(apires);
        if(this.paginator){
          this.dataSource.paginator = this.paginator;
        }
        alert('Group created');
      }catch(e){
        console.log(e);
        alert(e);
      }
    }
  }

  async openEditDialog(id: number, group : Group): Promise<void>{
    const ref  = this.dialog.open(GroupCreateModalComponent , {
      'width': '500px',
      data:{
        mode: ModalMode.EDIT,
        group
      }
    });

    const close$ = ref.afterClosed();
    const result = await firstValueFrom(close$);
    if (result != null){
      try{
        const apires = await this.groupService.editGroup(id,result);
        this.dataSource = new MatTableDataSource(apires);
        alert('Group edited');
      }catch(e){
        console.log(e);
        alert(e);
      }
    }
  }
}
