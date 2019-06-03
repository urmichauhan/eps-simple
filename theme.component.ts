import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { UserApiConstant } from "../_model/apiconstant";
import { MultiTenancy, AppSessionObject, MultiLingual, UserSession, CommonService, ApiService, enAppSession, BreadCrumbService, ScriptLoaderService, Helpers, WalkthroughService, FileManagerService } from "../_appservices";
// Added by Bhavesh Savla - Check for pending feedbacks after login.
import { BaseComponent, BaseComponentHelper } from '../appbase';
import { environment } from '../../environments/environment';

declare let mApp: any;
declare let mUtil: any;
declare let mLayout: any;

@Component({
    selector: ".m-grid.m-grid--hor.m-grid--root.m-page",
    templateUrl: "./theme.component.html",
    encapsulation: ViewEncapsulation.None,
    providers: []
})
export class ThemeComponent extends BaseComponent implements OnInit, AfterViewInit {

    feedbackMode: string;
    elearnFeedback: string = '';
    trainingFeedback: string = '';
    elearnPendingCount: number = 0;
    trainingPendingCount: number = 0;
    //walkthrough variables
    //Added by suraj
    walkthroughData: any;
    platform: any;
    isMobile: boolean = false;
    stage: string = "HomepageHeaderTutorialUser";
    oldcount: number;
    newcount: number;
    data: any;
    constructor(
        private _script: ScriptLoaderService,
        private _router: Router,
        private _multiTenancy: MultiTenancy,
        private _multiLingual: MultiLingual,
        private _translate: TranslateService,
        private _userSession: UserSession,
        private _commonService: CommonService,
        private _apiService: ApiService,
        private _walkthroughService: WalkthroughService,
        _base: BaseComponentHelper, private _breadCrumbService: BreadCrumbService,
        private _fileManagerService: FileManagerService,
        private _appSessionObject: AppSessionObject,
    ) {
        super(_base);
        Helpers.setLoading(false);
    }
    ngOnInit() {
        if(window.parent.location.href.indexOf('admin_home')>0)
        this._commonService.showMainUI(true);

        let _langChangeEvent: LangChangeEvent
        //Added By Ashish To Set the Language based on User Prefrences stored in Storage.
        this._multiLingual.initLanguage(this._translate, _langChangeEvent);
        Helpers.setLoading(false);
        this._script.loadScripts('ion-app', ['./assets/vendors/base/vendors.bundle.js', './assets/app/js/scripts.bundle.js'], false)
            .then(result => {
                Helpers.setLoading(false);
            });
        this._router.events.subscribe((route) => {
            if (route instanceof NavigationStart) {
                this._commonService.showMainUI(false);
                if ((<any>mLayout) != undefined) {
                    try {
                        if ((<any>mLayout).closeMobileAsideMenuOffcanvas() != undefined) {
                            (<any>mLayout).closeMobileAsideMenuOffcanvas();
                            //(<any>mLayout).closeMobileHorMenuOffcanvas();                 
                        }
                    }

                    catch (exception) {
                        console.log(exception);
                    }
                }
                (<any>mApp).scrollTop();
                //Helpers.setLoading(true);
                 //alert('NavigationStart'+ route.url);
                // hide visible popover
                (<any>$('[data-toggle="m-popover"]')).popover('hide');
                // if (this._base._commonService.isMobile() == true) {
                if (route.url.indexOf("undefined") > 0) {
                    //  alert(route.url);
                    this._base._navigation.navigate(["/index"]);
                }
                // }
               this.unToggleMenuInWeb();
            }
            if (route instanceof NavigationEnd) {
                // init required js
                (<any>mApp).init();
                (<any>mUtil).init();
                Helpers.setLoading(false);
                //alert('NavigationEnd'+ route.url);          
                // content m-wrapper animation
                let animation = 'm-animate-fade-in-up';
                $('.m-wrapper').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function (e) {
                    $('.m-wrapper').removeClass(animation);
                }).removeClass(animation).addClass(animation);
                $('.modal-backdrop').hide();
                $('body').removeClass('modal-open'); //added by Pallavi
                $('.modal-backdrop').removeClass('show');
                $('.close').click();
                $('.modal').each((index, Element: any) => {
                    if (Element != undefined && Element != null)
                        $(Element).hide()
                })
                $('.modal-backdrop').each((index, Element: any) => {
                    if (Element != undefined && Element != null)
                        $(Element).hide()
                })
                setTimeout(() => {
                    this._multiTenancy.initMultiTenancy(this._multiTenancy.domainName);
                    this._base._loggingService.setGoogleAnalyticsScreenPageView(this._multiTenancy.domainName, route.url, route.url)
                    if ($('.parent').length == 1 && this._breadCrumbService.breadcrumbs.length >= 1 && route.url.indexOf('subtopic/')==-1)
                    {                         
                        this._breadCrumbService.goToRoot();
                    }     
                    if (localStorage.getItem('islaunchfromextmodule') == 'true') {
                        let url_ext=localStorage.getItem('url_ext');                                        
                        if(url_ext!=null && url_ext!='null' && url_ext!=undefined && url_ext!="")
                        {
                            if (url_ext != route.url) {
                                localStorage.setItem('islaunchfromextmodule','false');
                                localStorage.setItem('url_ext', '');
                                $('.breadcrumb1').show();
                            }
                        }
                     
                    }

                    if (localStorage.getItem('islaunchfromextmodule') == 'true') {  
                        $('.breadcrumb1').hide();
                        localStorage.setItem('url_ext', route.url);
                    }
                    
                        this._commonService.showMainUI(true);
                }, 100);
                //Keep checking in background for device active and user active status.
                this._base._appSessionObject.get(enAppSession.hasLoggedIn).then((hasLoggedIn) => {
                    // console.log("1. hasLoggedIn = " + hasLoggedIn);
                    if (hasLoggedIn != null && hasLoggedIn != undefined && hasLoggedIn != "" && hasLoggedIn == true) {
                      
                        this._base._appSessionObject.get(enAppSession.isDeviceInfoSet).then((isDeviceInfoSet) => {
                            if (isDeviceInfoSet != null && isDeviceInfoSet != undefined && isDeviceInfoSet != "" && isDeviceInfoSet == 'yes') {
                                if(this._userSession.isSingleDeviceMessageShown===false)
                                {
                                    this._userSession.isSingleDeviceMessageShown=true;
                                    setTimeout(() => {
                                        this._userSession.validateDeviceAndaccountStatus();
                                    }, 500);
                                }
                            }
                        })
                    }
                });

                this.getNotificationcount();
                if (this._base._commonService.isMobile() == true) {
                    if (this._base._commonService.isOnLine() == false) {
                        if (route.url.toLowerCase().indexOf("elearn") == -1) {
                            this._base._modalService.error("You are offline...");
                        }

                    }
                }
            }
        });
       
