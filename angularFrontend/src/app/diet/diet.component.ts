import { Component, OnInit } from '@angular/core';
import { DietService } from '../diet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diet',
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.css']
})
export class DietComponent implements OnInit {
  totalCalories: number = 0;
  mealCalories: { [key: string]: number } = {};

  constructor(private dietService: DietService, private router: Router) {}

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

  navigateToMealDetails(meal: string): void {
    this.router.navigate([`/meal-details/${meal}`]);
  }
}
