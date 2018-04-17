import { Component, Inject } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css']
})
/** report component*/
export class ReportComponent {
    /** report ctor */
    baseUrl = "";
    Url = 'api/Report';
    public reportList: ReportViewModel[];

    //Create constructor to get Http instance
    constructor(private http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl + this.Url;
    }

    ngOnInit(): void{
        this.http.get(this.baseUrl).subscribe(result => {
            this.reportList = result.json() as ReportViewModel[];
            console.log(this.reportList);
        }, error => console.error(error));   
    }
}
export class ReportViewModel {
    public employeeId: number;
    public fullName: string;
    public lateCount: number;
    public missCount: number;
    public earlyLeaveCount: number;
    public totalWorkHour: string;
    public overhours: string;
    public week: number;
    public day: number;
}