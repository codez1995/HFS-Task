import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class ListServiceService {

  constructor(private httpClient: HttpClient) { }

  private ListUrl = "http://localhost:3000/movies";
  private ColumnsUrl = "http://localhost:3000/moviesColumn";

  getAllColumns() {
    return this.httpClient.get(this.ColumnsUrl);
  }

  getAllList() {
    return this.httpClient.get(this.ListUrl);
  }

  addSingleList(singleList: any) {
    return this.httpClient.post<any>(this.ListUrl, singleList);
  }

  editSingleList(id: number, singleList: any) {
    return this.httpClient.put(this.ListUrl + "/" + id, singleList);
  }

  deleteSingleList(id: number) {
    return this.httpClient.delete(this.ListUrl + "/" + id);
  } 
}
