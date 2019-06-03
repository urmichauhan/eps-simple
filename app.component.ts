//Created Date: 27/03/2018
//Created By: Ashish Tiwari
//Usage: Inject This file to any component to get and set the User Session
//Copyright:Violet InfoSystems Pvt.Ltd
import {
    Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Router } from '@angular/router';
import { Helpers } from "./helpers";
import { AppSessionObject, CommonService, MultiLingual, MultiTenancy, enAppSession, UserSession, ModalService, ApiService, ScriptLoaderService, LocalBackendService, FileManagerService, LoggingService, EncryptedStorage, AlertService, Navigation } from "./_appservices";
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
// import { CordovaNavigation } from "./_appservices/cordovanavigation/cordovanavigation";
// import { LocationStrategy } from '@angular/common';

import { ModalComponent } from './_appcontrollibrary';
//import { FeedbackListComponent } from './pages/feedbackmodule/component/feedbacklist/feedbacklist.component';
//import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { Platform, Events } from 'ionic-angular';
import { Network } from "@ionic-native/network";

import { Market } from '@ionic-native/market';
import { environment } from "../environments/environment"
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirebaseCrashlytics } from '@ionic-native/firebase-crashlytics/ngx';
// import { OneSignal } from '@ionic-native/onesignal';
declare let IRoot: any;
@Component({
    selector: 'ion-app',
    templateUrl: './app.component.html',
    encapsulation: ViewEncapsulation.None,
    // styleUrls: ['../assets/vendors/base/vendors.bundle.css', '../assets/app/css/base/style.bundle.css', '../assets/app/css/default/style.css',
    //     '../assets/app/css/default/responsive.css', '../assets/app/css/accordian/jquery.accordion.css', '../assets/vendors/custom/walkthrough/main.css', '../assets/vendors/custom/fullcalendar/fullcalendar.bundle.css']
})
export class AppComponent implements OnInit, AfterViewInit {

    title = 'app';
    globalBodyClass = 'm-page--loading-non-block m-page--fluid m--skin- m-content--skin-light2 m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default';
    platform: any
    @ViewChild('modalComponent',
        { read: ViewContainerRef }) modalComponent: ViewContainerRef;
    @ViewChild('modalComponents',
        { read: ViewContainerRef }) modalComponents: ViewContainerRef;
    // @ViewChild('alertAboutAppUdate',
    //     { read: ViewContainerRef }) alertAboutAppUdate: ViewContainerRef;
    // @ViewChild('alertAboutOffline',
    //     { read: ViewContainerRef }) alertAboutOffline: ViewContainerRef;
    playerId;
    isLangLoaded: boolean = false;
    isDomainLoaded: boolean = true;
    _langChangeEvent: LangChangeEvent;
    isNeedToUpdate: boolean = false;
    isShowUpdateButton: boolean = false;
    isShowUpdateMessage: boolean = false;
    updateMessageText: string = "";

    downloadManagerdata;
    courselist;
    courseWindowRef: any;
    constructor(
        private _router: Router,
        private _appSessionObject: AppSessionObject,
        private _commonService: CommonService,
        private _multiLingual: MultiLingual,
        private _translateService: TranslateService,
        private _multiTenancy: MultiTenancy,
        private _script: ScriptLoaderService,
        private _userSession: UserSession,
        private _modalService: ModalService,
        private _apiService: ApiService,
        private _platform: Platform,
        private _events: Events,
        private _fileManagerService: FileManagerService,
        private _loggingService: LoggingService,
        private _encryptedStorage: EncryptedStorage,
        private _localBackendService: LocalBackendService,
        private _network: Network,
        private _market: Market,
        private _splashScreen: SplashScreen,
        private _navigation: Navigation,
        private _iab: InAppBrowser,
        private _firebaseCrashlytics: FirebaseCrashlytics,
        // private _oneSignal: OneSignal
    ) {
    }

