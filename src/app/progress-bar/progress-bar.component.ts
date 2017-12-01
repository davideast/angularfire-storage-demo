import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  template: `
    <div 
      class="progress" 
      [style.width]="percentage + '%'">
    </div>
  `,
  styles: [
    `:host { display: block; height: 15px; }`,
    `.progress { 
      height: inherit; 
      width: 0%; 
      background-color: green;  
      transition: width ease-out .3s;
    }`
  ]
})
export class ProgressBarComponent {
  @Input() percentage: number;
}
