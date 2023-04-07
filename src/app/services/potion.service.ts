import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError, mergeMap } from 'rxjs/operators';
import { Potion } from '../potion';

@Injectable({
  providedIn: 'root'
})
export class PotionService {

  constructor(private http: HttpClient) { }

  url: string = "http://localhost:3000/potion";
  items: Potion[] = [];

  getAllPotions(): Observable<Potion[]> {
    return this.http.get<Potion[]>(this.url).pipe(
      catchError(this.handleError)
    );
  }

  addPotion(potion: Potion): Observable<Potion> {
    const index = this.items.findIndex((p) => p.name === potion.name);
    if (index > -1) {
      // Potion already exists, update quantity
      const existingPotion = this.items[index];
      existingPotion.quantity += potion.quantity;
      return this.http.put<Potion>(`${this.url}/${existingPotion._id}`, existingPotion).pipe(
        catchError(this.handleError)
      );
    } else {
      // Add new potion
      return this.http.post<Potion>(this.url, potion).pipe(
        catchError(this.handleError),
        map((response: any): Potion => response as Potion)
      );
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  };
}
