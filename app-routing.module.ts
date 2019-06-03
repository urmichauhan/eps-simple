import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { LogoutComponent } from "./auth/component/logout/logout.component";
;
// import { forgotPasswordComponent } from "./auth/component/forgotpasswordmodule/forgot-password.component";
// import { QuizComponent } from './pages/assessmodule/component/quizplayer/quiz.component';

// import { SSOLoginComponent } from "./auth/component/ssomodule/sso.component";
// import { RootedErrorComponent } from "./auth/component/rootederror/rootederror.module";

const routes: Routes = [
    { path: 'login', loadChildren: './auth/auth.module#AuthModule' },
    { path: 'logout', component: LogoutComponent },
    { path: '', redirectTo: 'b2b/index', pathMatch: 'full' },
    { path: 'b2b/', redirectTo: 'b2b/index', pathMatch: 'full' },
    // { path: 'passwordmanagement', component: forgotPasswordComponent },
    // { path: 'changepassword', component: forgotPasswordComponent }, 
    // { path: 'setnewpassword/:usercode', component: forgotPasswordComponent }, 
    { path: 'passwordmanagement', loadChildren: "./auth/component/forgotpasswordmodule/forgot-password.module#ForgotPassword" },
    
    { path: 'changepassword', loadChildren: "./auth/component/forgotpasswordmodule/forgot-password.module#ForgotPassword" },
    { path: 'setnewpassword/:usercode', loadChildren: "./auth/component/forgotpasswordmodule/forgot-password.module#ForgotPassword" },
    { path: 'redirect', loadChildren: './auth/component/adfstoken/adfstoken.module#AdfsTokenModule' },
    { path: 'rootederror', loadChildren: './auth/component/rootederror/rootederror.module#RootedErrorModule' },
    {
        "path": "sso/:ssoid",
        "loadChildren": ".\/auth\/component\/ssomodule\/sso.module#SSOLoginModule"
    },
    {
        "path": "confirmation/:userid",
        "loadChildren": ".\/auth\/component\/mailconfirmation\/mailconfirmation.module#MailConfirmationModule"
    },
    { path: 'initiatesso', loadChildren: './auth/component/ssoinitiation/ssoinitiation.module#SsoInitiationModule' },
    {
        "path": "android_asset\/www",
        "redirectTo": "b2b/index",
        "pathMatch": "full"
    },
    {
        "path": "www",
        "redirectTo": "b2b/index",
        "pathMatch": "full"
    },
    {
        "path": "enterpriseadminsso/:ssoid",
        "loadChildren": ".\/auth\/component\/ssomodule\/sso.module#SSOLoginModule"
    },
    // ,{
    //     path: 'b2c/', redirectTo: '/b2chome', pathMatch: 'full'

    // },
    // ,{
    //     path: 'b2c', redirectTo: '/b2chome', pathMatch: 'full'

    // },
    // { path: ':tpid', redirectTo: 'b2c/index', pathMatch: 'full' },
    {
        "path": "**",
        "redirectTo": "404",
        "pathMatch": "full"
    },
    { path: 'jwtauthenticate', loadChildren: './auth/component/jwtsso/jwtssotoken.module#JwtSSOTokenModule' },
    { path: 'deeplinkurl/:uniqueurl', loadChildren: './auth/component/deeplinkurlwithsso/deeplinkurlwithsso.module#DeeplinkUrlwithSsoModule' },
];


export const routingConfiguration: ExtraOptions = {
    paramsInheritanceStrategy: 'always'
};
@NgModule({
    imports: [RouterModule.forRoot(routes, routingConfiguration)],
    exports: [RouterModule]
})
export class AppRoutingModule { }