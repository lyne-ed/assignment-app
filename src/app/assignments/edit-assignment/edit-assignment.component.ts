import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
  assignment!: Assignment | undefined;
  nameAssignment!: string;
  dateReturnAssignment!: Date;
  studentAssignment!: string;
  instructionAssignment!: string;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAssignment();

    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
  }

  getAssignment() {
    const id = +this.route.snapshot.params['id'];

    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      if (!assignment) return;
      this.assignment = assignment;

      this.nameAssignment = assignment.name;
      this.dateReturnAssignment = assignment.date;
      this.studentAssignment = assignment.student;
      this.instructionAssignment = assignment.instructions;
    });
  }

  onSaveAssignment() {
    if (!this.assignment) return;

    this.assignment.name = this.nameAssignment;
    this.assignment.date = this.dateReturnAssignment;
    this.assignment.student = this.studentAssignment;
    this.assignment.instructions = this.instructionAssignment;

    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((message) => {
        console.log(message);
        this.router.navigate(['/home']);
      });
  }
}
