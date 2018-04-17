import { Injectable, Inject } from '@angular/core';
import { Employee } from '../components/employee/employee.component';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class EmployeeService {

    //URL for CRUD operations
    baseUrl = "";
    Url = 'api/Employees';
    //Create constructor to get Http instance
    constructor(private http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl + this.Url;
    }
    //Fetch all articles
    getAllEmployees(): Observable<Employee[]> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .catch(this.handleError);

    }
    //Create article
    createEmployee(employee: Employee): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.baseUrl, employee, options)
            .map(success => success.status)
            .catch(this.handleError);
    }
    //Fetch article by id
    getEmployeeById(employeeId: string): Observable<Employee> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        console.log(this.baseUrl + "/" + employeeId);
        return this.http.get(this.baseUrl + "/" + employeeId)
            .map(this.extractData)
            .catch(this.handleError);
    }
    //Update article
    updateEmployee(employee: Employee): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.baseUrl + "/" + employee.id, employee, options)
            .map(success => success.status)
            .catch(this.handleError);
    }
    //Delete article	
    deleteEmployeeById(employeeId: string): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.delete(this.baseUrl + "/" + employeeId)
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