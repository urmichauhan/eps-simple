//Created Date: 13/04/2018
//Created By: Ashish Tiwari
//Usage: Inject and extend This file to use component base injection
//Copyright:Violet InfoSystems Pvt.Ltd 
import { Injectable } from "@angular/core";
import {  AppSessionObject, CommonService, EncryptedStorage, Navigation ,AlertService,enAppSession,GlobalErrorHandler,ModalService,BreadCrumbService,LoggingService,LocalBackendService} from "../_appservices";
import { ActivatedRoute } from "@angular/router";
@Injectable()
export  class BaseComponentHelper {
domainProtoCol:string
    constructor(
        public _appSessionObject: AppSessionObject,         
        public _commonService: CommonService,
        public _encryptedStorage: EncryptedStorage,
        public _navigation: Navigation, 
        public _alertService:AlertService,
        public _modalService:ModalService,
        public _globalErrorHandler:GlobalErrorHandler,
        public _breadCrumbService:BreadCrumbService,
        public _loggingService:LoggingService,
        public _localBackendService:LocalBackendService
    ) {
        this._appSessionObject.get(enAppSession.domainProtoCol).then(domainProtoCol => {
			this.domainProtoCol=domainProtoCol;
		})
    }
   
}