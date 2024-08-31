import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FitnessService {
  private apiUrl = 'http://localhost:8083/api/fitness';

  constructor(private http: HttpClient) {}

  getCaloriesBurnedLast30Days(userId: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${userId}/calories-burned/last-30-days`);
  }

  getCaloriesBurnedLast7Days(userId: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${userId}/calories-burned/last-7-days`);
  }

  getCaloriesBurnedLastDay(userId: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${userId}/calories-burned/last-day`);
  }

  getCaloriesBurnedToday(userId: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${userId}/calories-burned/today`);
  }
}
