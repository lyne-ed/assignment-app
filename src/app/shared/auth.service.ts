import { Injectable } from '@angular/core';
import { User } from '../login/login.model';
import { UsersService } from './users.service';
import { Observable, catchError, of, switchMap, tap, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  loggedIn = false;
  user: User | null = null;
  role: any | null = null;
  token: string | null = null;

  constructor(private usersService: UsersService) { }

  logRole(username: string, password: string) {
    var user = new User();
    user.username = username;
    user.password = password;
    return this.usersService.getRole(user);
  }

  logIn(username: string, password: string): Observable<any> {
    let user = new User();
    user.username = username;
    user.password = password;

    return this.usersService.logInUser(user).pipe(
      tap((userResponse: any) => {
        if (userResponse.token) {
          this.loggedIn = true;
          this.role = userResponse.role;
          this.token = userResponse.token;

          localStorage.setItem('token', this.token);
          localStorage.setItem('user', JSON.stringify(this.user));
          localStorage.setItem('role', this.role);
        } else {
          this.loggedIn = false;
        }

        this.user = { username, password, role: userResponse.role, token: userResponse.token };
        console.log(this.user);
      }),
      catchError((error) => {
        // Handle error here, you can log the error or perform other actions
        console.error('Login failed:', error);
        this.loggedIn = false;
        return throwError(() => new Error('Login failed'));
      })
    );
  }

  logOut() {
    this.loggedIn = false;
    this.user = null;
    this.role = null;
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  }

  isLogged(): boolean {
    return this.loggedIn;
  }

  isUserAdmin(): boolean {
    console.log(this.user + " " + this.loggedIn);
    return this.loggedIn && this.user?.role === 'admin';
  }

  register(username: string, password: string, role: string) {
    let user = new User();
    user.username = username;
    user.password = password;
    user.role = 'user'
    return this.usersService.registerUser(user);
  }

  getToken() {
    return this.token;
  }

  initializeFromLocalStorage() {
    const token = localStorage.getItem('token');
    if (token) {
      this.token = token;
      this.loggedIn = true;
      const decodedToken = jwtDecode<any>(token);
      this.user = new User();
      this.user.username = decodedToken.username;
      this.user.role = decodedToken.role;
      this.role = decodedToken.role;
    }
  }
}
