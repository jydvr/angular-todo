import { HttpClient } from '@angular/common/http';
import { Component,inject } from '@angular/core';
import { FormsModule,FormBuilder,Validators,ReactiveFormsModule, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj:any={
    "username":"",
    "password":""
  };
  SigninObj:any={
    "firstname":"",
    "lastname":"",
    "email":"",
    "username":"",
    "password":""
  }

  http=inject(HttpClient);
  constructor(private router: Router) { }
  isSign:boolean=false
  signupform:FormGroup=new FormGroup({
    "firstname":new FormControl(),
    "lastname":new FormControl(),
    "email":new FormControl(),
    "username":new FormControl(),
    "password":new FormControl()
  })
  onLogin(){  
    console.log(this.loginObj)
    this.http.post( "http://localhost:8000/login",this.loginObj).subscribe((res:any)=>{
      // console.log(res.user.firstname)
      if(res.status=="Success"){
        alert("Login Successful")
        localStorage.setItem('authToken', res.token);
        localStorage.setItem('firstname',res.user.firstname)
        localStorage.setItem('lastname',res.user.lastname)
        localStorage.setItem('email',res.user.email)
        localStorage.setItem('username',res.user.username)
        localStorage.setItem('userid',res.user.user_id)
        this.router.navigateByUrl('dashboard')
      }
      else{
        console.log(res)
        alert("Login Unsuccessful")
      }
    })
  }
  toggleForm(){
    this.isSign=!this.isSign
    console.log(this.isSign)
  }
  onSign(){
    const formData = this.signupform.value;
    this.http.post(" http://localhost:8000/reg",formData).subscribe((res:any)=>{
      if(res.status=="Success"){
        alert("User Registered Successfully/n Login now!")
      }
      else{
        console.log(res)
        alert("Failed to create user")
      }
    })
  }
}
