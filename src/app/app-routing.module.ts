import { LichSuComponent } from './hopdong/lichsu/lichsu.component';
import { HopdongComponent } from './hopdong/hopdong.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'*',component:HopdongComponent},
  {path:'lichsu',component:LichSuComponent},
  {path:'',component:HopdongComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
