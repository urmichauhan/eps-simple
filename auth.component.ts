//Created Date: 04/04/2018
//Created By: Ashish Tiwari
//Usage: This file used for login in to the application.
//Copyright:Violet InfoSystems Pvt.Ltd
//Review by:
//Review Date:

import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BaseComponent, BaseComponentHelper } from "../appbase";
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NgForm } from "@angular/forms";
import { Events, Platform } from 'ionic-angular';

import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { Helpers } from '../helpers';
import { MultiLingual, MultiTenancy, AppSessionObject, enAppSession, UserSession, ApiService, ScriptLoaderService, ADFSTokenService, FileManagerService } from "../_appservices";
import { AlertComponent } from "../_appcontrollibrary";
import { environment } from '../../environments/environment';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HintService } from '../pages/angular-custom-tour';
import { Device } from '@ionic-native/device';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { CordovaNavigation } from "../_appservices/cordovanavigation/cordovanavigation";
import { SmsService } from "../_appservices/sms/smsService";
import { iSms } from "../_model/Sms/sms.interface";
import { RegisterService } from '../auth/_services/registeruser/registeruser.service';
import { B2BPManagement, ChangePassword, B2BMailConfirmation } from '../auth/_models/passwordmanagement/passwordmanagementinterface'
import * as  crypto from "crypto-js";
import { EmailDomainService } from './_services/registeruser/emailDomain';

//import { domainEmail } from '../auth/_models/emailDomain'
// import * as twilio from 'twilio'

@Component({
    selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
    templateUrl: './templates/login-1.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./templates/login-1.component.css']
})

export class AuthComponent extends BaseComponent implements OnInit, AfterViewInit {
    domainId: any;
    _b2BPManagement: B2BPManagement = {
        Ref_Domain_ID: 0,
        RequestedID: 0,
        RequestedBy: "",
        OTP: "",
        PlainOTP: "",
        Flag: "",
    }

    _b2BMailConfirmation: B2BMailConfirmation = {
        Ref_Domain_Id: 0,
        User_Email: "",
        Created_By: "",
        Template: "",
        DownloadURL: ""
    }
    _cp: ChangePassword = {
        Option: "",
        DomainID: "",
        UserCode: "",
        userEmail: "",
        OldPassword: "",
        NewPassword: "",
        isSecuredPassword: false
    }
    _sms: iSms = {
        from: "",
        to: "",
        body: "",
        sid: ""
    }
    //_domainEmail: domainEmail
    resend: number = 0;
    model: any = {};
    loading = false;
    returnUrl: string;
    selectedLang;
    topRightvalue;
    Language;
    showMultitenancyPop: boolean;
    selecteddomain;
    domainList: any;
    passpatt: any;
    weakpassword: any;
    Message: any;
    Isonefield: any;
    passwordmsg: any;
    count: any;
    res: any;
    getSwitch: any;
    submitted = false;
    submitted1 = false;
    pattern1: any;
    validations_form: any;
    formBuilder: any;
    Fourfield: any;
    patternEmail
    public elemHeight: any;
    private isOnline = false;
    public showContent: boolean = false;
    public isSSOLoginProgress: boolean = false;
    public unregisterBackButtonAction: any;
    public isLoginWithUsername: boolean = false;
    courseWindowRef: any;
    sendOtp: boolean = false;
    validateOtp: boolean = false;
    register: boolean = false;
    isValidEmail: boolean = true;
    isTrue: boolean = false;
    public bindState: any;
    public bindCity: any;
    public stateID: number = 0;
    public cityID: number = 0;
    public citySelect: boolean = false;
    public stateSelect: boolean = false;
    public invalidmessage: string = "";
    public isCustomeActive: boolean = false;
    public userTypeADFS: string = 'false';
    //ngx-swiper configration for Slider (Properties)
    public config: SwiperConfigInterface = {
        direction: 'horizontal',
        slidesPerView: 1,
        autoplay: false,
        keyboard: true,
        speed: 1000,
        passiveListeners: true,
        preventInteractionOnTransition: false,
        watchOverflow: true,
        pagination: true
    };

    public slideConfig: any;
    @ViewChild('alertSignin',
        { read: ViewContainerRef }) alertSignin: ViewContainerRef;
    @ViewChild('alertRegister',
        { read: ViewContainerRef }) alertRegister: ViewContainerRef;

    _langChangeEvent: LangChangeEvent;
    copyText;
    year;
    loginTopBar;
    signUp;
    showLanguageDropdown;
    windowRef: any;
    isSSOEnabled: any;
    signInText: string = "";
    sSOText: string = "";
    signInUserNamePassword: string = "";
    isClientBinding;
    isMobile;
    loginbg: any;
    constructor(
        // private _router: Router,
        private _script: ScriptLoaderService,
        private _userService: UserService,
        private _appSessionObject: AppSessionObject,
        private _route: ActivatedRoute,
        private _authService: AuthenticationService,
        private cfr: ComponentFactoryResolver,
        private _translate: TranslateService,
        private _multiLingual: MultiLingual,
        private _multiTenancy: MultiTenancy,
        private _userSession: UserSession,
        private _apiService: ApiService,
        public hintService: HintService,
        _base: BaseComponentHelper,
        private _iab: InAppBrowser,
        private _aDFSTokenService: ADFSTokenService,
        private _device: Device,
        private _events: Events,
        private _cordovaNavigation: CordovaNavigation,
        private _platform: Platform,
        private _fileManagerService: FileManagerService,
        private _registerService: RegisterService,
        private _smsService: SmsService,
        private _EmailDomainService: EmailDomainService
    ) {
        super(_base)
        //Added By Ashish To Set the Language based on User Prefrences stored in Storage.
        this._multiLingual.initLanguage(this._translate, this._langChangeEvent);

    }
    change(event) {
        // //Added By Ashish To Set the Language based on User Prefrences stored in Storage.
        this._multiLingual.changeLanguage(this.model.languagecode);
        this._multiLingual.initLanguage(this._translate, this._langChangeEvent);

    }
    /**
     * This function called when user select the domain from domain list or after login
     * @param event Domain ID
     */
    manageMultitenancy(event) {
        try {
            this._multiTenancy.isDomainCssLoaded = false;
            Helpers.setLoading(true);
            //Load The domain setting and default configuration
            //Change the default language as blank if user selecting domain from mobile.
            if (event != "") {
                this._base._encryptedStorage.set(enAppSession.defaultLanguage, "");
            }
            this._multiTenancy.domainName = event
            //alert(event);
            //;



            this._multiTenancy.initMultiTenancy(event, event == "" ? false : true).then(res => {
                // this.loadData(res);
            });
        }
        catch (exc) {
            console.log('Old Logic hence logout')
            this._base._encryptedStorage.clear();
            Helpers.setLoading(true);
            setTimeout(() => {

                this._base._navigation.navigate(['logout']);
            }, 100);

        }
    }

