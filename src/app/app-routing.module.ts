import { LichSuComponent } from './hopdong/lichsu/lichsu.component';
import { HopdongComponent } from './hopdong/hopdong.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThanhlyComponent } from './thanhly/thanhly/thanhly.component';

const routes: Routes = [
  {path:'*',component:HopdongComponent},
  {path:'lichsu',component:LichSuComponent},
  {path:'',component:HopdongComponent},
  {path:'thanhly/:id',component:ThanhlyComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
