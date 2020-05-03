import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

    constructor() {}

    get authApiURI() {
        return 'https://auth.it108.org';
    }

    get resourceApiURI() {
        return 'https://localhost:5010';
    }
}