    loadData(res) {
        if (res) {
            // this.showMultitenancyPop = false;
            // if (this._base._commonService.isMobile() == true) {
            //     // setTimeout(() => {
            //     //     this.loadsavedDataAndConfiguration().then(x => {
            //     //         setTimeout(() => {
            //     //             this.showContent = true
            //     //             this._multiTenancy.setProjetIconTitle();
            //     //             this.changeText();
            //     //             setTimeout(() => {
            //     //                 this.elemHeight = ($(".m-login__wrapper").height());
            //     //                 this.elemHeight = this.elemHeight + 85;
            //     //             }, 0);
            //     //         }, 1000);
            //     //     })
            //     //     // this._apiService.SwitchEnvoirement(false);
            //     //     // Helpers.setLoading(false);
            //     //     // //Initialize the Google analytics
            //     //     // this._base._loggingService.initializeGoogleAnalytics();

            //     //     // //this.showContent = true


            //     // }, 700);
            // }
            // else {
            //     // setTimeout(() => {
            //     //     this.loadsavedDataAndConfiguration().then(x => {
            //     //         this.changeText();
            //     //         // setTimeout(() => {
            //     //         //     this.showContent = true
            //     //         //     this._multiTenancy.setProjetIconTitle();
            //     //         // }, 0);
            //     //         setTimeout(() => {
            //     //             this.elemHeight = ($(".m-login__wrapper").height());
            //     //             this.elemHeight = this.elemHeight + 85;
            //     //         }, 0);


            //     //     })
            //     // }, 1000);
            // }
        }
    }
    ngOnDestroy() {
        if (this._base._commonService.isMobile()) {
            // Unregister the custom back button action for this page
            this.unregisterBackButtonAction && this.unregisterBackButtonAction();
        }
        $("#m_login").closest("body").removeClass("Login_specific");
    }
    /**
     * This function called wher component initialized.
    */
    getType(type) {
        this._base._alertService.clear('alertSignin', AlertComponent, this);
        if (type == '0') {
            this.userTypeADFS = 'false';
        } else if (type == '1') {
            this.userTypeADFS = 'true';
        }
    }
    ngOnInit() {
        this._base._commonService.showMainUI(true);
        if (window.top.location.href.indexOf('admin_home') > 0) {
            window.top.location.reload();
        }
        else {
            this.sendOtp = true;
            this.isClientBinding = environment.isClientBinding;
            this.isMobile = this._base._commonService.isMobile();
            this.patternEmail = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$';
            console.log('B2B Login: ')
            this._events.subscribe('domainLoaded', (lngcode) => {
                //  alert('domainLoaded');
                console.log('B2B domainLoaded: ')
                //Added for Custom Active Directory
                this._base._appSessionObject.getDomainSetting('rbtCustomActiveDirectory').then(rbtCustomActiveDirectory => {
                    let customeactivedirectory = rbtCustomActiveDirectory[0].SwitchValue.toLowerCase();
                    if (customeactivedirectory == 'yes') {
                        this.isCustomeActive = true;
                        this.userTypeADFS = 'true';
                    }
                });
                this._base._appSessionObject.getDomainSetting('txtCustomActiveDirectoryURL').then(txtCustomActiveDirectoryURL => {
                    let customeactivedirectoryURL = txtCustomActiveDirectoryURL[0].SwitchValue.toLowerCase();
                    if (customeactivedirectoryURL.toUpperCase() == 'NA' || customeactivedirectoryURL.toUpperCase() == '') {
                        this.isCustomeActive = false;
                    }
                });
                this._base._appSessionObject.getDomainSetting('rbtBusinessModel').then(rbtBusinessModel => {
                    let currentDomainModel = rbtBusinessModel[0].SwitchValue.toLowerCase();;
                    console.log('B2B domainLoaded: ' + currentDomainModel)
                    if (currentDomainModel == "enterprise") {
                        this.showContent = false;
                        this._base._appSessionObject.get(enAppSession.hasLoggedIn).then((hasLoggedIn) => {
                            //alert('this._base._appSessionObject')
                            if (hasLoggedIn != null && hasLoggedIn != undefined && hasLoggedIn != "" && hasLoggedIn == true) {
                                if (window.top.location.href.split("?")[0].indexOf(currentDomainModel) == -1) {
                                    this._base._navigation.navigate(['enterprise', 'index']);
                                }
                            }
                            else {
                                if (window.top.location.href.split("?")[0].indexOf(currentDomainModel) == -1) {
                                    this._base._navigation.navigate(['enterprisehome']);
                                }
                            }
                        });
                    }
                    else {

                        // this._base._appSessionObject.get(enAppSession.hasLoggedIn).then((hasLoggedIn) => {                      
                        //     if (hasLoggedIn != null && hasLoggedIn != undefined && hasLoggedIn != "" && hasLoggedIn == true) {

                        //     }
                        //     else {
                        //         if(window.top.location.href.indexOf('admin_home')>0)
                        //         {
                        //             window.top.location.reload();
                        //         }
                        //     }
                        // });

                        this.showContent = true
                        this.loadsavedDataAndConfiguration().then(x => {
                            this.showMultitenancyPop = false;
                            this.showContent = true
                            this._multiTenancy.setProjetIconTitle();
                            setTimeout(() => {
                                this.changeText();
                            }, 2000);
                            setTimeout(() => {
                                this.changeText();
                                this.elemHeight = ($(".m-login__wrapper").height());
                                this.elemHeight = this.elemHeight + 85;
                                $("#m_login").closest("body").addClass("Login_specific");
                            }, 0);
                        });

                        this._base._appSessionObject.getDomainSetting('brLandingPageBackground').then(loginbackground => {
                            this.loginbg = loginbackground[0].SwitchValue;
                            // this.loginbg = "";

                            if (this.loginbg != null && this.loginbg != undefined && this.loginbg != "") {
                                //this.loginbg = 'https://v9uat.violetlms.com/assets/20159/media/img/login_bg.svg';
                                // this.loginbg = 'https://cdn.lynda.com/course/604272/604272-636324452429360981-16x9.jpg';
                                this.loginbg = 'url(' + this.loginbg + ')'//+' '+'!important;';

                                // alert(this.loginbg);
                            }
                        });
                        this.stateBind();
                    }
                })



            });
            this.changeText();
            // this._cordovaNavigation.init();
            if (this._base._commonService.isMobile()) {
                this.ngOnDestroy();
                this.unregisterBackButtonAction = this._platform.registerBackButtonAction(() => {
                    let result = confirm("Are you sure you want to exit?")
                    if (result == true) {
                        (<any>navigator).app.exitApp();
                    }
                });
            }
            Helpers.setLoading(true);
            this._base._alertService.initAlert('alertSignin', AlertComponent, this);
            this.slideConfig = { "slidesToShow": 1, "slidesToScroll": 1, "autoplay": true, "autoplaySpeed": 1500, "arrows": true, centerMode: true, button: false };

            //Ask User To select the domain so that domain specific data get loaded
            if (this._base._commonService.isMobile() == true) {
                this.showContent = false;
                if (environment.singleDomain) {
                    // alert(environment.appDomainbaseURL)
                    this.manageMultitenancy(environment.appDomainbaseURL)
                }
                else if (environment.isDynamicBinding) {
                    // this._authService.getAllDomainList().subscribe(domanList => {
                    //     this.domainList = domanList;

                    //     Helpers.setLoading(false);
                    // })
                    Helpers.setLoading(false);
                    this.showMultitenancyPop = true;
                }
                else {
                    this.showContent = true;
                    this.domainList = environment.domainList.filter(domain => domain.clientName == environment.clientName);
                    Helpers.setLoading(false);
                    this.showMultitenancyPop = true;
                }
            }
            else {
                //Load The domain setting and default configuration
                Helpers.setLoading(true);
                this.showContent = false;
                this.manageMultitenancy("")
                //alert('loadData')
                //this.loadData(true);
            }

            //Added By Ashish To Set the Language based on User Prefrences stored in Storage.
            this._multiLingual.initLanguage(this._translate, this._langChangeEvent);
            this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
            this.returnUrl = this.returnUrl;


            setTimeout(() => {
                this.startTour()
            }, 1000);

            /* added for load image before content load vikas  18-09-2018*/
            //setTimeout(() => this.showContent = true, 1050);
        }
    }

