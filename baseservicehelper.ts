//Created Date: 13/04/2018
//Created By: Ashish Tiwari
//Usage: Inject amd extend This file to use service base injection 
//Copyright:Violet InfoSystems Pvt.Ltd 
import { Injectable } from "@angular/core";
import { ApiService, AppSessionObject, CommonService, EncryptedStorage } from "../_appservices";

@Injectable()
export  class BaseServiceHelper {
    constructor(
        public _apiService: ApiService,
        public _appSessionObject: AppSessionObject,    
        public _commonService: CommonService,
        public _encryptedStorage: EncryptedStorage
    ) {

    }
}