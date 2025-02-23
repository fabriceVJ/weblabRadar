import { Injectable } from '@angular/core';
import {catchError, Observable, of} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Technology} from '../models/Technology';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  constructor(private http: HttpClient) { }

  getTechnologies(): Observable<Technology[]> {
    // return of([])
    return this.http.get<Technology[]>("http://localhost:3001/api/technologies").pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status == 401) {

        }
        throw Error();
      })
    )
  }
}
