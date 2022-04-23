import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AddListComponent } from '../add-list/add-list.component';
import { EditListComponent } from '../edit-list/edit-list.component';
import { ListServiceService } from '../Services/list-service.service';
@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {
  listDatacolumns: any;
  moviesData: MatTableDataSource<object>;
  listDisplayColumns: any;
  allMoviesData: any = [];
  @ViewChild(MatPaginator, { static: false }) set matPaginator(paginator: MatPaginator) {
    this.moviesData.paginator = paginator;
  }

  constructor(private listServices: ListServiceService, public dialog: MatDialog, public snack: MatSnackBar) {
    this.moviesData = new MatTableDataSource<object>();
  }

  ngOnInit(): void {
    this.getAllColumns();
    this.getDataOfAllList();
  }
  getAllColumns() {
    this.listServices.getAllColumns().subscribe((response) => {
      this.listDatacolumns = response;
      this.listDisplayColumns = this.listDatacolumns.map((x: any) => x.columnName);
    });
  }

  getDataOfAllList() {
    this.listServices.getAllList().subscribe((response: any) => {
      this.allMoviesData = response;
      this.moviesData = new MatTableDataSource<any>(response);
    })
  }

  applyFilter(getfilterValue: any) {
    const filterValue = getfilterValue.target.value;
    this.moviesData.filter = filterValue.trim().toLowerCase();
    if (this.moviesData.paginator) {
      this.moviesData.paginator.firstPage();
    }
  }

  EditList(editSingleRow: any) {
    let dialogRef = this.dialog.open(EditListComponent, {
      data: editSingleRow,
    })
    dialogRef.afterClosed().subscribe((response) => {
      if (response.data != null || response.data != undefined) {
        this.listServices.editSingleList(response.data.id, response.data).subscribe((response) => {
          this.getDataOfAllList();
          this.snack.open("Row Edit SuccessFully", "Done", {
            duration: 1000,
            panelClass: ['success-snackbar'],
          })
        })
      }
    })
  }
  AddList() {
    let dialogRef = this.dialog.open(AddListComponent, {
      data: this.allMoviesData,
    })
    dialogRef.afterClosed().subscribe((response) => {
      if (response.data != null || response.data != undefined) {
        let movieId = this.allMoviesData.length - 1;
        let finalMovieId = this.allMoviesData[movieId].id + 1;
        let data = response.data;
        data["id"] = finalMovieId;
        data["marked"] = "UnMarked";
        this.listServices.addSingleList(data).subscribe((response) => {
          this.getDataOfAllList();
          this.snack.open("Row Add SuccessFully", "Done", {
            duration: 1000,
            panelClass: ['success-snackbar'],
          })
        })
      }
    })
  }
  markList(markSingleRow: any) {
    if (markSingleRow.marked == "Marked") {
      markSingleRow.marked = "UnMarked";
      this.listServices.editSingleList(markSingleRow.id, markSingleRow).subscribe((response) => {
        console.log(response);
        this.getDataOfAllList();
        this.snack.open("Row UnMarked SuccessFully", "success", {
          duration: 1000,
          panelClass: ['success-snackbar'],
        })
      })
    }
    else {
      markSingleRow.marked = "Marked";
      this.listServices.editSingleList(markSingleRow.id, markSingleRow).subscribe((response) => {
        console.log(response);
        this.getDataOfAllList();
        this.snack.open("Row Marked SuccessFully", "success", {
          duration: 1000,
          panelClass: ['success-snackbar'],
        })
      })
    }
    
  }
  deleteList(id: number) {
    this.listServices.deleteSingleList(id).subscribe((response) => {
      console.log(response);
      this.getDataOfAllList();
      this.snack.open("Delete Row SuccessFully", "success", {
        duration: 1000,
        panelClass: ['success-snackbar'],
      })
    })
  }
}
