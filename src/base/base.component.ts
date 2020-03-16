import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-base',
    template: 'NO UI TO BE FOUND HERE!',
    // styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

    defaultLanguage = 'en';

    /**
     * Accessibility level on router: keep declaration “public” due to the inheritance
     * @param router */
    constructor(
        @Inject(DOCUMENT) public document: Document,

        public router: Router,
        public translateService: TranslateService
    ) { }

    ngOnInit(): void { 
        this.translateService.setDefaultLang(this.defaultLanguage);
        /**
         * NOTE: 
         * It is importing to initialize correctly the *.css-file otherwise your console will show message
         * "Refused to apply style from .... because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled.
         * Actually telling you it can not find the correct style sheet.
         */
        this.initializeCssFile(this.defaultLanguage);
    }

    /** Method call from Html */
    switchLang(lang: string): void {
        const htmlTag = this.document.getElementsByTagName(
            'html'
        )[0] as HTMLHtmlElement;

        switch (lang) {
            case 'ar' :
            case 'he' : {
                htmlTag.dir = 'rtl';
                break;
            }
            default : {
                htmlTag.dir = 'ltr';
                break;
            }
        }
        this.translateService.use(lang);
        this.initializeCssFile(lang);
    }

    initializeCssFile(lang: string): void {
        const headTag = this.document.getElementsByTagName(
            'head'
        )[0] as HTMLHeadElement;

        const existingLink = this.document.getElementById(
            'langCss'
        ) as HTMLLinkElement;

        let bundleName = '';
        switch (lang) {
            /**  [ <<<< noitcerid gindaer <<<< ] */
            case 'ar' : {
                bundleName = 'arabicStyle.css';
                break;
            }
            /**  [ <<<< noitcerid gindaer <<<< ] */
            case 'he' : {
                bundleName = 'hebrewStyle.css';
                break;
            }
            /** [ >>>> reading direction >>>> ] */
            default: {
                bundleName = 'englishStyle.css';
                break;
            }
        }

        if (existingLink) {
            existingLink.href = bundleName;
        } else {
            const newLink = this.document.createElement('link');
            newLink.rel = 'stylesheet';
            newLink.type = 'text/css';
            newLink.id = 'langCss';
            newLink.href = bundleName;
            headTag.appendChild(newLink);
        }
    }

}
