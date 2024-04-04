import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SessionCreateComponent } from './session-create/session-create.component';
import { SessionJoinComponent } from './session-join/session-join.component';
import { RestaurantSubmitComponent } from './restaurant-submit/restaurant-submit.component';
import { SessionEndComponent } from './session-end/session-end.component';
import { WebSocketService } from './services/WebsocketService';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './helpers/auth.guard';
import { HomeComponent } from './home/home.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    SessionCreateComponent,
    SessionJoinComponent,
    RestaurantSubmitComponent,
    SessionEndComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    AuthGuard, 
    WebSocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
