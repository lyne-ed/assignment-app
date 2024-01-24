import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from '../assignment.model';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})

export class AssignmentDetailComponent implements OnInit {
  @Input()
  assignmentSent?: Assignment;

  @Output()
  onDelete = new EventEmitter<Assignment>();

  constructor(private assignmentsService: AssignmentsService, private route: ActivatedRoute, private router: Router, private authService: AuthService ) { }
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.getAssignment();
    }
  }

  onAssignmentReturned() {
    if (!this.assignmentSent) return;

    this.assignmentSent!.returned = true;

    this.assignmentsService.updateAssignment(this.assignmentSent)
      .subscribe(message => console.log(message));

    this.router.navigate(["/home"]);
  }

  onDeleteAssignment(): void {
    if (!this.assignmentSent) return;

    this.assignmentsService.deleteAssignment(this.assignmentSent.id)
      .subscribe(message => console.log(message));

    this.assignmentSent = null;

    this.router.navigate(["/home"]);
  }

  getAssignment() {
    const id = +this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id)
      .subscribe(
        assignment => {
          this.assignmentSent = assignment;
        },
        error => console.error(error)
      );
  }

  onEditAssignment() {
    if (!this.assignmentSent || this.assignmentSent.id === undefined) {
      console.error('Assignment or assignment ID is undefined');
      return;
    }

    this.router.navigate(["/assignment", this.assignmentSent.id, "edit"],
      { queryParams: { name: this.assignmentSent.name }, fragment: 'edition' });
  }


  isUserAdmin() {
    return this.authService.isUserAdmin();
  }
}
