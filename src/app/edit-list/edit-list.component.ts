import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {

  editAddForm!: FormGroup;
  singleRowData: any;
  constructor(public dialogRef: MatDialogRef<EditListComponent>, @Inject(MAT_DIALOG_DATA) public data:any) 
  { 
    this.singleRowData = data;
  }

  ngOnInit(): void {
    this.listFormInitializer();
  }
  listFormInitializer() {
    this.editAddForm = new FormGroup({
      movieName: new FormControl(this.singleRowData.movieName, [Validators.required]),
      movieActor: new FormControl(this.singleRowData.movieActor, [Validators.required]),
      movieActress: new FormControl(this.singleRowData.movieActress, [Validators.required]),
      releaseDate: new FormControl(this.singleRowData.releaseDate, [Validators.required])
    })
    this.editAddForm.markAllAsTouched();
  }

  submitForm() {
    let editListNewData = {
      id: this.singleRowData.id,
      movieName: this.editAddForm.value.movieName,
      movieActor: this.editAddForm.value.movieActor,
      movieActress: this.editAddForm.value.movieActress,
      releaseDate: this.editAddForm.value.releaseDate,
      marked: this.singleRowData.marked
    }
    this.dialogRef.close({"data": editListNewData});
  }
}
