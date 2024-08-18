import {Component, HostListener, Input, OnChanges, SimpleChanges} from '@angular/core';
import { Router } from '@angular/router';
import { Olympic } from '../../core/models/Olympic';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-olympic-chart',
  templateUrl: './olympic-chart.component.html',
  standalone: true,
  imports: [NgxChartsModule],
  styleUrls: ['./olympic-chart.component.scss']
})
export class OlympicChartComponent implements OnChanges {
  @Input() data: Olympic[] = []; // Input property to receive Olympic data
  chartData: any[] = []; // Data to be used in the chart
  view: [number, number] = [600, 350]; // Dimensions of the chart

  // Options for the chart
  showLegend = true; // Display the legend
  showLabels = true; // Display labels on the chart
  animations = true; // Enable animations

  // Color scheme for the chart
  colorScheme: Color = {
    name: 'random',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: this.generateRandomColors(5)
  };

  totalJOs: number = 0; // Total number of Olympic games
  totalCountries: number = 0; // Total number of countries

  constructor(private router: Router) {}

  // Lifecycle hook to handle changes in the input data
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.chartData = this.transformDataForChart(this.data); // Transform data for chart
      this.totalJOs = this.calculateTotalJOs(this.data); // Calculate total number of Olympic games
      this.totalCountries = this.data.length; // Calculate total number of countries
    }
  }

  // Transforms the Olympic data into a format suitable for the chart
  transformDataForChart(data: Olympic[]): any[] {
    return data.map(country => ({
      name: country.country,
      value: country.participations.reduce((total, participation) => total + participation.medalsCount, 0),
      extra: { id: country.id }
    }));
  }

  // Handles the selection of a chart element
  onSelect(event: any): void {
    this.router.navigate(['/country', event.extra.id]); // Navigate to the country detail page
  }

  // Calculates the total number of Olympic games from the data
  calculateTotalJOs(data: Olympic[]): number {
    const years = new Set<number>();
    data.forEach(country => {
      country.participations.forEach(participation => {
        years.add(participation.year);
      });
    });
    return years.size;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.adjustChartView();
  }

  ngOnInit(): void {
    this.adjustChartView();
  }

  private adjustChartView(): void {
    const width = window.innerWidth;

    if (width < 768) {
      this.view = [380, 320];
    } else if (width < 1200) {
      this.view = [500, 300];
    } else {
      this.view = [600, 350];
    }
  }

  private generateRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  private generateRandomColors(numColors: number): string[] {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      colors.push(this.generateRandomColor());
    }
    return colors;
  }
}
