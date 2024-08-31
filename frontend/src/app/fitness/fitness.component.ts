import { Component, OnInit } from '@angular/core';
import { FitnessService } from '../fitness.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fitness',
  templateUrl: './fitness.component.html',
  styleUrls: ['./fitness.component.css']
})
export class FitnessComponent implements OnInit {
  userId: string | null = localStorage.getItem('userId');  // Assuming userId is stored in local storage
  caloriesLast30Days: number = 0;
  caloriesLast7Days: number = 0;
  caloriesLastDay: number = 0;
  caloriesToday: number = 0;

  constructor(private fitnessService: FitnessService, private router: Router) {}

  ngOnInit(): void {
    if (this.userId) {
      this.fitnessService.getCaloriesBurnedLast30Days(this.userId).subscribe(data => this.caloriesLast30Days = data);
      this.fitnessService.getCaloriesBurnedLast7Days(this.userId).subscribe(data => this.caloriesLast7Days = data);
      this.fitnessService.getCaloriesBurnedLastDay(this.userId).subscribe(data => this.caloriesLastDay = data);
      this.fitnessService.getCaloriesBurnedToday(this.userId).subscribe(data => this.caloriesToday = data);
    }
  }

  navigateToAddActivity(): void {
    this.router.navigate(['/add-activity']);
  }

  showActivityHistory(): void {
    // Logic to show activity history
  }
}
