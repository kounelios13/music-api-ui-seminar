import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalMode } from 'src/app/enums/modal-mode.enum';
import { Genre } from 'src/app/models/genre';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-genre-create-modal',
  templateUrl: './genre-create-modal.component.html',
  styleUrls: ['./genre-create-modal.component.css']
})
export class GenreCreateModalComponent implements OnInit {
  buttonSuffix = 'Add';
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<GenreCreateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      genreName: new FormControl<string>('', Validators.required)
    })
  }

  ngOnInit(): void {
    const mode = this.data.mode as ModalMode;
    if (mode == ModalMode.EDIT) {
      this.buttonSuffix = 'Edit';
      const genre = this.data.genre as Genre;
      this.form.get('genreName')?.setValue(genre.genreName)
    }
  }

  handlePayload(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value)
    }
  }
}
