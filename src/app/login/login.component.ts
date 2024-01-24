import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username:any;
  password:any;
  admin:any;
  loginError: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {

  }

onLogin(): void {
  this.authService.logIn(this.username, this.password).subscribe(
    () => {
      this.admin = this.authService.isUserAdmin();
      this.router.navigate(['/home']);
      console.log("connected as " + this.username);
    },
    (error) => {
      console.error('Login error in onLogin:', error);
      this.loginError = "Username or password incorrect";
    }
  );
}


}
