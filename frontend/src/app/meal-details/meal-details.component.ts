import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.css']
})
export class MealDetailsComponent implements OnInit {

  mealDetailsHtml: string | undefined;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const mealType = params.get('mealType');
      this.route.queryParams.subscribe(queryParams => {
        const calories = queryParams['calories'];
        const dietaryPreference = queryParams['dietaryPreference'];

        if (mealType) {
          this.fetchMealDetails(mealType, calories, dietaryPreference);
        }
      });
    });
  }


  fetchMealDetails(mealType: string, calories: number, dietaryPreference: string): void {
    this.http.get(`http://localhost:8081/DietPlanner/api/diets/meals/${mealType}`, {
      params: {
        calories: calories.toString(),
        dietaryPreference: dietaryPreference
      },
      responseType: 'text'  // Expecting plain text (HTML) response
    }).subscribe(
      response => {
        this.mealDetailsHtml = response;
      },
      error => {
        console.error('Error fetching meal details', error);
      }
    );
  }
}