    ngOnInit() {
        if (window.location.href.indexOf("/home") == -1 
            && window.location.href.indexOf("/sso") == -1
            && window.location.href.indexOf("/launchscorm") == -1
            && window.location.href.indexOf("/launchmedia") == -1 
            && window.location.href.indexOf("/redirect") == -1
            && window.location.href.indexOf("/jwtauthenticate") == -1
            && window.location.href.indexOf("/deeplinkurl") == -1
            ) 
        {
            let currentVersion = localStorage.getItem('LMSver');
            if (currentVersion == undefined || currentVersion == "" || currentVersion == null || currentVersion == 'null' || currentVersion != environment.version) {
                this._encryptedStorage.clear();
                setTimeout(() => {
                    this._navigation.navigate(['logout']);
                }, 100);
    
            }
        }
        else
        {
            localStorage.setItem('LMSver',environment.version);
        }
     

        if (window.location.href.indexOf('login') == -1 && window.location.href.indexOf('passwordmanagement') == -1 && window.location.href.indexOf('changepassword') == -1)
            this._commonService.showMainUI(false);
        //localStorage.setItem('thirdparty', '');
        console.log('app component ngOnInit');
        console.log(new Date());
        this._platform.ready().then((readySource) => {
            console.log('app component _platform.ready()');
            console.log(new Date());
            if(this._commonService.isMobile()){
                if (this.platform.is('android')) {
                     this._firebaseCrashlytics.initialize();
                    this._firebaseCrashlytics.setUserIdentifier('sweta123456');
                     this._firebaseCrashlytics.logException('my caught exception');
                 }
            }
        //     this._oneSignal.handleNotificationReceived().subscribe((jsonData) => {
        //         alert('handleNotificationReceived: ' + JSON.stringify(jsonData))
        //         // do something when notification is received
        //       // console.log(jsonData.notification.payload.body);
        //        console.log('handleNotificationReceived: ' + JSON.stringify(jsonData));
        // });
    
        // this._oneSignal.handleNotificationOpened().subscribe((jsonData) => {
            // do something when a notification is opened
           // debugger;
            //console.log(jsonData.notification.payload.body);
       //      alert('notificationOpenedCallback: ' + JSON.stringify(jsonData))
       //      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
       //  });
            ////Added by Ashish Tiwari to enable diable development mode.
            if (window.location.origin.indexOf('localhost') > 0)
                Helpers.enableDevelopementMode(true);
            else
                Helpers.enableDevelopementMode(false);

            this._commonService.init();
            //Added By Ashish To Set the Language based on User Prefrences stored in Storage.
            this._multiLingual.initLanguage(this._translateService, this._langChangeEvent);
            //alert('appcomponent init')
            //Added by: Ashish Tiwari:Date: 10/04/2018: Comments: This is to set the platform globally, do not comment this line as some css fix based on browser has been applied.
            this.platform = this._commonService.platform();
            if (this._commonService.isMobile()) {
                this._fileManagerService.checkfolderstrucute();
            }

            this.subscribeEvent();
            // this._cordovaNavigation.init();
            this._platform.resume.subscribe(da => {
                console.log('Resume: ' + da);
            });
            this._platform.pause.subscribe(da => {
                console.log('Pause: ' + da);
            });


            // setTimeout(() => {
            //     this.checkForUpdate();
            // }, 1500);
            this._splashScreen.hide();
        });
    }

    ngAfterViewInit(): void {
        this._platform.ready().then((readySource) => {
            console.log('after view Init');
            this.resetThirdPartySession();
            //Load The domain setting and default configuration
            //On Each Startup we need to refresh the domain data.
            if (this._commonService.isMobile()) {
                this._appSessionObject.get(enAppSession.hasLoggedIn).then((hasLoggedIn) => {
                    if (hasLoggedIn != null && hasLoggedIn != undefined && hasLoggedIn != "" && hasLoggedIn == true) {
                        this.loadDomainSetting();
                        this.initializeUserSessionOnAutoLogin(false);
                        //if (this._platform.is('ios') || this._platform.is('ipad') || this._platform.is('iphone')) {
                        //alert('redirected')
                        //  this._router.navigate([this._multiTenancy.currentDomainModel, 'index']);
                        // }
                    }
                    else {
                        if (this._platform.is('ios') || this._platform.is('ipad') || this._platform.is('iphone')) {
                            this.redirectToLogin();
                        }

                    }
                });
                this._platform.ready().then((readySource) => {
                    this.checkForRootedDevice();
                });
            }
            else {
                this.loadDomainSetting();
                this._appSessionObject.get(enAppSession.hasLoggedIn).then((hasLoggedIn) => {
                    if (hasLoggedIn != null && hasLoggedIn != undefined && hasLoggedIn != "" && hasLoggedIn == true) {
                        this.initializeUserSessionOnAutoLogin(true);
                    }
                });
            }

            setTimeout(() => {
                this.checkForUpdate();
            }, 2000);
        });
    }

