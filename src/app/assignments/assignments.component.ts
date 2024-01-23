import { Component, OnInit } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})


export class AssignmentsComponent implements OnInit {
  currentPage = 1;
  assignmentsPerPage = 10;
  totalAssignments: number;

  activeAdd = false;

  title = "Assignment Report";

  assignmentSelected?: Assignment;

  listAssignments!: Assignment[];

  constructor(private assignmentsService: AssignmentsService, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getAssignments(this.currentPage, this.assignmentsPerPage);
  }

  // For the form
  assignments: any;
  nameAssignment: string = "";
  dateReturnAssignment?: Date;
  studentAssignment = "";
  instructionAssignment = "";
  dateAssignment?: Date;

  onAssignmentClicked(newAssignment: Assignment) {
    this.assignmentSelected = newAssignment;
    console.log(this.assignmentSelected);
    if (newAssignment.id) {
      this.router.navigate(['/assignment-detail', newAssignment.id]);
    }
  }

  onSubmit() {
    this.title = "You typed : " + this.dateAssignment;
    console.log(event)

    let newAssignment = new Assignment();
    newAssignment.name = this.nameAssignment;
    if (this.dateAssignment)
      newAssignment.date = this.dateAssignment;

    newAssignment.returned = false;

    this.assignments.push(newAssignment);
  }
  /*
    onAddAssignmentBtnClick() {
      this.activeAdd = true;
    }

    onNewAssignment(newAssignmentEvent:Assignment) {
      //this.listAssignments.push(newAssignmentEvent);
      this.assignmentService.addAssignment(newAssignmentEvent)
        .subscribe(message => {
          console.log(message);
          this.getAssignments();
        });
      this.activeAdd = false;
    }
  */
  deleteAssignment(id: number): void {
    this.assignmentsService.deleteAssignment(id)
      .subscribe(message => {
        console.log(message);
        this.getAssignments();
      });
  }

  changePage(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.assignmentsPerPage = event.pageSize;
    this.getAssignments(this.currentPage, this.assignmentsPerPage);
  }


  getAssignments(page: number = this.currentPage, limit: number = this.assignmentsPerPage) {
    this.assignmentsService.getAssignments(page, limit).subscribe(response => {
        this.listAssignments = response.assignments.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        this.totalAssignments = response.total;
        this.currentPage = page;
        this.cdr.detectChanges();
        console.log(this.listAssignments[0]);
    });
}



}
