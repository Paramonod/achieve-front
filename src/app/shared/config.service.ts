import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

    constructor() {}

    get authApiURI() {
        return 'http://localhost:5000';
    }

    get resourceApiURI() {
        return 'https://localhost:5010';
    }
}
