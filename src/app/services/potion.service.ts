import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { Potion } from '../potion';

@Injectable({
  providedIn: 'root'
})
export class PotionService {
  constructor(private http: HttpClient) { }

  private readonly url = 'http://localhost:3000/potion';

  getAllPotions(): Observable<Potion[]> {
    return this.http.get<Potion[]>(this.url).pipe(
      catchError(this.handleError)
    );
  }

  addPotion(potion: Potion): Observable<Potion> {
    return this.getAllPotions().pipe(
      mergeMap((potions: Potion[]) => {
        const existingPotion = potions.find((p: Potion) => p.name === potion.name);
        if (existingPotion) {
          existingPotion.quantity += potion.quantity;
          return this.http.put<Potion>(`${this.url}/${existingPotion._id}`, existingPotion).pipe(
            catchError(this.handleError)
          );
        } else {
          return this.http.post<Potion>(this.url, potion).pipe(
            catchError(this.handleError)
          );
        }
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
