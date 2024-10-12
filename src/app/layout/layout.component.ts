import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  constructor(private router:Router){}
  firstname =localStorage.getItem('firstname')
  lastname=localStorage.getItem('lastname')
  email=localStorage.getItem('email')
  username=localStorage.getItem('username')
  userid=localStorage.getItem('userid')
  showDetails: boolean = false;

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  logout(){
    this.router.navigateByUrl("/login")
  }
}
