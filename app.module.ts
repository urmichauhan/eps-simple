import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { ThemeComponent } from './theme/theme.component';
import { LayoutModule } from './theme/layouts/layout.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeRoutingModule } from "./theme/theme-routing.module";
import { AuthModule } from "./auth/auth.module";
import { IonicApp, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { LanguageModule } from './app.language.module';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { EncryptedStorage } from "./_appservices/encryptedstorage/encryptedstorage";
import {
    ApiService, AppSessionObject, GlobalErrorHandler, Navigation, CommonService, MultiTenancy,
    MultiLingual, UserSession, ModalService, BreadCrumbService, LoggingService, FileManagerService,
    LocalBackendService, ScriptLoaderService, WalkthroughService, ADFSTokenService,ExportToExcelService
} from "./_appservices";

// Import your library added by akshay
import { ChartsModule } from '@progress/kendo-angular-charts';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { InlineCalenderModule, AlertComponent } from "./_appcontrollibrary";
import { BaseComponent, BaseService, BaseComponentHelper, BaseServiceHelper, } from "./appbase";
import { CordovaNavigation } from "./_appservices/cordovanavigation/cordovanavigation";
import { AlertService } from './_appservices/alert/alert.service';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ModalComponent } from './_appcontrollibrary';
import { GlobalSearchWrapper } from "./_appservices/globalsearchwrapper/globalsearchwrapper";
import { Device } from '@ionic-native/device';
import { AppVersion } from '@ionic-native/app-version';
// import { QRScanner } from '@ionic-native/qr-scanner';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import {Zip } from '@ionic-native/zip';
import { Network } from '@ionic-native/network';
import { OneSignal } from '@ionic-native/onesignal';
import { GoogleAnalytics } from '@ionic-native/google-analytics'
import { AnalyticsService } from "./_appservices/logging/analytics";
import { Market } from '@ionic-native/market';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Themeb2cRoutingModule } from "./theme/b2c/theme-b2c-routing.module";
import { Themeb2cComponent } from './theme/b2c/theme-b2c.component';
import { Layoutb2cModule } from './theme//b2c/layouts/layout-b2c.module';
import { GeofencingService } from './_appservices/geofencing/geofencing';
import { FirebaseCrashlytics } from '@ionic-native/firebase-crashlytics/ngx';
import { DocumentViewer,DocumentViewerOptions } from '@ionic-native/document-viewer';

@NgModule({
    declarations: [
        ThemeComponent,
        AppComponent, BaseComponent, AlertComponent, ModalComponent,Themeb2cComponent
        
    ],
    imports: [
        LayoutModule,
        Layoutb2cModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ThemeRoutingModule,
        Themeb2cRoutingModule,
        AuthModule,
        IonicModule.forRoot(AppComponent),
        HttpClientModule,
        LanguageModule,
        TreeViewModule,
        ChartsModule,
        InlineCalenderModule,
        // DragulaModule,
        // RootedErrorModule, 
    ],
    providers: [ScriptLoaderService,
        { provide: ErrorHandler, useClass: GlobalErrorHandler }, AppSessionObject
        , EncryptedStorage, ApiService
        , WalkthroughService
        , { provide: LocationStrategy, useClass: PathLocationStrategy }, Navigation,
        CommonService, MultiTenancy, MultiLingual,
        BaseService, BaseComponentHelper, BaseServiceHelper, CordovaNavigation, AlertService, UserSession, ModalService,
        GlobalErrorHandler, GlobalSearchWrapper, BreadCrumbService
        , InAppBrowser, Device, AppVersion, LoggingService, LocalBackendService, FileManagerService, File, FileTransfer, FileTransferObject, Zip,//OfflineElearnSharedDataService,
        Camera, 
        // QRScanner,
         Network, OneSignal, GoogleAnalytics, AnalyticsService,
        ADFSTokenService,Market,ScreenOrientation ,SplashScreen,GeofencingService,
        FirebaseCrashlytics,
        DocumentViewer,
        ExportToExcelService
    ],
    bootstrap: [IonicApp],
    entryComponents: [AlertComponent, ModalComponent,
    ]
})
export class AppModule { }