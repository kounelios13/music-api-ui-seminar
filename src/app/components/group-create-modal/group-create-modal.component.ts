import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Genre } from 'src/app/models/genre';
import { Group } from 'src/app/models/group';
import { GenreService } from 'src/app/services/genre.service';
enum ModalMode {
  EDIT = 'edit',
  CREATE = 'create'
}
@Component({
  selector: 'app-group-create-modal',
  templateUrl: './group-create-modal.component.html',
  styleUrls: ['./group-create-modal.component.css']
})
export class GroupCreateModalComponent implements OnInit{
  genreIds = [1, 2, 3]
  genres : Genre[] = [];
  public form: FormGroup;
  constructor(

    public dialogRef: MatDialogRef<GroupCreateModalComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any,
    private genreService: GenreService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      groupName: new FormControl<string>("", Validators.required),
      description: new FormControl<string>("", Validators.required),
      groupGenreID: new FormControl<number | null>(null, Validators.required)
    });
  }

  buttonTitleSuffix = 'Add'
  async ngOnInit(): Promise<void> {
    const genres  = await this.genreService.getGenres();
    this.genres = genres
    const mode = this.data.mode as ModalMode;
    if (mode == ModalMode.EDIT){
      this.buttonTitleSuffix = 'Edit'
      const group = this.data.group as Group;
      this.form.get('groupName')?.setValue(group.groupName);
      this.form.get('description')?.setValue(group.description);
      this.form.get('groupGenreID')?.setValue(group.groupGenreID);
    }
  }
  submitForm(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value)
    }
  }
}
