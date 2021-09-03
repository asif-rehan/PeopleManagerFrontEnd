import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PeopleServiceService } from './people-service.service';
import { Person } from './person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public title = "PeopleManagerFrontEnd";
  public people: Person[] = [];
  public editPerson!: Person;

  constructor(private peopleService: PeopleServiceService){}

  ngOnInit() {
     this.getPeople();
  }

  public getPeople(): void {
    this.peopleService.getPeople().subscribe(
      (response: Person[]) => {
        this.people = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    )
  }

  onAddPerson(addForm: NgForm): void {
    document.getElementById('add-person-form')?.click();
    this.peopleService.addPerson(addForm.value).subscribe(
      (response: Person) => {
        console.log(response);
        this.getPeople();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )
  }

  onUpdatePerson(person: Person): void {
    this.peopleService.updatePerson(person).subscribe(
      (response: Person) => {
        console.log(response);
        this.getPeople();
      
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onOpenModal(person: Person, mode: String): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add'){
      button.setAttribute('data-target', '#addPersonModal');
    }
    if (mode === 'edit'){
      this.editPerson = person;
      button.setAttribute('data-target', '#updatePersonModal');
    }
    if (mode === 'delete'){
      button.setAttribute('data-target', '#deletePersonModal');
    }

  }
  container.appendChild(button);
  button.click();

}
