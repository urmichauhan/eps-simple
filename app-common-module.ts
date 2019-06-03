import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HrefPreventDefaultDirective } from '../_appdirectives/href-prevent-default.directive';
import { UnwrapTagDirective } from '../_appdirectives/unwrap-tag.directive';
//Added by Ashish Tiwari to add multilingual services.
import { LanguageModule } from '../app.language.module';
import { BreadCrumbs } from "../_appcontrollibrary";

import { MultiLingualDirective } from '../_appdirectives/multilingual';

//Added by Ajit
import { NumberOnlyDirective } from '../_appdirectives/number.directive';
import { SpecialCharRestrictDirective } from '../_appdirectives/splcharrestric.directive';

//Added by Irfan for Decimal Directive
import { DecimalOnlyDirective } from '../_appdirectives/decimal.directive';
import { ArraySortPipe } from "../_pipes/common.pipe";


@NgModule({
    declarations: [
        HrefPreventDefaultDirective,
        UnwrapTagDirective, BreadCrumbs, MultiLingualDirective, NumberOnlyDirective, SpecialCharRestrictDirective, DecimalOnlyDirective, ArraySortPipe
    ],
    exports: [

        HrefPreventDefaultDirective, BreadCrumbs, MultiLingualDirective, NumberOnlyDirective, SpecialCharRestrictDirective, DecimalOnlyDirective, ArraySortPipe

    ],
    imports: [
        CommonModule,
        RouterModule,
        LanguageModule,

    ],
    // providers:[GlobalSearchWrapper]

})
export class AppCommonModule {
}