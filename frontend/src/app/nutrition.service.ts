import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NutritionService {

  private apiUrl = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
  private appId = 'ba07c6d1';  // Replace with your Nutritionix App ID
  private appKey = '35d19200749a26674d81a581834318fb';  // Replace with your Nutritionix App Key

  constructor(private http: HttpClient) { }

  getNutrients(query: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-app-id': this.appId,
      'x-app-key': this.appKey
    });

    const requestBody = {
      query: query
    };
    
    return this.http.post<any>(this.apiUrl, requestBody, { headers });
  }
}
