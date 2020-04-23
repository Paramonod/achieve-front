import {Component, OnInit, ElementRef, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'error-cmp',
    templateUrl: './error.component.html'
})

export class ErrorComponent implements OnInit {
    focus;
    focus1;
    focus2;
    test: Date = new Date();
    private toggleButton;
    private sidebarVisible: boolean;
    private nativeElement: Node;

    constructor(private element: ElementRef, private router: Router) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }


    ngOnInit() {
        this.router.navigate(['/'])

    }
}
