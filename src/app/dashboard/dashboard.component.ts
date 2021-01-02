import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  crudForm: FormGroup;
  employeeDetatils: any;
  takeAction = false;
  errorMessage: string;
  successMessage: string;
  private employeeId: any;

  constructor(private apiService: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.crudForm = this.buildForm();
    this.fetchAllEmployeesDetails();
  }

  updateOrDeleteAction(details?: any) {
    if (details) {
      this.takeAction = true;
      this.setId(details.id)
      this.form.employeeName.patchValue(details.employee_name);
      this.form.employeeSalary.patchValue(details.employee_salary);
      this.form.employeeAge.patchValue(details.employee_age);
    }
  }

  deleteAll() {
    this.takeAction = false;
    this.form.employeeName.patchValue(null);
    this.form.employeeSalary.patchValue(null);
    this.form.employeeAge.patchValue(null);
  }

  refreshAll() {
    this.form.employeeName.patchValue(null);
    this.form.employeeSalary.patchValue(null);
    this.form.employeeAge.patchValue(null);
  }

  deleteEmployeeDetails() {
    this.apiService.deleteEmployeeDetails(this.employeeId).subscribe((resp: any) => {
      if (resp.status === 'success') {
        this.deleteAll();
        this.successMessage = 'Record is Successfully Deleted!!';
        this.removeSuccessMessage();
      } else {
        this.errorMessage = 'Sorry it can not get deleted!!';
        this.removeErrorMessage();
      }
    });
  }

  updateEmployeeDetails() {
    const selectedEmployeeData = {
      employeeName: this.form.employeeName.value,
      employeeAge: this.form.employeeAge.value,
      employeeSalary: this.form.employeeSalary.value
    }
    this.apiService.updateEmployeeDetails(this.employeeId, selectedEmployeeData).subscribe((resp: any) => {
      if (resp.status === 'success') {
        this.successMessage = 'Record is Successfully Updated!!';
        this.removeSuccessMessage();
        this.fetchAllEmployeesDetails();
      }
    }, (err: any) => {
        this.errorMessage = 'Sorry it can not get updated!!';
        this.removeErrorMessage();
    });
  }

  createEmployeeDetails() {
    const selectedEmployeeData = {
      employeeName: this.form.employeeName.value,
      employeeAge: this.form.employeeAge.value,
      employeeSalary: this.form.employeeSalary.value
    }
    this.apiService.createEmployeeData(selectedEmployeeData).subscribe((resp: any) => {
      if (resp.status === 'success') {
        this.refreshAll();
        this.successMessage = 'Record is Successfully Created!!';
        this.removeSuccessMessage();
        this.fetchAllEmployeesDetails();
      }
    }, (err: any) => {
        this.errorMessage = 'Sorry it can not get created!!';
        this.removeErrorMessage();
    });
  }

  private fetchAllEmployeesDetails() {
    this.employeeDetatils = [];
    this.apiService.getAllEmployeesData().subscribe((resp: any) => {
      if (resp && resp.data) {
        this.employeeDetatils = resp.data;
      }
    });
  }

  private buildForm() {
    const form = this.fb.group({
      employeeName: [''],
      employeeSalary: [''],
      employeeAge: ['']
    });
    return form;
  }

  get form() {
    return this.crudForm.controls;
  }

  private setId(id: any) {
    this.employeeId = id;
  }

  private removeSuccessMessage() {
    setTimeout(() => {
      this.successMessage = '';
    }, 4000);
  }

  private removeErrorMessage() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 4000)
  }

}
