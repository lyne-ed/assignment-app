import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {

  constructor(private assignmentsService: AssignmentsService, private router: Router) { }

  ngOnInit(): void {}

  // For the form
  assignmentName = '';
  assignmentStudent = '';
  assignmentInstructions = '';
  assignmentDateReturn = new Date();
  assignmentReturned = false;

  // For the button
  activeAdd = false;

  onSubmit() {
    const newAssignmentOnSubmit = new Assignment();

    newAssignmentOnSubmit.name = this.assignmentName;
    newAssignmentOnSubmit.student = this.assignmentStudent;
    newAssignmentOnSubmit.instructions = this.assignmentInstructions;

    if (this.assignmentDateReturn) {
      newAssignmentOnSubmit.date = this.assignmentDateReturn;
    }
    newAssignmentOnSubmit.returned = this.assignmentReturned;

    this.assignmentsService.addAssignment(newAssignmentOnSubmit)
      .subscribe(message => console.log(message));

    this.router.navigate(['/home']);
  }
}
