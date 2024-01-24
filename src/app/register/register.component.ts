import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username:any;
  password:any;
  admin:any;
  registerError: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {

  }

onRegister(): void {
  this.authService.register(this.username, this.password, "user").subscribe(
    () => {
      this.admin = this.authService.isUserAdmin();
      this.router.navigate(['/home']);
      console.log("connected as " + this.username);
    },
    (error) => {
      console.error('Register error in onRegister:', error);
      this.registerError = "Something went wrong";
    }
  );

  //this.authService.logIn(this.username, this.password).subscribe(
  //  () => {
  //    this.admin = this.authService.isUserAdmin();
  //    this.router.navigate(['/home']);
  //    console.log("connected as " + this.username);
  //  },
  //  (error) => {
  //    console.error('Register error in onRegister:', error);
  //    this.registerError = "Something went wrong";
  //  }
  //);
}


}