    /**
     * Subscribe the global events at the time of startup
     */
    subscribeEvent() {
        this._events.subscribe('eraseUserofflineData', (domainID, userAccountID) => {
            Helpers.setLoading(true);
            if (domainID != undefined && domainID != null && domainID != "") {
                this._localBackendService.get('downloadManager.json').subscribe(downloadManagerdata => {
                    this.downloadManagerdata = downloadManagerdata;
                    let downloadDetails = this.downloadManagerdata.filter(res => res.Ref_UserId == userAccountID && res.Ref_Domain_ID == domainID);
                    console.log(downloadDetails);
                    if (downloadDetails.length) {
                        for (let i = 0; i > downloadDetails.length; i++) {
                            let FilePath = downloadDetails[i].FilePath
                            let FolderName = downloadDetails[i].FolderName
                            this._fileManagerService.removeRecursively(this._fileManagerService._file.dataDirectory + FilePath, FolderName).then(data => {
                            });
                        }
                        downloadDetails.map(function (item) {
                            item.IsDeleted = 1;
                        });
                        this._localBackendService.set(this.downloadManagerdata, 'downloadManager.json').then(data => {

                            this._localBackendService.get("courseList.json").subscribe(courselist => {
                                this.courselist = courselist;
                                console.log(courselist);
                                let courseTable
                                courseTable = this.courselist.courses.filter(result => result.Ref_Domain_ID == domainID && result.Ref_UserId == userAccountID);
                                courseTable.map(function (item) {
                                    item.newUpdatedPath = '';
                                    item.IsDownloaded = '0';
                                    item.Active = '0';
                                });
                                this._localBackendService.set(this.courselist, "courseList.json").then(result => {
                                    this.redirectToLogin();
                                });
                            });
                        });
                    }

                });
            }


        });
        this._events.subscribe('logoutDevice', (domainID, userAccountID) => {
            this.redirectToLogin();
        });

        this._events.subscribe('changeLanguage', (lngcode) => {
            //  alert('changeLanguage')
            this.isLangLoaded = true;
        });
        this._events.subscribe('domainLoaded', (lngcode) => {

            if (this._multiTenancy != null && this._multiTenancy != undefined) {
                if (this._multiTenancy.isCompleteVersion == 'no') {
                    $('app-aside-nav').hide();
                }
            }



            //this._splashScreen.hide();
            Helpers.setLoading(false);
            console.log('domainLoaded')
            console.log(new Date())
            this.isDomainLoaded = true;
            if (this._commonService.isMobile() == false) {
                this._appSessionObject.getDomainSetting('rbtAppRedirectVersion').then(rbtDomainFrontendActive => {
                    if (rbtDomainFrontendActive[0].SwitchValue.toUpperCase() == "V8" && window.location.href.indexOf('localhost') == -1) {
                        window.location.href = "/Login.aspx";
                    }
                });
            }
            else {
                // alert(this.thirdPartyName);
                // if(this.thirdPartyName!="")
                // {
                //     this.checkForThirdParty(this.thirdPartyName);
                // }

            }
            this._modalService.initModal('modalComponent', ModalComponent, this);
            this._multiTenancy.setProjetIconTitle();
            // this.loadsavedDataAndConfiguration();
            this._apiService.SwitchEnvoirement(false);
            this._appSessionObject.getLanguage().then(lngCode => {
                this._multiLingual.changeLanguage(lngCode);
                this._multiLingual.initLanguage(this._translateService, this._langChangeEvent);
            })
            this._loggingService.initOneSignal();
            //Initialize the Google analytics                      
            this._loggingService.initializeGoogleAnalytics();
            Helpers.setLoading(false);

        });
        this._events.subscribe('signOut', () => {

        });
        this._events.subscribe('signIn', () => {
            //Added the below code to initiate the folder creation and syncing process if user logged in to the mobile app.
            // this._platform.ready().then(() => {
            //     if (this._commonService.isMobile()) {
            //         let getCurrentDateTime = this._offlineElearnSharedDataService.getCurrentDateTime();
            //         localStorage.setItem('LastSyncData', getCurrentDateTime);
            //         this._fileManagerService.checkfolderstrucute();
            //         setTimeout(() => {
            //             this._offlineElearnSharedDataService.getfirttimeElearnData().then((data) => {
            //                 localStorage.setItem('AssingedCourse', 'true');
            //             });
            //         }, 2000);

            //     }
            // });

        });
        let connectSubscription = this._network.onConnect().subscribe(() => {
            if (this._commonService.isMobile()) {
                // this._alertService.initAlert('alertAboutOffline', AlertComponent, this);
                this._modalService.success("You are online...");
                this._appSessionObject.get(enAppSession.hasLoggedIn).then((hasLoggedIn) => {
                    if (hasLoggedIn != null && hasLoggedIn != undefined && hasLoggedIn != "" && hasLoggedIn == true) {
                        // this._platform.ready().then(() => {
                        //     //this._fileManagerService.folderCreateforCorses();
                        //     if (this._commonService.isOnLine()) {
                        //         this._offlineElearnSharedDataService.synDataWithDatabseForScormData()
                        //         this._offlineElearnSharedDataService.synDataforSinglefile();
                        //     }
                        // });
                    }
                });
            }
        });
        this._events.subscribe('switchProtocol', (protoCol) => {
            // alert(protoCol);
            this.switchProtocol(protoCol);
        });
        let connectUnSubscription = this._network.onDisconnect().subscribe(() => {
            this._modalService.error("You are offline...");
            // setTimeout(() => {
            //     $('.close').hide();
            // }, 0);
        })
        /**
        *Change the domain model based on domain setting.
        */
        this._events.subscribe('switchDomainModel', this.switchDomainModel)
        //   (protoCol) => {
        //         // alert(protoCol);
        //         this.switchDomainModel(protoCol);


        //     });


        /**
         *If user enter the url after domain name and press enter system will raise event and to check whether it is third party url or not 
         */
        this._events.subscribe('checkForThirdParty', (tpname) => {
            this.thirdPartyName = tpname
            this.checkForThirdParty(tpname);
        });


    }
    thirdPartyName = "";
    /**
     * Check if Domain and Language loaded correctly.
     */
    isPlatformIntialize() {
        if (this._commonService.isMobile() === true) {
            //this._events.publish('pageOnInit');
            return true;
        }
        else if (this.isLangLoaded === true && this.isDomainLoaded === true && this.isNeedToUpdate == false) {

            //this._events.publish('pageOnInit');
            //this.loadData(true);
            // pageOnInit(this.isLangLoaded,isDomainLoaded);
            return true;
        }
        else {
            Helpers.setLoading(true);
            return false;
        }
    }