        setTimeout(() => {
            this._multiTenancy.initMultiTenancy(this._multiTenancy.domainName).then(data => {
                this._base._commonService.switchEnvoirement();
            });
        }, 1000);


    }
    unToggleMenuInWeb() {
        if (this._base._commonService.isMobile() == false) {
            setTimeout(() => {              
                if ($('.m-aside-left--on').length> 0) {
                    $('#m_aside_left_minimize_toggle').trigger('click');
                }

            }, 50);

        }
    }

    ngAfterViewInit(): void {
        // if (this._base._commonService.isMobile()) {
        //     this._fileManagerService.checkfolderstrucute();
        // }

        // added by Bhavesh Savla 24/01/19 - also check for non-submitted API data after login.
        this._base._appSessionObject.get(enAppSession.hasLoggedIn).then((hasLoggedIn) => {
            // console.log("2. hasLoggedIn = " + hasLoggedIn);
            if (hasLoggedIn != null && hasLoggedIn != undefined && hasLoggedIn != "" && hasLoggedIn == true) {
              
            }
        });

        // added by manish 29/09/2018 for hide feedback popup when login 
        this._base._appSessionObject.getDomainSetting("chkFeedBack").then(feedbackModuleData => {
            if (feedbackModuleData != undefined && feedbackModuleData != null) {
                if (feedbackModuleData.length > 0) {
                    feedbackModuleData.forEach(element => {
                        if (element.SwitchValue.toUpperCase().trim() == 'ELEARN') {
                            this.elearnFeedback = 'ELEARN';
                        }
                        if (element.SwitchValue.toUpperCase().trim() == 'TRAINING') {
                            this.trainingFeedback = 'TRAINING';
                        }
                    });
                    // if (this.elearnFeedback === 'ELEARN' || this.trainingFeedback === 'TRAINING') {
                    // setTimeout(() => {
                    //     Helpers.setLoading(false);
                    //     this.loadPendingFeedBack();
                    //     Helpers.setLoading(false);
                    // }, 500);
                    //added by suraj
                    // this._base._appSessionObject.get(enAppSession.domainID).then((domainId) => {
                    //     this._base._appSessionObject.get(enAppSession.id).then((Id) => {
                    //         this._walkthroughService.walkthroughStatus(domainId, Id, this.stage).subscribe((data) => {
                    //             this.walkthroughData = data;
                    //             this.isMobile = this._base._commonService.isMobile();
                    //             if (this.isMobile == false) { this.platform = "WEB"; }
                    //             else if (this.isMobile == true) { this.platform = "MOB"; }
                    //             this.walkthroughData = this.walkthroughData.filter(res => res.Walkthrough_Caption == this.stage && res.Platform == this.platform);
                    //             if (this.walkthroughData[0] != null) {
                    //                 this.walkthroughData = this.walkthroughData.filter(res => res.IsWalkthroughDone == true);
                    //                 if (this.walkthroughData[0] == null) {
                    //                     setTimeout(() => {
                    //                         if (localStorage.getItem("WT") == "true") {
                    //                             let intervalData = setInterval(() => {
                    //                                 if (localStorage.getItem("WT") == "close") {
                    //                                     clearInterval(intervalData);
                    //                                     setTimeout(() => {
                    //                                         Helpers.setLoading(true);
                    //                                         this.loadPendingFeedBack();
                    //                                         (<any>mApp).scrollTop();
                    //                                     }, 500);
                    //                                 }
                    //                             }, 50);
                    //                         }
                    //                     }, 3000);
                    //                 }
                    //                 else {
                    //                     Helpers.setLoading(true);
                    //                     this.loadPendingFeedBack();
                    //                     (<any>mApp).scrollTop();
                    //                 }
                    //             }
                    //             else {
                    //                 Helpers.setLoading(true);
                    //                 this.loadPendingFeedBack();
                    //                 (<any>mApp).scrollTop();
                    //             }
                    //         },
                    //             error => {
                    //                 this._base._globalErrorHandler.logError(error, "header_nav", "walkthrough", "walkthroughStatus", window.location);
                    //             });
                    //     });
                    // });
                    //End by suraj
                    // }
                }
            }
        });
        //end

        // Helpers.setLoading(true);
        // this.loadPendingFeedBack();
        (<any>mApp).scrollTop();
        // setTimeout(() => {
        //     $('.parent').eq($('.parent').length - 1).show();
        // }, 200);


    }

	

    /* ************************************************************************** */

    loadPendingFeedBack() {
        // let fbFormData: any;
        // let pendingFeedbackCount = 0;
        // this._base._appSessionObject.get(enAppSession.domainID).then(domainID => {
        //     // this._base._appSessionObject.get(enAppSession.UserAccountID).then(UserCode => {
        //     this._feedbackListService.getFeedbackData(domainID, "ALL", "REMAINING").subscribe(data => {
        //         fbFormData = data;
        //         if (fbFormData.length) {
        //             this.elearnPendingCount = (fbFormData.filter((s) => s.moduleType == 'ELEARN')).length;
        //             this.trainingPendingCount = (fbFormData.filter((t) => t.moduleType == 'TRAINING')).length;
        //             if (this.elearnFeedback == "ELEARN" && this.trainingFeedback == "TRAINING") {
        //                 pendingFeedbackCount = this.elearnPendingCount + this.trainingPendingCount;
        //             }
        //             if (this.elearnFeedback == "ELEARN" && this.trainingFeedback == "") {
        //                 pendingFeedbackCount = this.elearnPendingCount;
        //             }
        //             if (this.elearnFeedback == "" && this.trainingFeedback == "TRAINING") {
        //                 pendingFeedbackCount = this.trainingPendingCount;
        //             }
        //         }
        //         // console.log("Pending feedbacks.....count ", pendingFeedbackCount);
        //         // console.log("Pending feedbacks..... ", fbFormData);
        //         // fbFormData.filter(x => {
        //         //     if (x.isFeedbackMandatory == "1") {
        //         //         pendingFeedbackCount++;
        //         //     }
        //         // });
        //         Helpers.setLoading(false);
        //         if (pendingFeedbackCount != 0) {
        //             // There are pending Feedbacks. Redirect to Feedback List page.
        //             Helpers.setLoading(false);
        //             this._base._navigation.navigate(['feedback','feedbacklist']);
        //         }
        //         Helpers.setLoading(false);
        //     },
        //         error => {
        //             Helpers.setLoading(false);
        //             this._base._globalErrorHandler.logError(error, "theme", "theme.component", "loadPendingFeedBack", window.location);
        //         });
        //     // });
        // });

    }

    getNotificationcount() {
        try {
            this._appSessionObject.get(enAppSession.domainID).then((domainID) => {
                this.getNotificationList(domainID, "ALL_TYPE", 0, 2).subscribe((data) => {
                    this.data = data;
                    if (this.data != undefined) {
                        this.newcount = this.data[0].NOTIFICATION_COUNT;
                        this._appSessionObject.get(enAppSession.oldcount).then((oldcount) => {
                            this.oldcount = oldcount;

                            //added by Brijesh Kushwaha 30/04/2019
                            var x = document.getElementById("hidediv");
                            x.style.display = "none";

                            if (this.newcount > this.oldcount) {
                                //commented by Brijesh Kushwaha 30/04/2019
                                //$('#m_topbar_notification_icon .m-nav__link-icon').addClass('m-animate-shake');
                                
                                $('#dotanimat').addClass('m-nav__link-badge m-badge m-badge--dot m-badge--dot-small m-badge--danger m-dropdown--open ');
                            }
                            else {
                                // $('#m_topbar_notification_icon .m-nav__link-icon').removeClass('m-animate-shake m-nav__link-badge m-badge m-badge--dot m-badge--dot-small m-badge--danger m-dropdown--open ');
                                $('#m_topbar_notification_icon .m-nav__link-icon').removeClass('m-nav__link-badge m-badge m-badge--dot m-badge--dot-small m-badge--danger m-dropdown--open ');
                                $('#dotanimat').removeClass('m-nav__link-badge m-badge m-badge--dot m-badge--dot-small m-badge--danger m-dropdown--open ');
                            }
                        });
                    }

                });
            });
        }
        catch (ex) {

        }

    }

    public getNotificationList(domainID, moduleType, startIndex, count) {
        let params = "?Domain_ID=" + domainID;
        params += "&ModuleType=" + moduleType;
        params += "&startIndex=" + 0;
        params += "&count=" + count;
        return this._apiService.get(UserApiConstant.notification.getNotificationList + params);
    }


    
}