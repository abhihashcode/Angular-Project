import { StudentDataComponent } from './student-data/student-data.component';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path:'home', component : HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'stuData',component:StudentDataComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
