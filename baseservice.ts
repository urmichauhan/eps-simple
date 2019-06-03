//Created Date: 13/04/2018
//Created By: Ashish Tiwari
//Usage: Inject amd extend This file to use service base injection 
//Copyright:Violet InfoSystems Pvt.Ltd 
import { Injectable } from "@angular/core";
import { BaseServiceHelper} from "./baseservicehelper";

@Injectable()
export  class BaseService {

   
    constructor(
        protected _baseServiceHelper: BaseServiceHelper,
      
    ) {

    }
}