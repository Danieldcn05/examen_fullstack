import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  
  baseUrl = 'https://www.themealdb.com/api/json/v1/1/';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any[]> {
    const categoriesUrl = this.baseUrl+ 'list.php?c=list'
    return this.http.get<any[]>(categoriesUrl);
  }

  getRecipesByCategory(category: string): Observable<any[]> {
    const recipesUrl = this.baseUrl + `filter.php?c=${category}`
    return this.http.get<any[]>(recipesUrl);
  }

  getRandomRecipe(): Observable<any[]> {
    const randomUrl = this.baseUrl + 'random.php'
    return this.http.get<any[]>(randomUrl);
  }

}