    /**
     * This function called wher component initialized.
    */

    ngAfterViewInit() {
        // setTimeout(() => {
        //     this.elemHeight = ($(".m-login__wrapper").height());
        //     this.elemHeight = this.elemHeight + 85;
        // }, 500);
        // if (this._base._commonService.isMobile()) {
        //     this._fileManagerService.checkfolderstrucute();
        // }
    }

    /**
     * This function is called when user click on signin button
     * @param form
     */

    // signin(form: NgForm, e, p) {
    signin(form: NgForm) {
        //Added by brijesh kushwaha for ofline Application logo and Third Party Logo.
        localStorage.setItem("thirdPartyLogoDownloadFirstTime", "0");
        localStorage.setItem("logoDownloadFirstTime", "0");

        this.loading = true;
        this._base._alertService.initAlert('alertSignin', AlertComponent, this);
        this.submitted = true;
        let passwordfield = (document.getElementById("pwdinput") as HTMLInputElement).value;
        let userfield = (document.getElementById("userInput") as HTMLInputElement).value;
        if (passwordfield == " " || passwordfield == "" || userfield == "" || userfield == " ") {
            this.loading = false;
        }

        this.passpatt = new RegExp(this.passpatt);
        if (this.passpatt.test(passwordfield) != true && window.location.pathname == '/login') {

            this._base._alertService.error(this._translate.instant("PASSWORDWEAK"), true);
            setTimeout(() => {
                this._base._navigation.navigate(['/changepassword']);
            }, 2000);
            this.loading = false;
            return;
        }
        if (form.valid) {
            this.change(null);
            if (this._base._commonService.isOnLine()) {
                this._base._appSessionObject.get(enAppSession.domainID).then(domainId => {
                    this.model.IsCustomAD = this.userTypeADFS;
                    this._authService.getDuplicate_Email(domainId, this.model.email).subscribe((data: any) => {

                        let Email_Cnt = data;
                        if (Email_Cnt < 1) {
                            this._authService.login(this.model.email, this.model.password, domainId, this.model.IsCustomAD).subscribe((data: any) => {
                                if (data.Message == "Check Active Directory URL") {
                                    this._base._alertService.error(this._translate.instant("CADURL"), true);
                                    this.loading = false;
                                }
                                else if (data.Message == "User Login Successful.") {
                                    this._base._alertService.success(this._translate.instant("login_success"), true);

                                    this._base._encryptedStorage.set(enAppSession.firsttimeLogin, 1);
                                    // let getCurrentDateTime = this._offlineElearnSharedDataService.getCurrentDateTime();
                                    // localStorage.setItem('LastSyncData', getCurrentDateTime);
                                    //Added by Ashish Tiwari t o check if user is login for first time then as to change password on 26/01/2018.
                                    if (data.NeedToRegister == true && this.model.IsCustomAD == 'false') {
                                        this._base._navigation.navigate(['/changepassword']);
                                        return;
                                    }

                                    //initialize the onesignal
                                    // this._base._commonService.initOneSignal();
                                    this._authService.setUserSession(data, this.model.IsCustomAD == 'false' ? this.model.password : 'SSO', this.model.remember, this.model.email)
                                    setTimeout(() => {
                                        if (this._base._commonService.isMobile()) {
                                            this._fileManagerService.checkfolderstrucute();
                                        }
                                        this._base._loggingService.initOneSignal();
                                        //this._base._loggingService.setDeviceInfo("LOGIN");  //added by sagar
                                        this._base._alertService.success(this._translate.instant("login_success"), true);
                                        this._base._loggingService.setEventlog(this._translate.instant("SIGNIN"), this._translate.instant("SIGNIN"), this._translate.instant("SIGNINBUTTONCLICKED"), this._translate.instant("USERHASSIGNINGTOTHEAPP"), data.Message, this._translate.instant("SUCCESS"));
                                        this._userSession.initUserSession().then((resp) => {
                                            if (resp == false) {
                                                if (this._base._commonService.isMobile()) {
                                                    this._base._navigation.navigate(['/logout']);
                                                }
                                                else
                                                    window.location.href = '/logout';

                                            }
                                            else {
                                                //do not remove this, this is fix for IOS
                                                if (this.returnUrl == "/404") {
                                                    this.returnUrl = "/index";
                                                }
                                                // setTimeout(() => {
                                                //     if (environment.isSandbox) {
                                                //         this.returnUrl = "/elearn";
                                                //         this._base._navigation.navigate([this.returnUrl]);
                                                //     }
                                                //     else {
                                                //         this._base._navigation.navigate([this.returnUrl]);
                                                //     }

                                                // }, 500);

                                                this.redirectToModule();
                                                //adedd by brijesh kushwaha 19/02/2019
                                                // if (this._base._commonService.isMobile()) {
                                                //     if (this._base._commonService.isOnLine()) {
                                                //         this._masterDataServices.checkMandatoryLength(data).then(result => {
                                                //             if (result != 0) {
                                                //                 this._base._navigation.navigate(["/masterdata"]);
                                                //             }
                                                //             else {
                                                //                 this.redirectToModule();
                                                //             }
                                                //         })
                                                //     }
                                                //     else {
                                                //         this.redirectToModule();
                                                //     }
                                                // }
                                                // else {
                                                //     this._masterDataServices.checkMandatoryLength(data).then(result => {
                                                //         if (result != 0) {
                                                //             this._base._navigation.navigate(["/masterdata"]);
                                                //         }
                                                //         else {
                                                //             this.redirectToModule();
                                                //         }
                                                //     })
                                                // }


                                            }

                                        });
                                        // if (this._base._commonService.isMobile() == true) {
                                        //     this._offlineElearnSharedDataService.getfirttimeElearnData();
                                        // }
                                    }, 200);


                                }
                                //Added by Ashish Tiwari to Check if User Locked the prompt message to User on 2018/01/31
                                else if (data.Message == "You are Locked at Login. Contact Your Reporting Authority.") {
                                    //Added by Ashish To set the Event Log
                                    this._base._loggingService.setEventlog(this._translate.instant("SIGNIN"), this._translate.instant("SIGNIN"), this._translate.instant("SIGNINBUTTONCLICKED"), this._translate.instant("USERHASSIGNINGTOTHEAPP"), data.Message, this._translate.instant("SUCCESS"));
                                    this.loading = false;
                                    this._base._alertService.error(this._translate.instant("USERLOCKED"));
                                }
                                else if (data.Message == "User may be deactivated in the System. Contact System Administrator.") {
                                    //Added by Ashish To set the Event Log
                                    this._base._loggingService.setEventlog(this._translate.instant("SIGNIN"), this._translate.instant("SIGNIN"), this._translate.instant("SIGNINBUTTONCLICKED"), this._translate.instant("USERHASSIGNINGTOTHEAPP"), data.Message, this._translate.instant("SUCCESS"));
                                    this.loading = false;
                                    this._base._alertService.error(this._translate.instant("USERINACTIVE"));
                                }
                                else {
                                    //Added by Ashish To set the Event Log
                                    this._base._loggingService.setEventlog(this._translate.instant("SIGNIN"), this._translate.instant("SIGNIN"), this._translate.instant("SIGNINBUTTONCLICKED"), this._translate.instant("USERHASSIGNINGTOTHEAPP"), data.Message, this._translate.instant("SUCCESS"));
                                    this.loading = false;
                                    this._base._alertService.error(this._translate.instant("login_fail"));
                                }
                            },
                                error => {
                                    this._base._loggingService.setEventlog(this._translate.instant("SIGNIN"), this._translate.instant("SIGNIN"), this._translate.instant("SIGNINBUTTONCLICKED"), this._translate.instant("USERHASSIGNINGTOTHEAPP"), Error.toString(), this._translate.instant("SUCCESS"));
                                    this.loading = false;
                                    this._base._alertService.error(this._translate.instant("login_fail"));
                                });
                        } else {
                            this._base._alertService.error(this._translate.instant("PLEASEUSEUSERNAME"));
                            this.loading = false;
                        }
                    });
                })
            } else {
                this._base._alertService.error(this._translate.instant("Please_check_internet_connectivity"));
                this.loading = false;
            }
        }
    }
    isShowCopyrights: boolean = false
    private loadsavedDataAndConfiguration() {
        this.model.remember = true;
        this.year = new Date().getFullYear();
        //Added By Ashish To Set the User email and password based on User Prefrences stored in Storage.
        return this._base._appSessionObject.get(enAppSession.username).then(username => {
            this.model.email = username
            return this._base._appSessionObject.get(enAppSession.PassWord).then(PassWord => {
                this.model.password = PassWord
                return this._base._appSessionObject.get(enAppSession.remember).then(remember => {
                    this.model.remember = remember
                    return this._base._appSessionObject.getDomainSetting('txtCopyright').then(data => {
                        this.copyText = data[0].SwitchValue;
                        this.isShowCopyrights = true;
                        return this._base._appSessionObject.getDomainSetting('rbtLoginTopBar').then(loginTopBar => {
                            this.loginTopBar = loginTopBar[0].SwitchValue;
                            return this._base._appSessionObject.getDomainSetting('rbtSignUp').then(signUp => {
                                this.signUp = signUp[0].SwitchValue;
                                return this._base._appSessionObject.getDomainSetting('rbtShowLanguageDropdown').then(showLanguageDropdown => {
                                    this.showLanguageDropdown = showLanguageDropdown[0].SwitchValue.toUpperCase();

                                    return this._base._appSessionObject.getDomainSetting('txtTopRightText').then(TopRightText => {
                                        this.topRightvalue = TopRightText[0].SwitchValue.toUpperCase();

                                        // Password Pattern Email Or Usercode Switch Added By Sagar
                                        // (?=.*[A-Z].*[A-Z])        Ensure string has two uppercase letters.
                                        // (?=.*[!@#$&*])            Ensure string has one special case letter.
                                        // (?=.*[0-9].*[0-9])        Ensure string has two digits.
                                        // (?=.*[a-z].*[a-z].*[a-z]) Ensure string has three lowercase letters.
                                        // .{8}                      Ensure string is of length 8.
                                        // ^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$
                                        //;
                                        return this._base._appSessionObject.getDomainSetting("txtPasswordValidator").then(sv => {
                                            this.passpatt = sv[0].SwitchValue;

                                            return this._base._appSessionObject.getDomainSetting("txtPasswordPolicy").then(txtPasswordPolicy => {
                                                this.Message = txtPasswordPolicy[0].SwitchValue;

                                                return this._base._appSessionObject.getDomainSetting("rbtShowChangePassword").then(oneorfourfield => {
                                                    //;
                                                    this.Isonefield = oneorfourfield[0].SwitchValue;
                                                    if (this.Isonefield == "Yes (4 Field)") {//Yes (4 Field)No (1 Field)
                                                        let Fourfield = true;
                                                    }
                                                    return this._base._appSessionObject.getDomainSetting("chkLoginAuthenticationType").then(sv => {
                                                        this.count = sv.length;
                                                        if (this.count == 1) {
                                                            if (sv[0].SwitchValue.toUpperCase().charAt(0) == 'E') {
                                                                this.getSwitch = 'E';
                                                                this.pattern1 = "^[a-zA-Z0-9.!#$%&’'*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                                                            }
                                                            else if (sv[0].SwitchValue.toUpperCase().charAt(0) == 'U') {
                                                                this.getSwitch = 'U';
                                                                this.pattern1 = "^.*"
                                                            }
                                                        }
                                                        else {
                                                            this.getSwitch = 'B';
                                                            this.pattern1 = "^.*"
                                                        }
                                                        return this._base._appSessionObject.getDomainSetting("rbtADFSSSO").then(rbtSSOAUTH => {
                                                            this.isSSOEnabled = rbtSSOAUTH[0].SwitchValue
                                                            if (this.isSSOEnabled == null || this.isSSOEnabled == "" || this.isSSOEnabled == undefined)
                                                                this.isSSOEnabled = 'No'

                                                            this.isSSOEnabled = this.isSSOEnabled.toUpperCase();



                                                            // return this._base._appSessionObject.get(enAppSession.domainID).then(domainID => {
                                                            return this._base._appSessionObject.get(enAppSession.languageMaster).then(language => {
                                                                this.Language = JSON.parse(language);
                                                                // console.log(this.Language);
                                                                //If Only Single language is available then in that case hide the dropdown.
                                                                if (this.Language != undefined && this.Language != null) {
                                                                    if (this.Language.length == 1) {
                                                                        this.showLanguageDropdown = 'NO';
                                                                    }
                                                                }
                                                                else
                                                                    this.showLanguageDropdown = 'NO';
                                                                //alert(this.Language)
                                                                this._base._appSessionObject.get(enAppSession.defaultLanguage).then(languagecode => {
                                                                    this.model.languagecode = languagecode == null || languagecode == '' || languagecode == undefined ? this._langChangeEvent.lang == undefined ? "en" : this._langChangeEvent.lang : languagecode
                                                                    if (this.model.languagecode == null || this.model.languagecode == '' || this.model.languagecode == undefined)
                                                                        this.model.languagecode = 'en';
                                                                });
                                                                this._apiService.SwitchEnvoirement(false);

                                                                //Initialize the Google analytics
                                                                this._base._loggingService.initializeGoogleAnalytics();
                                                                this.showContent = true;
                                                                setTimeout(() => {
                                                                    // alert('called');
                                                                    this.changeText();
                                                                    this._multiTenancy.setProjetIconTitle();
                                                                    Helpers.setLoading(false);
                                                                }, 0);
                                                                setTimeout(() => {
                                                                    this.changeText();
                                                                }, 500);
                                                            });
                                                            //});
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });











        //End Added By Ashish To Set the User email and password based on User Prefrences stored in Storage.










    }

    redirectToManagePassword() {
        this.loading = true;
        this._base._navigation.navigate(['passwordmanagement']);
    }

    openURL() {
        if (!this._base._commonService.isMobile()) {
            window.open("http://www.violetlms.com", "_blank");
        }
    }

    showPwd() {
        var x = (document.getElementById('pwdinput') as HTMLInputElement).type;
        if (x === "password") {
            (document.getElementById('pwdinput') as HTMLInputElement).type = "text";
            document.getElementById("show_icon").style.display = 'block';
            document.getElementById("hide_icon").style.display = 'none';
        } else {
            (document.getElementById('pwdinput') as HTMLInputElement).type = "password";
            document.getElementById("hide_icon").style.display = 'block';
            document.getElementById("show_icon").style.display = 'none';
        }
    }

    startTour() {
        Helpers.setLoading(false);
        //this.hintService.initialize();
    }

    /**
     * Redirect the user on single sign on adfs sever using oauth2 single sign on.
     */
    RedirectToADFSServer() {
        try {
            this._base._navigation.navigate(["/initiatesso"]);
        }
        catch (e) {
            this._base._globalErrorHandler.logError(e, "ADFS SSO", "Auth.component.ts", "RedirectToADFSServer", window.location);

        }


    }

    signinWithUsername() {
        this.isLoginWithUsername = true;
        this.ngAfterViewInit();
        setTimeout(() => {
            this.elemHeight = ($(".m-login__wrapper").height());
            this.elemHeight = this.elemHeight + 85;
        });
    }
    /**
     * This function is hardcoded and specic requirement of RCAP Client as text of login page has to be based on his reuirement.
     */
    private isRCAP() {
        return (window.location.href.indexOf("ilearn.") >= 0 || window.location.href.indexOf("ilearnuat.") >= 0 || environment.showCustomText === true) ? true : false;
    }

    changeText() {
        if (this.isRCAP() === true) {
            //alert('called to change')
            this.signInText = this._translate.instant("LOGINAS");
            this.sSOText = this._translate.instant("EMPLOYEE");
            this.signInUserNamePassword = this._translate.instant("OTHERSLOGINAS");

            $('.sign_in_text').text(this.signInText);
            $('.sso_text').text(this.sSOText);
            $('#signInUserNamePassword').text(this.signInUserNamePassword);
            //alert( this.signInText+ this.sSOText+ this.signInUserNamePassword)
        }
        else {
            this.signInText = this._translate.instant("SIGN_IN_WITH");
            this.sSOText = this._translate.instant("SSO");
            this.signInUserNamePassword = this._translate.instant("SIGNIN_WITH_USERNAMEAND_PASSWORD");
            $('.sign_in_text').text(this.signInText);
            $('.sso_text').text(this.sSOText);
            $('#signInUserNamePassword').text(this.signInUserNamePassword);
        }
    }
    goBackToDomainSelection() {
        if (this._base._commonService.isMobile() == true) {
            if (environment.isClientBinding == true) {
                this.showContent = true
                this._multiTenancy.isDomainCssLoaded = false;
                this.showMultitenancyPop = true;
                this.loginTopBar = false;
                this.isShowCopyrights = false;
                this.isLoginWithUsername = false;
            }
        }
    }

    redirectToModule() {
        setTimeout(() => {
            if (environment.isSandbox) {
                this.returnUrl = "/elearn";
                this._base._navigation.navigate([this.returnUrl]);
            }
            else if (this._multiTenancy.isCompleteVersion == 'no') {
                this._base._navigation.navigate([this._multiTenancy.activeModuleName]);
                //window.location.href="https://uatft-1.violetlms.com"
                //this.launchThirdpartyURL("https://www.amazon.com/")
            } else {
                this._base._navigation.navigate([this.returnUrl]);
                //this.launchThirdpartyURL("https://www.amazon.com/")
                //window.location.href="https://uatft-1.violetlms.com"
                // window.location.href="https://ejgj-dev1.fa.em2.oraclecloud.com/hcmUI/faces/FndMobileOverview?fnd=%3B%3B%3B%3Bfalse%3B256%3B%3B%3B&fndGlobalItemNodeId=PER_HCMPEOPLETOP_FUSE_DIRECTORY&_afrLoop=246252678344375&_afrWindowMode=0&_afrWindowId=glf2cbl4y&_adf.ctrl-state=kov1jnzqg_1&_afrFS=16&_afrMT=screen&_afrMFW=980&_afrMFH=1440&_afrMFDW=375&_afrMFDH=667&_afrMFC=8&_afrMFCI=0&_afrMFM=0&_afrMFR=0&_afrMFG=0&_afrMFS=0&_afrMFO=1"
            }

        }, 500);


    }
    launchThirdpartyURL(url) {
        var THAT = this;

        this.courseWindowRef = this._iab.create(url, 'ThirdpartyURL', "hardwareback=yes,location=no,zoom=no,disallowoverscroll=yes,allowInlineMediaPlayback=yes,enableViewportScale=yes,useWideViewPort=no");
        this.courseWindowRef.on('exit').subscribe(() => {
            // This is called on press of back button / close of course window.
            //	this._screenOrientation.unlock();

            //	THAT.checkForPendingAPIs();
        });

        this.courseWindowRef.on('loaderror').subscribe(() => {
            // This called when error occurs while loading the page.
            alert("Network error ! Please try again.");
            this.courseWindowRef.close();
            //this._screenOrientation.unlock();
        });

        // Reset old value - if any.
        this.courseWindowRef.on('loadstart').subscribe((e) => {

        });
    }
    numberMobile(e) {
        e.target.value = e.target.value.replace(/[^\d]/g, '');
        return false;
    }
    onlycharacter(e) {
        if (this._base._commonService.isMobile()) {
            e.target.value = e.target.value.replace(/[^a-zA-Z]/g, '');
            return false;
        }
    }
    ontextchange(e) {

        e.target.value = this.model.EmailID;
    }

    omit_special_char(event) {
        var k;
        k = event.charCode;  //         k = event.keyCode;  (Both can be used)
        return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 16 || k == 39);

    }
    /*
    *used this function for register and request otp.
    */
    userRegister(fs: NgForm) {
        //this.smssend();
        this.submitted1 = true;
        this._base._alertService.initAlert('alertRegister', AlertComponent, this);
        if (this.stateID != 0 && this.cityID != 0) {
            if (fs.valid) {
                this.stateSelect = false;
                this.citySelect = false;
                Helpers.setLoading(true);
                this._base._appSessionObject.get(enAppSession.domainID).then((domainId) => {

                    this.model.Ref_Domain_ID = domainId;
                    this.model.Flag = 'SIGNUP';
                    this.model.Password = this.model.EmailID;
                    this.model.UserCode = this.model.EmailID;
                    this.model.Salutation = '6';
                    this.model.MiddleName = ''
                    this.model.ScreenName = '';
                    this.model.Address = '';
                    this.model.PhoneNumber = '';
                    this.model.UserImage = '';
                    this.model.Address = '';
                    this.model.CompanyName = this.model.companyname;
                    this.model.StateID = this.stateID;
                    this.model.CityID = this.cityID;
                    this.model.UserMaster = this.stateID + ',' + this.cityID;

                    this._registerService.registeruser(this.model).subscribe((data) => {
                        if (data == "OTP send to registered mail id.") {
                            window.scroll(0, 0);
                            //this.sendotp()
                            this._base._alertService.success(this._translate.instant("OTPSENDTO") + this.model.EmailID, true);
                            this.submitted1 = false;
                            this.sendOtp = false;
                            this.validateOtp = true;
                            Helpers.setLoading(false);
                        } else if (data == "Email id already exists" || data == "User Code already exists") {
                            this._base._alertService.error(this.model.EmailID + " " + this._translate.instant("EMAILEXISTS"), true);
                            Helpers.setLoading(false);
                        } else if (data == "Maximum number for OTP request has been exceed. Please try after 15 minutes.") {
                            this._base._alertService.error(this._translate.instant("MAXIMUMNUMBEROFOTPREQUEST"), true);
                            Helpers.setLoading(false);
                        } else if (data == "Email ID / UserName Does Not Exist.") {
                            this._base._alertService.error(this._translate.instant("EMAILDOESNOTEXIST"), true);
                            Helpers.setLoading(false);
                        }
                    });
                });
            }
        } else {
            if (this.stateID == 0 && this.cityID == 0) {
                this.stateSelect = true;
                this.citySelect = true;
            } else if (this.cityID == 0) {
                this.citySelect = true;
            } if (this.stateID == 0) {
                this.stateSelect = true;
            }
            Helpers.setLoading(false);
        }
    }

    /*
    *used this function for Validate OTP which is enter by User.
    */
    validateOTP(fs: NgForm) {
        this._base._alertService.initAlert('alertOTP', AlertComponent, this);
        this.submitted1 = true;
        if (fs.valid) {
            Helpers.setLoading(true);
            this._base._appSessionObject.get(enAppSession.domainID).then((domainId) => {
                this._b2BPManagement.PlainOTP = this.model.PlainOTP;
                let otp = this._b2BPManagement.PlainOTP
                let b2a = btoa(this._b2BPManagement.PlainOTP);
                this._b2BPManagement.OTP = b2a;
                this._b2BPManagement.RequestedID = this.model.EmailID;
                this._b2BPManagement.RequestedBy = "USEREMAIL";
                this._b2BPManagement.Ref_Domain_ID = domainId;
                this._b2BPManagement.Flag = "Login";
                this._registerService.ValidateOTP(this._b2BPManagement).subscribe((data2) => {
                    this._base._appSessionObject.get(enAppSession.apiSecretKey).then(apiSecretKey => {
                        let convertedResponse = crypto.MD5('true' + apiSecretKey + otp).toString();
                        let convertedFalseResponse = crypto.MD5('false' + apiSecretKey + otp).toString()
                        if (data2 == convertedResponse) {
                            this._base._alertService.success(this._translate.instant("OTPVALIDATED"), true);
                            this.sendOtp = false;
                            this.validateOtp = false;
                            this.register = true;
                            Helpers.setLoading(false);
                        }
                        else if (data2 == convertedFalseResponse) {
                            this._base._alertService.error(this._translate.instant("OTPEXPIRED"), true);
                            window.scroll(0, 0);
                            Helpers.setLoading(false);
                        }
                        else {
                            this._base._alertService.error(this._translate.instant("OTPENTEREDISINVALID"), true);
                            window.scroll(0, 0);
                            Helpers.setLoading(false);
                        }
                    }, error => {
                    });
                });
            });
        }

    }

    /*
    *used this function for set password.
    */
    setpassword(fs: NgForm) {
        this.submitted1 = true;
        this._base._alertService.initAlert('alertRegister', AlertComponent, this);
        if (fs.valid) {
            Helpers.setLoading(true);
            this._base._appSessionObject.get(enAppSession.domainID).then((domainId) => {
                let _cp: ChangePassword = {
                    DomainID: domainId,
                    Option: "ChangePassword",
                    UserCode: this.model.EmailID,
                    OldPassword: this.model.OldPassword,
                    NewPassword: this.model.NewPassword,
                    userEmail: this.model.EmailID,
                    isSecuredPassword: true
                }
                let pinlength = _cp.OldPassword.length;
                if (_cp.OldPassword === _cp.NewPassword && pinlength == 4) {
                    this._appSessionObject.get(enAppSession.apiSecretKey).then(secretKey => {
                        let apiSecretKey = secretKey + "YP2B631J79353e"
                        let encKey = apiSecretKey.toString().substring(0, 16);
                        this._registerService.changePassword(_cp, encKey).subscribe((data2) => {
                            //this._base._alertService.success("Please check Confirmation link on " + " " + this.model.EmailID, true);
                            Helpers.setLoading(false);
                            this.confirmationmail();
                        });
                    });
                }
                else if (pinlength < 4) {
                    this._base._alertService.error(this._translate.instant("PLEASEENTER4DIGITPIN"), true);
                    Helpers.setLoading(false);
                }
                else {
                    this.submitted1 = true;
                    this._base._alertService.error(this._translate.instant("4DIGITPINDOESNOTMATCH"), true);
                    Helpers.setLoading(false);
                }
            });
        }
    }
    /*
    *used this function for Send OTP to register email id.
    *///
    sendotp() {
        this._base._alertService.initAlert('alertOTP', AlertComponent, this);
        if (this.resend != 1) {
            this.submitted1 = true;
        }
        Helpers.setLoading(true);
        this._base._appSessionObject.get(enAppSession.domainID).then(domainId => {
            this.domainId = domainId;
            this._b2BPManagement.RequestedID = this.model.EmailID;
            this._b2BPManagement.RequestedBy = "USEREMAIL";
            this._b2BPManagement.OTP = "";
            this._b2BPManagement.Ref_Domain_ID = this.domainId;
            this._b2BPManagement.Flag = "SIGNUP";
            this._b2BPManagement.PlainOTP = "";
            this._registerService.RequestOTP(this._b2BPManagement).subscribe((data) => {
                if (data == "Email ID / UserName Does Not Exist.") {
                    this.submitted = false;
                    this._base._alertService.error(this._translate.instant("EMAILDOESNOTEXIST"), true);
                    window.scroll(0, 0);
                    Helpers.setLoading(false);
                }
                else if (data == "OTP send to registered mail id.") {
                    this.submitted = false;
                    window.scroll(0, 0);
                    this._base._alertService.success(this._translate.instant("OTPSENDTO") + this.model.EmailID, true);
                    this.submitted1 = false;
                    this.sendOtp = false;
                    this.validateOtp = true;
                    Helpers.setLoading(false);
                }
                else if (data != "OTP send to registered mail id.") {
                    this.submitted = false;
                    window.scroll(0, 0);
                    this._base._alertService.error(data);
                    Helpers.setLoading(false);
                }
            });
        });
    }
    isEmailValid(e) {
        let email = e.target.value.toLowerCase();
        for (var i = 0; i < this._EmailDomainService.arrEmail.length; i++) {
            if (email.indexOf(this._EmailDomainService.arrEmail[i].toString().toLowerCase()) > -1) {
                this.isValidEmail = false;
                break;
            } else {
                this.isValidEmail = true;
            }
        }
    }

    confirmationmail() {
        this._base._alertService.initAlert('alertOTP', AlertComponent, this);
        this._base._appSessionObject.get(enAppSession.domainID).then(domainId => {
            this._base._appSessionObject.get(enAppSession.domainUrl).then(domainUrl => {
                this.domainId = domainId;
                this._b2BMailConfirmation.Ref_Domain_Id = this.domainId;
                this._b2BMailConfirmation.User_Email = this.model.EmailID;
                this._b2BMailConfirmation.Template = "";
                this._b2BMailConfirmation.DownloadURL = domainUrl;
                this._b2BMailConfirmation.Created_By = this.model.EmailID;
                this._registerService.confirmationmail(this._b2BMailConfirmation).subscribe((data) => {
                    if (data == "SEND") {
                        this.sendOtp = true;
                        this.validateOtp = false;
                        this.register = false;
                        this._base._alertService.success(this._translate.instant("MAILCONFIRMATIONLINK") + this.model.EmailID, true);
                        this.model.EmailID = "";
                        this.model.MobileNumber = "";
                        this.model.PlainOTP = "";
                        this.model.NewPassword = "";
                        this.model.OldPassword = "";
                        this.model.FirstName = "";
                        this.model.LastName = "";
                        this.model.companyname = "";
                        this.stateBind();
                        this.submitted1 = false;
                    }
                });
            });
        });
    }
    stateBind() {
        this._base._appSessionObject.get(enAppSession.domainID).then((domainId) => {
            this._registerService.bindState(domainId, 'State').subscribe((data) => {

                this.bindState = data[0].MasterData;
            });
        });
    }
    cityBind(parentId) {
        this._base._appSessionObject.get(enAppSession.domainID).then((domainId) => {
            this._registerService.bindCity(domainId, 'City', parentId).subscribe((data) => {

                this.bindCity = data[0].MasterData;
                Helpers.setLoading(false);
            });
        });
    }
    getSelectedStateID(ParentID) {
        Helpers.setLoading(true);
        this.stateID = ParentID.target.value;
        if (this.stateID > 0) {
            setTimeout(() => {
                this.cityBind(this.stateID);
                this.stateSelect = false;
                if (this.cityID == 0) {
                    if (this.submitted1 == true) {
                        this.citySelect = true;
                    }
                    Helpers.setLoading(false);
                }
            }, 100);
        } else {
            this.bindCity = null;
            this.stateSelect = true;
            this.citySelect = true;
            this.cityID = 0;
            Helpers.setLoading(false);
        }
    }
    getSelectedCityID(CityId) {
        this.cityID = CityId.target.value;
        this.citySelect = false;
        this.stateSelect = false;
    }

    smssend(_sms: iSms) {
        _sms.body = "Welcom to Zobble"
        _sms.from = "+17039886545"
        _sms.to = "+919673469491"
        this._smsService.sendSms(this._sms).subscribe((data) => {
            let test = data;
            alert(test);
        });
    }
    
}