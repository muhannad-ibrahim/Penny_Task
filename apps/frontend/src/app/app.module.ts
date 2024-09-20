import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routes';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthRoutingModule } from './auth/auth-routing.module';


@NgModule({
  imports: [
    AppComponent,
    RouterModule,
    FormsModule,
    BrowserModule,
    CommonModule,
    AuthModule,
    DashboardComponent,
    HttpClientModule,
    AppRoutingModule,
    AuthRoutingModule
  ],
  declarations: [],
  providers: [],
})
export class AppModule { }
