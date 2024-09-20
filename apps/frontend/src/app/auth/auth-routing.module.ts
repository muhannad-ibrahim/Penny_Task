import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NoAuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [NoAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
