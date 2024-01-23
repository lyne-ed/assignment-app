import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor() { }

  credentials = [
    {
      username: 'admin',
      password: 'admin',
      admin: true
    },
    {
      username: 'user1',
      password: 'pass1',
      admin: false
    },

    {
      username: 'user2',
      password: 'pass2',
      admin: false
    }
  ];

  loggedIn = false;
  admin = false;

  logIn(username: string, password: string): boolean {
    const user = this.credentials.find(u => u.username === username && u.password === password);
    if (user) {
      this.loggedIn = true;
      this.admin = user.admin;
    } else {
      this.loggedIn = false;
      this.admin = false;
    }
    return this.loggedIn;
  }

  logOut() {
    this.loggedIn = false;
    this.admin = false;
  }

  isUserAdmin(): boolean {
    return this.admin;
  }
}