    /**
     * Redirect to login page.
     */
    redirectToLogin() {
        //this is fix since same router navigation causing session time out JS not getting unload.
        this._loggingService.setDeviceInfo("LOGOUT");
        if (this._commonService.isMobile()) {
            this._router.navigate(['/logout']);
        }
        else if (window.location.href.indexOf('localhost') >= 0) {
            if (window.top != undefined) {
                window.top.location.href = '/logout';
            }
            else {
                window.location.href = '/logout';
            }

        }
        else {
            if (window.top != undefined) {
                window.top.location.href = '/logout.aspx';
            }
            else {
                window.location.href = '/logout.aspx';
            }
        }

    }

    /**
     * Check for update if new version is available.
     */
    checkForUpdate() {
        if (window.location.href.indexOf("/home") == -1 && window.location.href.indexOf("/sso") == -1 && window.location.href.indexOf("/launchscorm") == -1
            && window.location.href.indexOf("/launchmedia") == -1) {
            this._commonService.checkForNewVersion().subscribe((returnData: any) => {
                if (returnData != null && returnData != undefined && returnData != "") {
                    if (returnData.isOldVersion === true && returnData.promptToUser === true && returnData.mandatoryUpdate === true) {
                        //Force User To udpdate the app
                        // alert(returnData.releaseNote);

                        this.isDomainLoaded = false;
                        this.isLangLoaded = false;
                        this.isNeedToUpdate = true;
                        this.isShowUpdateMessage = true;
                        this.updateMessageText = returnData.releaseNote;
                        // this._alertService.initAlert('alertAboutAppUdate', AlertComponent, this);
                        // this._alertService.error(returnData.releaseNote);
                        Helpers.setLoading(false);
                        if (this._commonService.isMobile() == true) {
                            this.isShowUpdateButton = true;
                        }

                        // setTimeout(() => {
                        //     $('.close').hide();
                        // }, 0);



                    }
                    else if (returnData.isOldVersion === true && returnData.promptToUser === true) {
                        //Just Inform user that for there is new version available
                        if (this._commonService.isMobile() == true) {
                            this.isShowUpdateButton = true;
                        }
                        this.isShowUpdateMessage = true;
                        this.updateMessageText = returnData.releaseNote;
                        // this._alertService.initAlert('alertAboutAppUdate', AlertComponent, this);
                        // this._alertService.error(returnData.releaseNote);
                        Helpers.setLoading(false);

                    }
                }
            },
                error => {
                    console.log(error);
                });
        }
    }

