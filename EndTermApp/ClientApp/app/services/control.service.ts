import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Control } from '../components/control/control.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

@Injectable()
export class ControlService {
    //URL for CRUD operations
    baseUrl = "";
    Url = 'api/Controls';
    //Create constructor to get Http instance
    constructor(private http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl + this.Url;
    }

    getAllControls(): Observable<Control[]> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    //Create control item
    createControl(control: Control): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.baseUrl, control, options)
            .map(success => success.status)
            .catch(this.handleError);
    }

    //Fetch article by id
    getControlById(controlId: string): Observable<Control> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        console.log(this.baseUrl + "/" + controlId);
        return this.http.get(this.baseUrl + "/" + controlId)
            .map(this.extractData)
            .catch(this.handleError);
    }

    //Update control item
    updateControl(control: Control): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.baseUrl + "/" + control.id, control, options)
            .map(success => success.status)
            .catch(this.handleError);
    }

    //Delete article	
    deleteControlById(controlId: string): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.delete(this.baseUrl + "/" + controlId)
            .map(success => success.status)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body;
    }
    private handleError(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.status);
    }
}