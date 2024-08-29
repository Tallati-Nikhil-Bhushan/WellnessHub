import { Component } from '@angular/core';

@Component({
  selector: 'app-fitness',
  templateUrl: './fitness.component.html',
  styleUrls: ['./fitness.component.css']
})
export class FitnessComponent {
  stepsCovered = 5000;
  targetSteps = 10000;

  get progressBarWidth(): string {
    return `${(this.stepsCovered / this.targetSteps) * 100}%`;
  }
}
