import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseRequestOptions, HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { AuthRoutingModule } from './auth-routing.routing';
import { AuthComponent } from './auth.component';
// import { AlertComponent } from './_directives/alert.component';
import { LogoutComponent } from './component/logout/logout.component';
import { AuthGuard } from './_guards/auth.guard';
// import { AlertService } from './_services/alert.service';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { fakeBackendProvider } from './_helpers/index';
import { LanguageModule } from '../app.language.module';
import { ForgotPassword } from "./component/forgotpasswordmodule/forgot-password.module";
import { HintModule } from '../pages/angular-custom-tour';
import { HintService } from '../pages/angular-custom-tour';
import { SwiperModule, SwiperComponent } from 'ngx-swiper-wrapper';
import { swipeShouldReset } from 'ionic-angular/umd/util/util';
import { RegisterService } from '../auth/_services/registeruser/registeruser.service';
import { SmsService } from "../_appservices/sms/smsService";
import { EmailDomainService } from './_services/registeruser/emailDomain';

@NgModule({
    declarations: [
        AuthComponent,
        // AlertComponent,
        LogoutComponent,
        //SwiperComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        //AuthRoutingModule,LanguageModule,
        AuthRoutingModule, LanguageModule, ForgotPassword, HintModule, SwiperModule
        ,
    ],
    exports: [
        SwiperModule,
        
    ],
    providers: [
        AuthGuard,
        // AlertService,
        AuthenticationService,
        UserService,
        // api backend simulation
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions,
        HintService,
        RegisterService,
        SmsService, EmailDomainService
      ]
    // entryComponents: [AlertComponent],
})

export class AuthModule {
}