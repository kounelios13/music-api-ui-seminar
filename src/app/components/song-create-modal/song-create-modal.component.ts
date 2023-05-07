import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalMode } from 'src/app/enums/modal-mode.enum';
import { Group } from 'src/app/models/group';
import { Song } from 'src/app/models/song';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-song-create-modal',
  templateUrl: './song-create-modal.component.html',
  styleUrls: ['./song-create-modal.component.css']
})
export class SongCreateModalComponent implements OnInit{
  buttonSuffix  = 'Create'
  form: FormGroup;
  groups: Group[] = [];
  constructor(public dialogRef: MatDialogRef<SongCreateModalComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any,
    private groupService: GroupService,
    private fb: FormBuilder){
      this.form = this.fb.group({
        songName: new FormControl<string>('', Validators.required),
        songURL: new FormControl<string>('', Validators.required),
        groupId: new FormControl<number>(-1, Validators.required)
      });
    }
  async ngOnInit(): Promise<void> {
    const groups = await this.groupService.getGroups();
    this.groups = groups;
    const mode = this.data.mode as ModalMode;
    if(mode == ModalMode.EDIT){
      this.buttonSuffix = 'Edit';
      console.log(this.data.song)
      this.form.patchValue(this.data.song as Song)
    }
  }
  handlePayload(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value)
    }
  }
}
