import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  private apiUrl = 'https://lyne-ed-api.onrender.com/api/assignments';
  private currentAssignment = new BehaviorSubject<Assignment | null>(null);

  constructor(private http: HttpClient, private loggingService: LoggingService) { }

  getAssignments(page: number = 1, limit: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<Assignment[]>(`${this.apiUrl}`, { params });
  }

  getAssignment(id: number): Observable<Assignment> {
    return this.http.get<Assignment>(`${this.apiUrl}/${id}`);
  }

  addAssignment(assignment: Assignment): Observable<Assignment> {
    return this.http.post<Assignment>(this.apiUrl, assignment);
  }

  deleteAssignment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateAssignment(assignment: Assignment): Observable<Assignment> {
    return this.http.put<Assignment>(`${this.apiUrl}`, assignment);
  }

  setCurrentAssignment(assignment: Assignment) {
    this.currentAssignment.next(assignment);
  }

  getCurrentAssignment(): Observable<Assignment> {
    return this.currentAssignment.asObservable();
  }
}
