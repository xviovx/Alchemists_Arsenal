import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Recipe } from '../recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  url: string = "http://localhost:3000/recipes";
  items: Recipe[] = [];
  craftedPotions: Map<string, number> = new Map<string, number>();

  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.url).pipe(
      catchError(this.handleError)
    );
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

  updateRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.url}/${recipe._id}`, recipe).pipe(
      catchError(this.handleError)
    );
  }

  craftPotion(recipe: Recipe): void {
    let craftedAmount = this.craftedPotions.get(recipe.name);
    if (!craftedAmount) {
      craftedAmount = 0;
    }
    craftedAmount++;
    this.craftedPotions.set(recipe.name, craftedAmount);
    alert('Crafting success!');
  }

  getCraftedPotions(recipe: Recipe): number {
    const craftedAmount = this.craftedPotions.get(recipe.name);
    if (!craftedAmount) {
      return 0;
    }
    return craftedAmount;
  }
}
