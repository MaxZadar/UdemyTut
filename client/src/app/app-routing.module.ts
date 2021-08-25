import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsComponent } from './lists/lists.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "", 
    runGuardsAndResolvers: "always", 
    canActivate: [AuthGuard], 
    children: [
      { path: "messages", component: MessagesComponent, canActivate: [AuthGuard] },
      { path: "lists", component: ListsComponent, canActivate: [AuthGuard] },
      { path: "members", component: MemberListComponent, canActivate: [AuthGuard] },
      { path: "members/:id", component: MemberDetailComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: "**", component: HomeComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
