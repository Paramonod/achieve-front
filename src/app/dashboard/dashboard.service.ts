import {BaseService} from '../shared/base.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ConfigService} from '../shared/config.service';
import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class DashboardService extends BaseService {

    constructor(private http: HttpClient, private configService: ConfigService) {
        super();
    }

    fetchTopSecretData(token: string) {

        const httpOptions = {
            responseType: 'json' as const,
            headers: new HttpHeaders({
                'Authorization': token
            }),
        };


        return this.http.get(this.configService.resourceApiURI + '/Identity/identityCheck', httpOptions);
    }
}
