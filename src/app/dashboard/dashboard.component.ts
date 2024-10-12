import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from './task.service';
import { FormBuilder,FormGroup,Validators,ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  tasks: any[] = [];
  logs:any[]=[]
  name:String|null ="";
  showTaskForm = false;
  showLogForm=false;
  addTaskForm: FormGroup;
  addLogForm:FormGroup;
  showtask=true;

  constructor(private taskService: TaskService,private fb:FormBuilder) {
    this.addTaskForm=this.fb.group({
      "task_name":['',Validators.required],
      "task_description":['',Validators.required],
      "start_date":['',Validators.required],
      "end_date":['',Validators.required]
    });

    this.addLogForm=this.fb.group({
      "log_description":['',Validators.required],
      "percentage":['',Validators.required]
    })
  }
   ngOnInit(): void {
    this.name =localStorage.getItem('name')
    const token = localStorage.getItem('authToken');
    if(token){
    this.taskService.getTasks(token).subscribe((response) => {
      this.tasks = response.data;
      console.log(this.tasks)
    });
  }
}
toggleTaskForm() {
  this.showTaskForm = !this.showTaskForm;
}
toggleLogForm(){
  this.showLogForm=!this.showLogForm
}
  addtask(){
    if(this.addTaskForm.valid){
      const token = localStorage.getItem('authToken');
      if(token){
        this.taskService.addTasks(token,this.addTaskForm.value).subscribe((response)=>{
          this.tasks.push(response.data);
          this.addTaskForm.reset();
          // this.showTaskForm=false;
          this.taskService.getTasks(token).subscribe((response) => {
            this.tasks = response.data;
            console.log(this.tasks)
          });
          
    })
    }
  }
  }
  deleteTask(task_id: number) {
    const token = localStorage.getItem('authToken');
    console.log("hi1")
    console.log(token)
    if (token) {
      console.log("hi1")
      this.taskService.deleteTask(token, task_id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(task => task.id !== task_id);
          console.log("hi")
          console.log(task_id)
          console.log(this.tasks)
        },
        error: (error) => console.error('Failed to delete task', error),
        complete: () => console.log('Task deletion completed')
      });
    }
  }

  updatelog(task_id:number){
    const token = localStorage.getItem('authToken');
    if(token){
      this.taskService.updatetask(token, task_id,this.addLogForm.get("log_description")?.value,this.addLogForm.get("percentage")?.value).subscribe((response)=>{
      if(response.message=="Log updated Successfully"){
        this.logs.push(this.addLogForm.value);}
      else if(response.message=="Log updated Successfully and task completed"){
        this.logs.push(this.addLogForm.value);
        this.deleteTask(task_id)
      }
      else{
        alert("Percentage limit will exceed")
      }
        console.log(this.logs)
        this.addLogForm.reset();
        this.showLogForm=false;

      });
    }
  }
  editTask(task_id:number){
    const token = localStorage.getItem('authToken');
    if(token){
      console.log(task_id)
      this.taskService.editTasks(token,task_id).subscribe((res)=>{
        if(res.status=="Success"){
          this.taskService.getTasks(token).subscribe((response) => {
          this.tasks = response.data;
        })
      }
        else{
          console.log(res)
          alert("Not started")
        }
      })
    }
  }

}
