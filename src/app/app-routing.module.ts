import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisyoCoRoomComponent } from './visyo-co-room/visyo-co-room.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: ':roomId',
    component: VisyoCoRoomComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
