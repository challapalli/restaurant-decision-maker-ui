import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionCreateComponent } from './session-create/session-create.component';
import { SessionJoinComponent } from './session-join/session-join.component';
import { RestaurantSubmitComponent } from './restaurant-submit/restaurant-submit.component';
import { SessionEndComponent } from './session-end/session-end.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'create-session', component: SessionCreateComponent, canActivate: [AuthGuard] },
  { path: 'join-session', component: SessionJoinComponent, canActivate: [AuthGuard] },
  { path: 'submit-restaurant/:sessionId/:username', component: RestaurantSubmitComponent , canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
