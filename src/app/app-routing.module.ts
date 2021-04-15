import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RecordComponent } from './component/record/record.component';
import { ReportsComponent } from './component/reports/reports.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'Home'
  },
  {
    path:'Home',
    component:HomeComponent
  },
  {
    path:'Login',
    component:LoginComponent
  },
  {
    path:'Live',
    component:ReportsComponent
  },
  {
    path:'record',
    component:RecordComponent
  },{
    path:':Fecha',
    component:ReportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
