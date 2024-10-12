import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { FormsModule,FormBuilder,Validators,ReactiveFormsModule, FormControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl=" http://localhost:8000/display"
  constructor(private http:HttpClient) { }
  getTasks(token: string): Observable<any> {
    const userid=localStorage.getItem("userid")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log("Task service completed",headers)
    return this.http.post<any>(this.apiUrl,{userid},{headers},);
  }
  addTasks(token:string, taskData: any){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(" http://localhost:8000/createtask",taskData,{headers},);
  }

  deleteTask(token: string, task_id: number): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.post<any>("http://localhost:8000/deletetask", { task_id }, { headers });
}
 updatetask(token: string,task_id:number,log_description: string,percentage:number){
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.post<any>("http://localhost:8000/updatetask", {task_id,log_description,percentage},{ headers });
 }

 editTasks(token:string, task_id:number){
  const headers=new HttpHeaders().set('Authorization',`Bearer ${token}`)
  return this.http.post<any>(" http://localhost:8000/edit",{task_id},{headers})
 }
}
