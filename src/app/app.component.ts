import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseComponent implements OnInit {

    title = 'angular-localization';
    defaultLanguage = 'en';

    constructor(
        @Inject(DOCUMENT) public document: Document,
        public router: Router,
        public translateService: TranslateService,
    ) { 
        super(document, router, translateService);
    }

}
