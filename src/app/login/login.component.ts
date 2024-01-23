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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {

  }

  onLogin(): void {
    this.authService.logIn(this.username, this.password);
    this.admin = this.authService.isUserAdmin();
    this.router.navigate(['/home']);
    console.log("connected as " + this.username);
  }
}
