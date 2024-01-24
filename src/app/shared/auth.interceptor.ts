import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.auth.loggedIn) {
            const token = this.auth.token;
            if (token) {
                const authReq = req.clone({
                    headers: req.headers.set('x-access-token', token)
                });
                return next.handle(authReq);
            }
        }
        return next.handle(req);
    }
}
