import {Injectable} from '@angular/core';

class Domain {
    value: string;
    displayName: string;

    constructor(val: string, name: string) {
        this.value = val;
        this.displayName = name;
    }
}

@Injectable({
    providedIn: 'root'
})

export class RegisterwizardService {
    import: Domain;
    possibleDomains = [new Domain('IT108', 'IT108')];

    getPossibleDomains() {
        return this.possibleDomains
    }
}