    /**
     * Go to app store or playstore to update the app.
     */
    goToStore() {
        try {
            this._market.open(this._commonService.packageName);
        }
        catch (ex) {
            console.log('error while opening market place');
        }

    }

    /**
     * Change the current protocol.
     * @param currentProtoCol 
     */
    switchProtocol(currentProtoCol) {
        if (this._commonService.isMobile() == false && window.location.href.indexOf("localhost") == -1) {
            if (window.location.protocol != currentProtoCol) {
                let newUrl = location.href.replace('http', 'https');
                let tpName = decodeURIComponent(localStorage.getItem('tp'));
                // alert('switchProtocol'+tpName)
                if (tpName != "" && tpName != undefined && tpName != null && tpName != "null") {
                    localStorage.setItem('LMSver',environment.version);
                    window.location.href = newUrl + "b2cthirdpartylogin/" + tpName;
                }
                else {
                    localStorage.setItem('LMSver',environment.version);
                    window.location.href = newUrl;
                }


            }
        }

    }

    /**
     * Change the current domain business model.
     * @param currentProtoCol current domain model
     */
    switchDomainModel(currentProtoCol) {
        // this._platform.ready().then((readySource) => {
        try {
            if (typeof this != "undefined") {
                if (currentProtoCol == "enterprise") {
                    console.log(typeof this.isDomainLoaded);
                    $("#menuIconNavBar").hide();
                    if (this.isDomainLoaded != undefined) {
                        this.isDomainLoaded = false;
                        this.isLangLoaded = false;
                        let tpName = decodeURIComponent(localStorage.getItem('tp'));
                        // alert('App component domain model tpName '+tpName);
                        if (tpName != null && tpName != "" && tpName != undefined && tpName != "null") {

                            this.checkForThirdParty(tpName)
                            if (this._events != undefined) {
                                if (this.switchDomainModel) {
                                    this._events.unsubscribe('switchDomainModel', this.switchDomainModel)
                                }
                            }

                        }
                        else if (window.location.href.indexOf(currentProtoCol) == -1 && window.location.href.indexOf('jwtauthenticate') == -1 && window.location.href.indexOf('deeplinkurl') == -1 && window.location.href.indexOf('setnewpassword') == -1) {
                            this._appSessionObject.get(enAppSession.hasLoggedIn).then((hasLoggedIn) => {
                                if (hasLoggedIn != null && hasLoggedIn != undefined && hasLoggedIn != "" && hasLoggedIn == true) {
                                    if (window.location.href.indexOf(currentProtoCol) == -1 && window.location.href.indexOf('logout') == -1 && window.location.href.indexOf('login') == -1 && window.top.location.href.indexOf('admin_home') == -1 && window.location.href.indexOf('admin_home') == -1) {
                                        //alert('domain loaded'+'INDEX')
                                        this._navigation.navigate([currentProtoCol, 'index']);
                                    }

                                }
                                else {
                                    // alert('domain loaded'+'home')
                                    this._navigation.navigate(['enterprisehome']);
                                }
                                this.isDomainLoaded = true;
                                this.isLangLoaded = true;
                            });
                        }
                        else {
                            this.isDomainLoaded = true;
                            this.isLangLoaded = true;
                        }
                    }


                } else {

                    if (window.location.href.indexOf('jwtauthenticate') == -1 && window.location.href.indexOf('deeplinkurl') == -1 && window.location.href.indexOf('setnewpassword') == -1) {
                        this._appSessionObject.get(enAppSession.hasLoggedIn).then((hasLoggedIn) => {
                            if (hasLoggedIn != null && hasLoggedIn != undefined && hasLoggedIn != "" && hasLoggedIn == true) {
                                if (window.location.href.indexOf(currentProtoCol) == -1 && window.location.href.indexOf('logout') == -1 && window.location.href.indexOf('login') == -1 && window.top.location.href.indexOf('admin_home') == -1 && window.location.href.indexOf('admin_home') == -1) {
                                    //  alert('App component domain model');
                                    // this._navigation.navigate([currentProtoCol, 'index']);
                                    this.redirectToModule();
                                }
                            }
                        });
                    }
                }
            }
        }
        catch (exce) {
            console.log(exce)
        }
        // })

    }

