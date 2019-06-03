//Created Date: 04/04/2018
//Created By: Ashish Tiwari
//Usage: Inject This file to use generic API with HMAC Auth
//Copyright:Violet InfoSystems Pvt.Ltd
import { HttpClient, HttpParams, HttpClientModule, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Storage } from '@ionic/storage';
import * as  crypto from "crypto-js";

import { EncryptedStorage } from '../encryptedstorage/encryptedstorage';
import { AppSessionObject } from '../appsessionobjects/appsessionobject'
import { enAppSession } from '../appsessionobjects/enAppSession'
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs/Observable';
//import {CookieService} from 'angular2-cookie/core';
/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class ApiService {
    DomainID: any;
    public apiSecretKey: any;
    public apiId: any;
    private data: any;
    private timestamp: any;
    private nonce: any;
    private requestTimeStamp: any;
    private headers: any;
    private reqOpts: any;
    private UserEmailID: any;
    private UserPass: any;
    public url
    private baseURL
    private Flag = 0
    //0- For UAT --1 For Live
    //this is for common api url  call
    constructor(private http: HttpClient, private Storage: EncryptedStorage,
        private HttpClientModule: HttpClientModule,
        private _appSessionObject: AppSessionObject
    ) {

        this.SwitchEnvoirement();
        this._appSessionObject.get(enAppSession.UserCode).then((val) => {
            if (val == null)
                val = "";

            this.UserEmailID = val;

        })
        this._appSessionObject.get(enAppSession.UserPassWord).then((val) => {
            if (val == null)
                val = "";
            this.UserPass = val;
        })
    }
    /**
        * Construct a GET request which interprets the body as an `ArrayBuffer` and returns it.
        *
        *  @param an `endpoint`
        * @param an `params`
        * @param an `reqOpts`
        * @return an `Observable` of the body as an `ArrayBuffer`.
        */
    get(endpoint: string, params?: any, reqOpts?: any) {
        // debugger;
        //this.SwitchEnvoirement()
        this._appSessionObject.get(enAppSession.UserCode).then((val) => {
            if (val == null)
                val = "";

            this.UserEmailID = val;

        })
        this._appSessionObject.get(enAppSession.UserPassWord).then((val) => {
            if (val == null)
                val = "";
            this.UserPass = val;
        })
        var timestamp = this.getMicrotime().toString();
        this.requestTimeStamp = timestamp;
        var nonce = this.guid();

        if (!reqOpts) {
            reqOpts = {
                params: new HttpParams()
            };
        };

        // console.log("this.endpoint    = " + endpoint)
        // console.log("this.UserEmailID = " + this.UserEmailID)
        // console.log("this.UserPass    = " + this.UserPass)
        let headers = new HttpHeaders();
        // headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
        headers = headers.append('authorization', 'amx ' + this.getHMAC(this.apiId, 'GET', this.url + '/' + endpoint, timestamp, nonce, this.apiSecretKey, this.UserEmailID, this.UserPass))
        headers = headers.append('X-XSRF-TOKEN', this.guid())
        reqOpts = { headers: headers }

        if (!reqOpts) {
            reqOpts = {
                params: new HttpParams()
            };
        };

        // Support easy query params for GET requests
        if (params) {
            reqOpts.params = new HttpParams();
            for (let k in params) {
                reqOpts.params.set(k, params[k]);
            };
        };

        //alert(this.network.type);

        return this.http.get(this.url + '/' + endpoint, reqOpts);

    }

    /**
    * Construct a SYNC GET request which interprets the body as an `ArrayBuffer` and returns it.
    *
    *  @param an `endpoint`
    * @param an `params`
    * @param an `reqOpts`
    * @return an `Observable` of the body as an `ArrayBuffer`.
    */
    async  getSync(endpoint: string, params?: any, reqOpts?: any) {

        this._appSessionObject.get(enAppSession.UserCode).then((val) => {
            if (val == null)
                val = "";

            this.UserEmailID = val;

        })
        this._appSessionObject.get(enAppSession.UserPassWord).then((val) => {
            if (val == null)
                val = "";
            this.UserPass = val;
        })
        var timestamp = this.getMicrotime().toString();
        this.requestTimeStamp = timestamp;
        var nonce = this.guid();

        if (!reqOpts) {
            reqOpts = {
                params: new HttpParams()
            };
        };


        let headers = new HttpHeaders();
        // headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
        headers = headers.append('authorization', 'amx ' + this.getHMAC(this.apiId, 'GET', this.url + '/' + endpoint, timestamp, nonce, this.apiSecretKey, this.UserEmailID, this.UserPass))
        headers = headers.append('X-XSRF-TOKEN', this.guid())
        reqOpts = { headers: headers }

        if (!reqOpts) {
            reqOpts = {
                params: new HttpParams()
            };
        };

        // Support easy query params for GET requests
        if (params) {
            reqOpts.params = new HttpParams();
            for (let k in params) {
                reqOpts.params.set(k, params[k]);
            };
        };

        //alert(this.network.type);

        return await this.http.get(this.url + '/' + endpoint, reqOpts).toPromise();

    }
    post(endpoint: string, body: any, reqOpts?: any) {
        //this.SwitchEnvoirement();
        this._appSessionObject.get(enAppSession.UserCode).then((val) => {
            if (val == null)
                val = "";

            this.UserEmailID = val;

        })
        this._appSessionObject.get(enAppSession.UserPassWord).then((val) => {
            if (val == null)
                val = "";
            this.UserPass = val;
        })
        //  //  return this.http.post(this.url + '/' + endpoint, body, reqOpts);
        var timestamp = this.getMicrotime().toString();
        this.requestTimeStamp = timestamp;
        var nonce = this.guid();


        let headers = new HttpHeaders();
        // headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
        headers = headers.append('authorization', 'amx ' + this.getHMAC(this.apiId, 'POST', this.url + '/' + endpoint, timestamp, nonce, this.apiSecretKey, this.UserEmailID, this.UserPass, body))
        headers = headers.append('X-XSRF-TOKEN', this.guid())
        reqOpts = { headers: headers }
        let returnVal = this.http.post(this.url + '/' + endpoint, body, reqOpts);
        //console.log(returnVal);

        return returnVal;
    }
    /**
     *
     * @param endpoint
     * @param body
     * @param reqOpts
     */
    put(endpoint: string, body: any, reqOpts?: any) {
        this._appSessionObject.get(enAppSession.UserCode).then((val) => {
            if (val == null)
                val = "";

            this.UserEmailID = val;

        })
        this._appSessionObject.get(enAppSession.UserPassWord).then((val) => {
            if (val == null)
                val = "";
            this.UserPass = val;
        })
        // return this.http.put(this.url + '/' + endpoint, body, reqOpts);
        var timestamp = this.getMicrotime().toString();
        this.requestTimeStamp = timestamp;
        var nonce = this.guid();
        let headers = new HttpHeaders();
        // headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
        headers = headers.append('authorization', 'amx ' + this.getHMAC(this.apiId, 'PUT', this.url + '/' + endpoint, timestamp, nonce, this.apiSecretKey, this.UserEmailID, this.UserPass, body))
        headers = headers.append('X-XSRF-TOKEN', this.guid())
        reqOpts = { headers: headers }
        return this.http.put(this.url + '/' + endpoint, body, reqOpts);

    }

    delete(endpoint: string, reqOpts?: any) {
        this._appSessionObject.get(enAppSession.UserCode).then((val) => {
            if (val == null)
                val = "";

            this.UserEmailID = val;

        })
        this._appSessionObject.get(enAppSession.UserPassWord).then((val) => {
            if (val == null)
                val = "";
            this.UserPass = val;
        })
        // return this.http.delete(this.url + '/' + endpoint, reqOpts);
        var timestamp = this.getMicrotime().toString();
        this.requestTimeStamp = timestamp;
        var nonce = this.guid();
        let headers = new HttpHeaders();
        // headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
        headers = headers.append('authorization', 'amx ' + this.getHMAC(this.apiId, 'DELETE', this.url + '/' + endpoint, timestamp, nonce, this.apiSecretKey, this.UserEmailID, this.UserPass))
        headers = headers.append('X-XSRF-TOKEN', this.guid())
        reqOpts = { headers: headers }
        return this.http.delete(this.url + '/' + endpoint, reqOpts);
    }

    patch(endpoint: string, body: any, reqOpts?: any) {
        this._appSessionObject.get(enAppSession.UserCode).then((val) => {
            if (val == null)
                val = "";

            this.UserEmailID = val;

        })
        this._appSessionObject.get(enAppSession.UserPassWord).then((val) => {
            if (val == null)
                val = "";
            this.UserPass = val;
        })
        // return this.http.delete(this.url + '/' + endpoint, reqOpts);
        var timestamp = this.getMicrotime().toString();
        this.requestTimeStamp = timestamp;
        var nonce = this.guid();
        let headers = new HttpHeaders();
        // headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
        headers = headers.append('authorization', 'amx ' + this.getHMAC(this.apiId, 'DELETE', this.url + '/' + endpoint, timestamp, nonce, this.apiSecretKey, this.UserEmailID, this.UserPass, body))
        headers = headers.append('X-XSRF-TOKEN', this.guid())
        reqOpts = { headers: headers }
        return this.http.put(this.url + '/' + endpoint, body, reqOpts);

    }

    _p8(s) {
        var p = (Math.random().toString(16) + "000000000").substr(2, 8);
        return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }

    guid() {
        return this._p8(null) + this._p8(true) + this._p8(true) + this._p8(null);
    }

    //Generate the HMAC Hash for Authorization
    getHMAC(APPId, requestHttpMethod, requestUri, requestTimeStamp, nonce, key, UserID, pass, requestContent = null) {


        nonce = nonce;
        if (requestContent != null && requestContent != '' && requestContent != undefined) {
            //Convert the request content in base 64
            requestContent = crypto.MD5(JSON.stringify(requestContent));
            requestContent = crypto.enc.Base64.stringify(requestContent);

        }
        else
            requestContent = '';

        var signatureRawData = UserID + pass + this.DomainID + APPId + requestHttpMethod + encodeURIComponent(requestUri).toLowerCase() + requestTimeStamp;

        const requestSignatureBase64String = crypto.HmacSHA256(signatureRawData, key);
        var hash = UserID + ':' + this.DomainID + ':' + APPId + ":" + crypto.enc.Base64.stringify(requestSignatureBase64String) + ":" + requestTimeStamp + ":" + requestContent
        return hash.toString();
    };

    //Generate the timestamp
    getMicrotime() {

        var newDay = new Date();
        var yeartoday = newDay.getUTCFullYear();
        var monthtoday = newDay.getUTCMonth();
        var dayofmonthtoday = newDay.getUTCDate();
        var hour = newDay.getUTCHours();
        var minutes = newDay.getUTCMinutes();
        var seconds = newDay.getUTCSeconds();
        // var Miliseconds = newDay.getUTCMilliseconds();

        var t2 = Date.UTC(yeartoday, monthtoday, dayofmonthtoday, hour, minutes, seconds) / 1000;
        return t2;
    };

    getExternal(endpoint: string, reqOpts?: any) {

        // console.log(params)
        return this.http.get(endpoint, reqOpts);

    }

    SwitchEnvoirement(loadFromEnvoirement: boolean = true, apiSecretKey: string = "", apiId: string = "", DomainID: string = "") {
        if (loadFromEnvoirement) {
            this.url = environment.apiurl;
            this.baseURL = environment.apibaseURL;
            //apisecreate key developed in api client url
            this.apiSecretKey = environment.apiSecretKey;
            this.apiId = environment.apiId;
            //for specific domain
            this.DomainID = environment.domainID;
            // this._appSessionObject.get(enAppSession.domainProtoCol).then(domainProtoCol => {
            //     if (domainProtoCol != "" && domainProtoCol != undefined && domainProtoCol != null) {
            //         this.url = this.url.replace('https://', '').replace('http://', '').replace('www.', '');
            //         this.url = domainProtoCol + this.url;
            //         this.baseURL = this.baseURL.replace('https://', '').replace('http://', '').replace('www.', '');
            //         this.baseURL = domainProtoCol + this.baseURL;
            //     }
            // });

        } else {

            // this.apiSecretKey = apiSecretKey;
            // this.apiId = apiId;
            // this.DomainID = DomainID;
            // alert(apiSecretKey + apiId + DomainID);
            // if (apiSecretKey == "" && apiId == "" && DomainID == "") {
                //this._appSessionObject.get(enAppSession.domainProtoCol).then(domainProtoCol => {
                // if (domainProtoCol != "" && domainProtoCol != undefined && domainProtoCol != null) {
                //     this.url = this.url.replace('https://', '').replace('http://', '').replace('www.', '');
                //     this.url = domainProtoCol + this.url
                //     this.baseURL = this.baseURL.replace('https://', '').replace('http://', '').replace('www.', '');
                //     this.baseURL = domainProtoCol + this.baseURL
                // }
                this._appSessionObject.get(enAppSession.domainID).then(domainid => {
                   // alert(domainid);
                    if (domainid != null && domainid != "" && domainid != undefined) {
                        //apisecreate key developed in api client url
                        this._appSessionObject.get(enAppSession.apiSecretKey).then(apiSecretKey => {
                            // console.log(apiSecretKey)
                            this.apiSecretKey = apiSecretKey == "" ? apiSecretKey : apiSecretKey;
                            this._appSessionObject.get(enAppSession.apiId).then(apiId => {
                                // console.log(apiId)
                                this.apiId = apiId == "" ? apiId : apiId;
                            })
                        })

                        //for specific domain
                        this.DomainID = domainid == "" ? domainid : domainid;
                        // alert(domainid);
                        // alert(this.apiSecretKey);
                        // alert(this.apiId);
                    }
                });
                // });
           // }

        }



    }

    postExternal(url, data?, reqOpts?) {

        debugger;
        //let headers = new HttpHeaders();
        //headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
        // headers = headers.append('authorization', 'amx ' + this.getHMAC(this.apiId, 'DELETE', this.url + '/' + endpoint, timestamp, nonce, this.apiSecretKey, this.UserEmailID, this.UserPass, body))
        // headers = headers.append('X-XSRF-TOKEN', this.guid())
        //reqOpts:any = { headers: headers }
        return this.http.post(url, data, reqOpts)
    }
}
