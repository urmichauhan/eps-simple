//Created Date: 13/04/2018
//Created By: Ashish Tiwari
//Usage: Inject this file to use common functionality show loader etc..
//Copyright:Violet InfoSystems Pvt.Ltd 
import * as $ from "jquery";
import { COMPOSITION_BUFFER_MODE } from "@angular/forms";
declare let SessionTimeoutService: any;
declare let mApp: any
export class Helpers {
    static loadStyles(tag, src) {
        if (Array.isArray(src)) {
            $.each(src, function (k, s) {
                $(tag).append($('<link/>').attr('href', s).attr('rel', 'stylesheet').attr('type', 'text/css'));
            });
        } else {
            $(tag).append($('<link/>').attr('href', src).attr('rel', 'stylesheet').attr('type', 'text/css'));
        }
    }

    static loadFavIcon(tag, src) {
        $('.domainicon').attr('href', src)
        $('.domainicon').attr('src', src)
       // $(tag).append($('<link/>').attr('href', src).attr('rel', 'shortcut icon'));
      
    }

    static unwrapTag(element) {
        $(element).removeAttr('appunwraptag').unwrap();
    }

	/**
	 * Set title markup
	 * @param title
	 */
    static setTitle(title) {
        $('.m-subheader__title').text(title);
    }
    static breadcrumbs: any
	/**
	 * Breadcrumbs markup
	 * @param breadcrumbs
	 */
    static setBreadcrumbs(breadcrumbs) {
        if (breadcrumbs) $('.m-subheader__title').addClass('m-subheader__title--separator');
        this.breadcrumbs = breadcrumbs;
        let ul = $('.m-subheader__breadcrumbs');
        console.log($(ul).length);
        if ($(ul).length === 0) {
            ul = $('<ul/>').addClass('m-subheader__breadcrumbs m-nav m-nav--inline')
                .append($('<li/>').addClass('m-nav__item')
                    .append($('<a/>').addClass('m-nav__link m-nav__link--icon')
                        .append($('<i/>').addClass('m-nav__link-icon la la-home'))));
        }

        $(ul).find('li:not(:first-child)').remove();
        $.each(breadcrumbs, function (k, v) {
            console.log(v);
            let li = $('<li/>').addClass('m-nav__item')
                .append($('<a/>').addClass('m-nav__link m-nav__link--icon').attr('routerLink', v.href).attr('title', v.title).attr('onClick', "goto()")
                    .append($('<span/>').addClass('m-nav__link-text').text(v.text)));
            $(ul).append($('<li/>').addClass('m-nav__separator').text('-')).append(li);
        });
        $('.m-subheader .m-stack__item:first-child').append(ul);
    }

    static setLoading(enable) {
        let body = $('ion-app');     
        if (enable==true && ($('.mainScreen').is(':visible') ==true || $('.mainScreen').length==0) &&
            $('#mainloader').is(':visible')==false
        ) {
            $(body).addClass('m-page--loading-non-block')
        } else {
            $(body).removeClass('m-page--loading-non-block')
        }

        // let body = $('ion-app');
        // $(body).removeClass('m-page--loading-non-block')
        // if(enable==true)
        // {
        //     setTimeout(() => {
        //        // Helpers.setLoading(true);
        //          $('.app-root').show(); 
        //         $('#mainloader').fadeOut(800,'linear');
        //          $('.mainScreen').show();
                
        //             // if(this.isCompleteVersion=='no')
        //             // {
        //             //     $('app-aside-nav').hide();
        //             // }
             
        //     }, 900);
           
        // }
        // else
        // {
        //     $(body).removeClass('m-page--loading-non-block')
        //     // alert(enable);
        //     // Helpers.setLoading(false);
          
        //     $('#mainloader').show();
        //     $('.mainScreen').hide();
         
        // }
    }

    static bodyClass(strClass) {
        $('ion-app').attr('class', strClass);
    }

    static setDomainTitle(ProjectTitle) {
        $('.apptitle').html('');
        $('.apptitle').html(ProjectTitle)
    }

    static setAppLogo(logUrl) {
        $('.logo_new').css('display', 'block');
        $('.logo_new').html('');
        $('.logo_new').append($('<img>').attr('src', logUrl));
    }

    static setAppLogoThirdParty(logUrl) {
        $('.logo_new_tp').css('display', 'block');       
        $('.logo_new_tp').html('');
        $('.logo_new_tp').append($('<img>').attr('src', logUrl));
    }
    static toggleMenu() {
        // alert($('.m-stack__item m-stack__item--middle m-brand__tools menu_btn').length)
        $('.m-stack__item m-stack__item--middle m-brand__tools menu_btn').trigger('click')//.toggle();
    }
    static InitSession(warnAfter, redirAfter, validUpTo, Sessioncountdownmessage, Sessiontitle, Sessionmessage) {
        // alert('called');
        if ((<any>SessionTimeoutService) != undefined) {
            (<any>SessionTimeoutService).init(warnAfter, redirAfter, validUpTo, Sessioncountdownmessage, Sessiontitle, Sessionmessage);
        }


    }
    static enableDevelopementMode(flag) {
        if (!flag)
        {
            console.log = (message) => {              
            }
            // console.error = (message) => {              
            // }
            console.warn = (message) => {              
            }
            console.info = (message) => {              
            }
        }

        if (!flag) {
            $(document).keydown(function (event) {
                if (event.keyCode == 123) {
                    return false;
                }
                else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
                    return false;
                }
            });

            $(document).on("contextmenu", function (e) {
                e.preventDefault();
            });
        }

    }

    static block(id, status) {
        status == true ? (<any>mApp).block(id, {}) : (<any>mApp).unblock(id);
    }


}