import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss']
})
export class AddListComponent implements OnInit {

  listAddForm!: FormGroup;
  wholeData: any = [];
  constructor(public dialogRef: MatDialogRef<AddListComponent>, @Inject(MAT_DIALOG_DATA) public data:any ) 
  { 
    this.wholeData = data;
  }

  ngOnInit(): void {
    this.listFormInitializer();
  }
  listFormInitializer() {
    this.listAddForm = new FormGroup({
      movieName: new FormControl('', [Validators.required]),
      movieActor: new FormControl('', [Validators.required]),
      movieActress: new FormControl('', [Validators.required]),
      releaseDate: new FormControl('', [Validators.required])
    })
    this.listAddForm.markAllAsTouched();
    this.preventDuplicates();
  }

  submitForm() {
    let addListNewData = {
      movieName: this.listAddForm.value.movieName,
      movieActor: this.listAddForm.value.movieActor,
      movieActress: this.listAddForm.value.movieActress,
      releaseDate: this.listAddForm.value.releaseDate,
      marked: "UnMarked"
    }
    this.dialogRef.close({"data": addListNewData});
  }
  preventDuplicates() {
    this.listAddForm.valueChanges.subscribe((response) => {
      this.preventDuplicate();
    })
  }
  preventDuplicate() {
    let movieControl = this.listAddForm.controls['movieName'];
    let error = movieControl.errors;
    error = error ? error : {}
    this.wholeData.forEach((element:any) => {
      if(element.movieName == this.listAddForm.value.movieName) {
        error!["custom"] = { message: "Movie Name already having in a Movie List" };
        movieControl.setErrors(error ? error : null);
      }
    });
  }
}
