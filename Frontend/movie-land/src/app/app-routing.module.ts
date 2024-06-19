import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminPanelComponent},
  {path: 'movie/:id', component: MovieDetailComponent},
  {path: '404', component: NotFoundComponent},
  {path:'**' ,redirectTo:'404',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
