import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';

import { DashbordComponent } from './dashbord/dashbord.component';
import { UsersDataService } from './services/users-data.service';
import { UpdateComponent } from './update/update.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import { RadioButtonModule, CheckBoxModule, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';


import { AuthService } from './services/auth.service'
import { AuthenticationGuard } from './authentication.guard';

import { NgxCaptchaModule } from 'ngx-captcha';


import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

// import { FormsDemoComponent } from './forms-demo.component';
// import { settings } from './forms-demo.data';

const appRoutes: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,

    DashbordComponent,
    UpdateComponent,
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxCaptchaModule,
    NgbModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    NgxMaskModule.forRoot(),
    DropDownListModule, BrowserModule, ToastModule, RadioButtonModule, CheckBoxModule, ButtonModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    FormsModule,
    CommonModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: UsersDataService,
    multi: true
  },
  AuthenticationGuard, AuthService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
