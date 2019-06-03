import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../auth/_guards/auth.guard";
import { Themeb2cComponent } from './b2c/theme-b2c.component';
//Added by Ashish Tiwari to add multilingual services.

const routes: Routes = [
    {
        "path": "b2b",
        "component": ThemeComponent,
        "canActivate": [AuthGuard],
        "canActivateChild": [AuthGuard],
        "children": [            
           
            {
                "path": "passwordmanagement",
                "loadChildren": "..\/auth\/component\/forgotpasswordmodule\/change-password.module#ChangePasswordModule"
            },
            {
                "path": "global",
                "loadChildren": "..\/pages\/globalsearchmodule\/component\/globalsearch.module#GlobalSearchModule"
            },
          
            {
                "path": "index",
                "loadChildren": "..\/pages\/widgetsmodule\/component\/home\/home.module#WidgetHomeModule"
            },
           
            {
                "path": "user\/profile",
                "loadChildren": "..\/auth\/component\/userprofile\/UserProfile.module#UserProfileModule"
            },
            {
                "path": "download",
                "loadChildren": "..\/pages\/managedownload\/component\/managedownload.module#ManageDownloadModule"
            },
            {
                "path": "404",
                "loadChildren": ".\/pages\/default\/not-found\/not-found.module#NotFoundModule"
            },
            {
                "path": "",
                "redirectTo": "index",
                "pathMatch": "full"
            },
            {
                "path": "android_asset\/www",
                "redirectTo": "index",
                "pathMatch": "full"
            },
          
            {
                "path": "globaladmin",
                "loadChildren": "..\/pages\/admin\/globaladminmodule\/component\/index\/index.module#IndexModule"
            },
           
           // //Added by Urmi chauhan 09/05/2019
            {
                "path": "levelsmanagement",
                "loadChildren": "..\/pages\/admin\/escalationmodule\/component\/levelsmanagement\/levelsmanagement.module#LevelsManagementModule"
            },
            {
                "path": "rolesmanagement",
                "loadChildren": "..\/pages\/admin\/escalationmodule\/component\/rolesmanagement\/rolesmanagement.module#RolesManagementModule"
            },
            {
                "path": "levelrolemapping",
                "loadChildren": "..\/pages\/admin\/escalationmodule\/component\/levelrolemapping\/levelrolemapping.module#LevelRoleMappingModule"
            },
            {
                "path": "masterssubsidiary",
                "loadChildren": "..\/pages\/admin\/escalationmodule\/component\/masterssubsidiary\/masterssubsidiary.module#MastersSubsidiaryModule"
            },
            {
                "path": "escalationmatrix",
                "loadChildren": "..\/pages\/admin\/escalationmodule\/component\/escalationmatrix\/escalationmatrix.module#EscalationMatrixModule"
            },
            // {
            //     "path": "workflow",
            //     "loadChildren": "..\/pages\/admin\/workflowadminmodule\/component\/workflow\/workflow.module#WorkflowModule"
            // },
            {
                "path": "addmodifybanner\/:refBannerID",
                "loadChildren": "..\/pages\/admin\/bannermanagementmodule\/component\/addmodifybanner\/addmodifybanner.module#AddModifyBannerModule"
            },
            {
                "path": "modifydeletebanner",
                "loadChildren": "..\/pages\/admin\/bannermanagementmodule\/component\/modifydeletebanner\/modifydeletebanner.module#ModifyDeleteBannerModule",
            },
        ]
    },
   
    {
        "path": "**",
        "redirectTo": "404",
        "pathMatch": "full"
    },
   
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: []
})
export class ThemeRoutingModule { }