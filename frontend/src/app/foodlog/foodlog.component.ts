import { Component } from '@angular/core';
import { NutritionService } from '../nutrition.service';

@Component({
  selector: 'app-foodlog',
  templateUrl: './foodlog.component.html',
  styleUrls: ['./foodlog.component.css']
})
export class FoodlogComponent {
  userInput: string = '';
  nutrientData: any = null;
  errorMessage: string | null = null;

  constructor(private nutritionService: NutritionService) { }

  submitQuery() {
    if (this.userInput) {
      this.nutritionService.getNutrients(this.userInput).subscribe((data: any) => {
        if (data && data.foods && data.foods.length > 0) {
          this.nutrientData = data.foods[0];
          this.errorMessage = null;
        } else {
          this.errorMessage = 'No nutritional information found.';
          this.nutrientData = null;
        }
      }, error => {
        this.errorMessage = 'An error occurred while fetching the data.';
        this.nutrientData = null;
      });
    }
  }
}
