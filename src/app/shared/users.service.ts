import { Injectable } from '@angular/core';
import { Observable, tap} from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../login/login.model';

@Injectable({
    providedIn: 'root'
})

export class UsersService {

  constructor(private loggingService: LoggingService, private http: HttpClient) { }

    apiUrl = "http://localhost:8010/api/users";

    registerUser(user: User): Observable<any> {
        return this.http.post<User>(this.apiUrl + '/register', user);
    }

    logInUser(user: User): Observable<any> {
        return this.http.post<User>(this.apiUrl + '/login', user);
    }

    getRole(user: User): Observable<any> {
        return this.http.post<User>(this.apiUrl + '/role', user);
    }

    updateUser(user: User): Observable<any> {
        return this.http.put<User>(this.apiUrl + '/update', user);
    }
}