    /**
     * Check for rooted device.
     */
    checkForRootedDevice() {
        //Check if device is rooted then redirect to error page
        if (this._commonService.isMobile() === true && environment.isRootedEnabled === false) {
            if ((<any>IRoot) != undefined && (<any>IRoot) != null) {
                // available => iOS + Android
                (<any>IRoot).isRooted(

                    (isSuccess) => {
                        console.log(isSuccess)
                        if (isSuccess) {
                            this._router.navigate(['/rootederror']);
                        }
                    }
                    , (error) => {
                        console.log(error);
                    });

                // available => Android
                (<any>IRoot).isRootedRedBeer(
                    (isSuccess) => {
                        console.log(isSuccess)
                        if (isSuccess) {
                            this._router.navigate(['/rootederror']);
                        }
                    }
                    , (error) => {
                        console.log(error);
                    });

            }

        }
    }

    /**
     * Load the domain setting
     */
    loadDomainSetting() {
        if (window.location.href.indexOf("/home") == -1 && window.location.href.indexOf("/sso") == -1 && window.location.href.indexOf("/launchscorm") == -1
            && window.location.href.indexOf("/launchmedia") == -1) {
            try {
                this._multiTenancy.initMultiTenancy(this._multiTenancy.domainName, true)
                    .then(res => {
                        // this.loadData(res);
                    });
            }
            catch (exc) {
                console.log('Old Logic hence logout')
                this._encryptedStorage.clear();
                Helpers.setLoading(true);
                setTimeout(() => {
                    this._navigation.navigate(['logout']);
                }, 100);

            }


        }
    }

    /**
     * Initialize the user session on auto login.
     */
    initializeUserSessionOnAutoLogin(isValidateLastCloseTime) {
        //Init the User Session
        // setTimeout(() => {           
        this._userSession.initUserSession(isValidateLastCloseTime).then((resp) => {
            // alert('resp Login: '+resp);
            if (resp == false) {
                this.redirectToLogin();
            } else if (resp == true) {
                // if (this._multiTenancy.currentDomainModel == "enterprise") {
                //     this._navigation.navigate(['enterprise', 'index']);
                // }
                // else {
                //Added by brijesh kushwaha for ofline Application logo and Third Party Logo.
                localStorage.setItem("thirdPartyLogoDownloadFirstTime", "0");
                localStorage.setItem("logoDownloadFirstTime", "0");
                this._loggingService.setDeviceInfo("LOGIN");
                this.redirectToModule();
                //}

            }
        });
        // }, 2000);

    }

