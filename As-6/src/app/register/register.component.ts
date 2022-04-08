import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import RegisterUser from '../RegisterUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerUser:RegisterUser ={userName: "", password: "", password2: ""} as RegisterUser;
  warning:String="";
  success:boolean=false;
  loading:boolean=false;
  submitSubscription : Subscription | undefined;

  constructor(private a:AuthService) { }

  ngOnInit(): void {
  }




     
  ngOnDestroy(): void {
    this.submitSubscription?.unsubscribe();
  }



  onSubmit(): void {

    if(this.registerUser.userName != "" && this.registerUser.password != "" && this.registerUser.password2 != "" ){
     
      this.loading = true;
    
      this.submitSubscription=this.a.register(this.registerUser).subscribe({
      next:() => {
        this.success=true;
        this.warning="";
        this.loading=false;

      },
      error: (err) => {
        this.success=false;
        this.loading=false;
        this.warning = err.error.message;
      }
    });

 
}


  }


}
