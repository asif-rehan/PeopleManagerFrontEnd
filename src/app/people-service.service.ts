import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Person } from './person';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeopleServiceService {
  private apiServerUrl = environment.apiBaseUrl;
  
  constructor(private http: HttpClient) {}

  public getPeople():Observable<Person[]> {
    return this.http.get<Person[]>(`${this.apiServerUrl}/person/all`);
  }

  public addPerson(person: Person):Observable<Person> {
    return this.http.post<Person>(`${this.apiServerUrl}/person/add`, person);
  }

  public updatePerson(person: Person):Observable<Person> {
    return this.http.put<Person>(`${this.apiServerUrl}/person/update`, person);
  }
  public deltePerson(id: number):Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/person/delete/${id}`);
  }


}