    redirectToModule() {
        //alert('App component:redirectToModule');
        let returnUrl;
        setTimeout(() => {
            this._appSessionObject.getDomainSetting('rbtBusinessModel').then(rbtBusinessModel => {
                this._multiTenancy.currentDomainModel = rbtBusinessModel[0].SwitchValue.toLowerCase();

                if (environment.isSandbox) {
                    returnUrl = "/elearn";
                    this._router.navigate([this._multiTenancy.currentDomainModel, 'elearn']);
                }
                if (this._commonService.isMobile() == true) {
                    if (this._commonService.isOnLine() == false) {
                        this._appSessionObject.get(enAppSession.domainID).then((domainId) => {
                            if(domainId == "20191"){
                                this._router.navigate([this._multiTenancy.currentDomainModel, 'learningpath']);
                            }else{
                                this._router.navigate([this._multiTenancy.currentDomainModel, 'elearn']); 
                            }
                        })
                    }
                    else if (this._multiTenancy.isCompleteVersion == 'no') {
                        //this.launchThirdpartyURL("https://www.amazon.com/")
                        this._router.navigate([this._multiTenancy.currentDomainModel, this._multiTenancy.activeModuleName]);
                        //window.location.href="https://uatft-1.violetlms.com"

                    } else {
                        // this.launchThirdpartyURL("https://www.amazon.com/")
                        this._router.navigate([this._multiTenancy.currentDomainModel, 'index']);
                        //window.location.href="https://uatft-1.violetlms.com"
                    }
                }
                else if (this._multiTenancy.isCompleteVersion == 'no' && window.top.location.href.indexOf('admin_home') == -1 && window.location.href.indexOf('admin_home') == -1) {
                    //this.launchThirdpartyURL("https://www.amazon.com/")
                    this._router.navigate([this._multiTenancy.currentDomainModel, this._multiTenancy.activeModuleName]);

                } else {
                    // this._router.navigate([this._multiTenancy.currentDomainModel, 'index']);
                }
            })
        }, 500);


    }

    /**
     *If user enter the url after domain name and press enter system will raise event and to check whether it is third party url or not 
     */
    checkForThirdParty(tpname) {
        tpname = decodeURIComponent(tpname)
        this.isDomainLoaded = false;
        this.isLangLoaded = false;
        this._multiTenancy.initMultiTenancy(this._multiTenancy.domainName).then(data => {
            this.isDomainLoaded = false;
            this.isLangLoaded = false;
            //   setTimeout(() => {
            if (this._multiTenancy.currentDomainModel == "enterprise") {
                this._commonService.checkForThirdParty(tpname).subscribe((tpData: any) => {
                    console.log(tpData)
                    this.isDomainLoaded = true;
                    this.isLangLoaded = true;
                    if (tpData != null && tpData != undefined && tpData != "" && tpData != "null") {
                        if (tpData.length > 0) {
                            this._encryptedStorage.set(enAppSession.thirdPartyName, tpname);
                            this._encryptedStorage.set(enAppSession.tpLogoUrl, tpData[0].logoUrl)
                            this._navigation.navigate(['enterprisethirdpartylogin', tpname]);
                            setTimeout(() => {
                                this._multiTenancy.setProjetIconTitleForTP();
                            }, 300);


                            //window.location.href = "b2cthirdpartylogin/" + tpname
                        }
                        else {
                            this._navigation.navigate(['enterprisenotfound']);
                            //window.location.href = "b2cnotfound";
                        }

                    }
                    else {
                        this._navigation.navigate(['enterprisenotfound']);
                    }

                },
                    error => {
                        this.isDomainLoaded = true;
                        this.isLangLoaded = true;
                        this._navigation.navigate(['enterprisenotfound']);
                    }
                );
            }
            else {
                this.isDomainLoaded = true;
                this.isLangLoaded = true;
            }
            // }, 0);
        });
    }

    /**
     * Reset the thirdparty session in case of origin and entered url is same.
     */
    resetThirdPartySession() {
        //Reset the third party session incase of root url and user is not logged in.
        if (window.location.origin == window.location.href || window.location.origin + "/" == window.location.href) {
            this._appSessionObject.get(enAppSession.hasLoggedIn).then((hasLoggedIn) => {
                if (hasLoggedIn == null || hasLoggedIn == undefined || hasLoggedIn == false) {
                    this._encryptedStorage.set(enAppSession.thirdPartyName, "");
                }
            });

        }
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
            // alert("Network error ! Please try again.");
            //this.courseWindowRef.close();
            //this._screenOrientation.unlock();
        });

        // Reset old value - if any.
        this.courseWindowRef.on('loadstart').subscribe((e) => {

        });
        this.courseWindowRef.on('loadstop').subscribe(() => {
            // This called when error occurs while loading the page.
            // alert("Network error ! Please try again.");
            //this.courseWindowRef.close();
            //this._screenOrientation.unlock();
        });
    }

}