import { Component, OnInit } from '@angular/core';
import { DietService } from '../diet.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-diet',
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.css']
})
export class DietComponent implements OnInit {
  totalCalories: number = 0;
  mealCalories: { [key: string]: number } = {};

  vegPreference: any = {
    Breakfast: false,
    Lunch: false,
    Dinner: false,
    Snacks: false
  };

  constructor(private dietService: DietService, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.getCaloriesData();
  }

  getCaloriesData(): void {
    // Replace `userId` with actual user ID logic
    const userId = localStorage.getItem('userId');
    this.dietService.getCaloriesByMeals(userId).subscribe(data => {
      this.totalCalories = data['totalCalories'];
      this.mealCalories = {
        'Breakfast': data['Breakfast'],
        'Lunch': data['Lunch'],
        'Dinner': data['Dinner'],
        'Snacks': data['Snacks']
      };
    });
  }

  navigateToMealDetails(mealType: string): void {
    const calories = this.mealCalories[mealType].toString();
    const dietaryPreference = this.vegPreference[mealType] ? 'vegetarian' : '';

    if (mealType) {
      this.fetchMealDetails(mealType, calories, dietaryPreference);
    }
  }

  toggleVegetarian(mealType: string): void {
    this.vegPreference[mealType] = !this.vegPreference[mealType];
  }

  mealDetailsHtml: string | undefined;

  fetchMealDetails(mealType: string, calories: string, dietaryPreference: string): void {
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
