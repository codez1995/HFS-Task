import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddListComponent } from './add-list/add-list.component';
import { EditListComponent } from './edit-list/edit-list.component';
import { ListPageComponent } from './list-page/list-page.component';

const routes: Routes = [
  { path: "list", component: ListPageComponent },
  { path: "", redirectTo: "list", pathMatch: "full" },

  { path: "add-list", component: AddListComponent },
  { path: "edit-list", component: EditListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
