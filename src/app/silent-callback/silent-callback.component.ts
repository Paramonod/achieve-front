import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/authentication/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-auth-callback',
    templateUrl: './silent-callback.component.html'
})
export class SilentCallbackComponent implements OnInit {

    error: boolean;

    constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    }

    async ngOnInit() {

        // check for error
        if (this.route.snapshot.fragment.indexOf('error') >= 0) {
            this.error = true;
            return;
        }

        await this.authService.silent();
        this.router.navigate(['/dashboard']);
    }
}
