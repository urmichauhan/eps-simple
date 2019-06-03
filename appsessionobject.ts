//Created Date: 27/03/2018
//Created By: Ashish Tiwari
//Usage: Inject This file to any component to get and set the User Session
//Copyright:Violet InfoSystems Pvt.Ltd
import { Injectable } from "@angular/core";
import { EncryptedStorage } from "../encryptedstorage/encryptedstorage";
import { enAppSession } from "../appsessionobjects/enAppSession";
@Injectable()
export class AppSessionObject {
    constructor(private _storage: EncryptedStorage) {
    }

    public enAppSessionObjects: enAppSession

    /**
    * Get the default language from cache selected by user at time of login
    */
    getLanguage() {
        return this._storage.get(enAppSession.defaultLanguage);
    }

    /**
     * Get the user session details from cache.
     * @param key `enAppSession`
     */
    get(key: enAppSession) {
        return this._storage.get(key)
    }

    /**
     * Get the domain setting object from cache
     * @param key `pass the key param`
     */
    getDomainSetting(key: string) {

        return this._storage.get(enAppSession.DomainObject).then(data => {
            // console.log(data);
            let domainObject = eval(data)
            let finalFiltervalue = [{ SwitchKey: "", SwitchName: "", SwitchValue: "" }];
            if (domainObject != null && domainObject != undefined && domainObject != "") {
                if (domainObject.length > 0) {
                    domainObject.filter((el, index) => {
                        if (el != null && el != undefined && el != "") {
                            let filterRes = el.filter((res => res.SwitchKey.toLowerCase() == key.toLowerCase()))
                            if (filterRes != undefined && filterRes != null && filterRes != "") {
                                if (filterRes.length) {                                   
                                    finalFiltervalue = filterRes;
                                }
                            }
                        }

                    }
                    );
                }
            }


            return finalFiltervalue;
        })
    }

    /**
     * Get the User Master data object from cache
     * @param Key
     * @return an `Promise` of the body as an `ArrayBuffer`.
     */
    getUserMasterData(Key: string) {
        return this._storage.get(enAppSession.UserMasters).then((data) => {
            let masterdata = JSON.parse(data);

            return masterdata.filter(data => data.UserMaster_Name == Key)
        });

    }

}
