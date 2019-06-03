//Created Date: 13/04/2018
//Created By: Ashish Tiwari
//Usage: Inject and extend This file to use component base injection
//Copyright:Violet InfoSystems Pvt.Ltd 
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BaseService } from './baseservice'
import { BaseComponentHelper } from "./basecomponenthelper";
import { ActivatedRoute } from "@angular/router";
import * as $ from "jquery";
import { enAppSession } from '../_appservices';
@Component({
    selector: 'app-base-component',
    template: '',
    styleUrls: [],
})
export class BaseComponent implements OnInit, AfterViewInit {
    ngAfterViewInit(): void {

    }
    public loading: any;
    constructor(
        public _base: BaseComponentHelper

    ) {
        var x = document.getElementById("hidediv");
        if (x != null) {
            if (x.style.display === "block") {
                x.style.display = "none";
            }
        }

    }
    ngOnInit() {


    }
}
