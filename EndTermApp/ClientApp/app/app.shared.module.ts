import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeService } from './services/employee.service';
import { BrowserModule } from '@angular/platform-browser';
import { ControlComponent } from './components/control/control.component';
import { ControlService } from './services/control.service';
import { ReportComponent } from './components/report/report.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        EmployeeComponent,
        ControlComponent,
        ReportComponent
    ],
    imports: [
        CommonModule,   
        HttpModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'employee', component: EmployeeComponent },
            { path: 'control', component: ControlComponent },
            { path: 'report', component: ReportComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        EmployeeService,
        ControlService
    ]
})
export class AppModuleShared {
}
