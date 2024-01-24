import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Assignment Handler';
  shouldRun = true;
  Student = 'Lyne'

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.initializeFromLocalStorage();
  }

  logIn() {
    if (!this.authService.loggedIn) {
      this.router.navigate(['/login']);
    } else {
      this.authService.logOut();
      this.router.navigate(['/home']);
    }
  }

  getUsername() {
    if (this.authService.user) {
      return this.authService.user.username;
    }
    return null;
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/home']);
  }
}
