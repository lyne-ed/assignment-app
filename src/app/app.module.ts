import { NgModule                  } from '@angular/core';
import { BrowserModule             } from '@angular/platform-browser';

import { AppComponent              } from './app.component';
import { BrowserAnimationsModule   } from '@angular/platform-browser/animations';
import { MatButtonModule           } from '@angular/material/button';
import { MatDividerModule          } from '@angular/material/divider';
import { MatInputModule            } from '@angular/material/input';
import { MatIconModule             } from '@angular/material/icon';
import { MatFormFieldModule        } from '@angular/material/form-field';
import { MatToolbarModule          } from '@angular/material/toolbar';
import { MatSidenavModule          } from '@angular/material/sidenav';
import { MatListModule             } from '@angular/material/list';
import { MatCardModule             } from '@angular/material/card';
import { MatCheckboxModule         } from '@angular/material/checkbox';
import { MatSlideToggleModule      } from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AssignmentsComponent      } from './assignments/assignments.component';
import { NotReturnedDirective      } from './directives/not-returned.directive';
import { ReturnedDirective         } from './directives/returned.directive';
import { FormsModule               } from '@angular/forms';
import { MatDatepickerModule       } from '@angular/material/datepicker';
import { MatNativeDateModule       } from '@angular/material/core';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AddAssignmentComponent    } from './assignments/add-assignment/add-assignment.component';
import { AppRoutingModule          } from './app-routing.module';
import { EditAssignmentComponent   } from './assignments/edit-assignment/edit-assignment.component';
import { LoginComponent            } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    NotReturnedDirective,
    ReturnedDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatCheckboxModule,
    AppRoutingModule,
    MatSlideToggleModule,
    HttpClientModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
