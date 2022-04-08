import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import User from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  user:User = {userName: "", password: "", _id: ""} as User;
  warning:String ="";
  loading:boolean=false;
  loginSubscription : Subscription | undefined;

  constructor(private a:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  
  ngOnDestroy(): void {
      this.loginSubscription?.unsubscribe();
  }

  onSubmit(): void {

    if(this.user.userName != "" && this.user.password != ""){

      this.loading = true;
      
    this.loginSubscription=this.a.login(this.user).subscribe({
      next:(success) => {
        localStorage.setItem('access_token', success.token);
        this.router.navigate(['/newReleases']);
        this.loading=false;

      },
      error: (err) => {
        this.loading=false;
        this.warning = err.error.message;
      }
    });

}
  }

}
