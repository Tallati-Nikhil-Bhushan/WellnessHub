import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptor } from './auth.interceptor';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { DietComponent } from './diet/diet.component';
import { MealDetailsComponent } from './meal-details/meal-details.component';
import { FitnessComponent } from './fitness/fitness.component';
import { MentalHealthComponent } from './mental-health/mental-health.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { NgSelectModule } from '@ng-select/ng-select';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    DietComponent,
    MealDetailsComponent,
    FitnessComponent,
    MentalHealthComponent,
    AddActivityComponent
  ],
  imports: [
    NgSelectModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:8081'],  // Adjust to your backend's domain
        disallowedRoutes: ['http://localhost:8081/api/login', 'http://localhost:8081/api/register']
      }
    }),
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
