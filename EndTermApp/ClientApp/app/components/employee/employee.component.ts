import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.css']
})
/** employee component*/
export class EmployeeComponent {

    //Component properties
    public employeeList: Employee[];
    statusCode: number;
    requestProcessing = false;
    employeeIdToUpdate = -1;
    processValidation = false;

    //Create form
    employeeForm = new FormGroup({
        fullName: new FormControl('', Validators.required),
        position: new FormControl('', Validators.required),
        iin: new FormControl('', Validators.required),
        dayCount: new FormControl('', Validators.required),
        startTime: new FormControl('', Validators.required), 
        endTime: new FormControl('', Validators.required)
    });
   //startTime
   //endTime

    //Create constructor to get service instance
    constructor(private employeeService: EmployeeService) { }

    //Create ngOnInit() and and load articles
    ngOnInit(): void {
        this.getAllEmployees();
    }   

    getAllEmployees() {
        this.employeeService.getAllEmployees().subscribe(data => this.employeeList = data,
            errorCode => this.statusCode = errorCode);
    }

    //Handle create and update article
    onEmployeeFormSubmit() {
        this.processValidation = true;
        if (this.employeeForm.invalid) {
            return; //Validation failed, exit from method.
        }
        //Form is valid, now perform create or update
        this.preProcessConfigurations();
        let employee = this.employeeForm.value;
        console.log(employee);
        if (this.employeeIdToUpdate == -1) {
            //Generate article id then create article
            this.employeeService.createEmployee(employee)
                .subscribe(successCode => {
                    this.statusCode = successCode;
                    this.getAllEmployees();
                    this.backToCreateEmployee();
                },
                errorCode => this.statusCode = errorCode
                );
        } else {
            //Handle update article
            employee.id = this.employeeIdToUpdate;
            this.employeeService.updateEmployee(employee)
                .subscribe(successCode => {
                    this.statusCode = successCode;
                    this.getAllEmployees();
                    this.backToCreateEmployee();
                },
                errorCode => this.statusCode = errorCode);
        }
    }
    //Load article by id to edit
    loadEmployeeToEdit(articleId: string) {
        this.preProcessConfigurations();
        this.employeeService.getEmployeeById(articleId)
            .subscribe(employee => {
                console.log(employee)
                this.employeeIdToUpdate = employee.id;
                var datePipe = new DatePipe("en-US");
                var st = datePipe.transform(employee.startTime, 'HH:MM');
                var et = datePipe.transform(employee.endTime, 'HH:MM');
                this.employeeForm.setValue(
                    {
                        fullName: employee.fullName,
                        position: employee.position,
                        iin: employee.iin,
                        dayCount: employee.dayCount,
                        startTime: st,
                        endTime: et
                    });
                this.processValidation = true;
                this.requestProcessing = false;
            },
            errorCode => this.statusCode = errorCode);
    }
    //Delete article
    deleteEmployee(employeeId: string) {
        this.preProcessConfigurations();
        this.employeeService.deleteEmployeeById(employeeId)
            .subscribe(successCode => {
                //this.statusCode = successCode;
                //Expecting success code 204 from server
                this.statusCode = 204;
                this.getAllEmployees();
                this.backToCreateEmployee();
            },
            errorCode => this.statusCode = errorCode);
    }


    preProcessConfigurations() {
        this.statusCode = -1;
        this.requestProcessing = true;
    }

    backToCreateEmployee() {
        this.employeeIdToUpdate = -1;
        this.employeeForm.reset();
        this.processValidation = false;
    }
    

}

export class Employee {
    public id: number;
    public fullName: string;
    public position: string;
    public iin: string;
    public startTime: Date;
    public endTime: Date;
    public dayCount: number;
}