import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.css']
})
export class MealDetailsComponent {
  meal: string | null = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.meal = this.route.snapshot.paramMap.get('meal');
  }
}
