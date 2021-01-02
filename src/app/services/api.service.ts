import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  createEmployeeData(data: any) {
    const apiUrl = 'http://dummy.restapiexample.com/api/v1/create';
    const requestBody = this.createRequestBody(data);
    return this.http.post(apiUrl, requestBody);
  }

  getAllEmployeesData() {
    const apiUrl = 'http://dummy.restapiexample.com/api/v1/employees';
    return this.http.get(apiUrl);
  }

  updateEmployeeDetails(id: any, data: any) {
    const apiUrl = 'http://dummy.restapiexample.com/api/v1/update/'+id;
    const requestBody = this.createRequestBody(data);
    return this.http.put(apiUrl, requestBody);
  }

  deleteEmployeeDetails(id: any) {
    const url = 'http://dummy.restapiexample.com/api/v1/delete/'+id;
    return this.http.delete(url);
  }

  private createRequestBody(data?: any) {
    const reqBody = {
      employee_name: data.employeeName,
      employee_salary: data.employeeAge,
      employee_age: data.employeeSalary
    }
    return reqBody;
  }
}
