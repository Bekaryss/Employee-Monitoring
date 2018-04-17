import { Component } from '@angular/core';
import { ControlService } from '../../services/control.service';
import { Employee } from '../employee/employee.component';
import { EmployeeService } from '../../services/employee.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-control',
    templateUrl: './control.component.html',
    styleUrls: ['./control.component.css']
})

/** control component*/
export class ControlComponent {
    [x: string]: any;
    public controlList: Control[];
    public employeeList: Employee[];

    statusCode: number;
    requestProcessing = false;
    controlIdToUpdate = -1;
    processValidation = false;

    controlForm = new FormGroup({
        employeeId: new FormControl('', Validators.required),
        week: new FormControl('', Validators.required),
        day: new FormControl('', Validators.required),
        startTime: new FormControl('', Validators.required),
        endTime: new FormControl('', Validators.required)
    });

    constructor(private controlService: ControlService, private employeeService: EmployeeService) { }

    ngOnInit(): void {
        this.getAllControls();
        this.getAllEmployees();
    }

    getAllEmployees() {
        this.employeeService.getAllEmployees().subscribe(data => this.employeeList = data,
            errorCode => this.statusCode = errorCode);       
    }

    getAllControls() {
        this.controlService.getAllControls().subscribe(data => this.controlList = data,
            errorCode => this.statusCode = errorCode);
    }

    onControlFormSubmit() {
        this.processValidation = true;
        if (this.controlForm.invalid) {
            return
        }
        this.preProcessConfigurations();
        var control = this.controlForm.value;
        console.log(control);
        if (this.controlIdToUpdate == -1) {
            this.controlService.createControl(control).subscribe(successCode => {
                this.statusCode = successCode;
                this.getAllControls();
                this.backToCreateControl();
            },
                errorCode => this.statusCode = errorCode);
        }
        else {
            control.id = this.controlIdToUpdate;
            this.controlService.updateControl(control).subscribe(successCode => {
                this.statusCode = successCode;
                this.getAllControls();
                this.backToCreateControl();
            }, errorCode => this.statusCode = errorCode);
        }
    }

    //Load article by id to edit
    loadControlToEdit(controlId: string) {
        this.preProcessConfigurations();
        this.controlService.getControlById(controlId)
            .subscribe(control => {
                console.log(control)
                this.controlIdToUpdate = control.id;
                var datePipe = new DatePipe("en-US");
                var st = datePipe.transform(control.startTime, 'HH:MM');
                var et = datePipe.transform(control.endTime, 'HH:MM');
                this.controlForm.setValue(
                    {
                        employeeId: control.employee.id,
                        week: control.week,
                        day: control.day,
                        startTime: st,
                        endTime: et
                    });
                this.processValidation = true;
                this.requestProcessing = false;
            },
            errorCode => this.statusCode = errorCode);
    }

    //Delete article
    deleteControl(controlId: string) {
        this.preProcessConfigurations();
        this.controlService.deleteControlById(controlId)
            .subscribe(successCode => {
                //this.statusCode = successCode;
                //Expecting success code 204 from server
                this.statusCode = 204;
                this.getAllControls();
                this.backToCreateControl();
            },
            errorCode => this.statusCode = errorCode);
    }

    preProcessConfigurations() {
        this.statusCode = -1;
        this.requestProcessing = true;
    }

    backToCreateControl() {
        this.controlIdToUpdate = -1;
        this.controlForm.reset();
        this.processValidation = false;
    }
}

export class Control {
    public id: number;
    public employeeId: number;
    public employee: Employee;
    public startTime: Date;
    public endTime: Date;
    public day: number;
    public week: number;
}