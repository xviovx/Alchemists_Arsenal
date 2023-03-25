import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from "../item";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class InventoryService {

  constructor(private http: HttpClient) { }

  url: string = "http://localhost:3000/inventory"

  items: Item[] = []

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.url)
  }

}
