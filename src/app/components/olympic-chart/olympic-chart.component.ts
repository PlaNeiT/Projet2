import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OlympicService } from '../../core/services/olympic.service';
import { Olympic } from '../../core/models/Olympic';
import {Color, NgxChartsModule, ScaleType} from '@swimlane/ngx-charts';

@Component({
  selector: 'app-olympic-chart',
  templateUrl: './olympic-chart.component.html',
  standalone: true,
  imports: [
    NgxChartsModule
  ],
  styleUrls: ['./olympic-chart.component.scss']
})
export class OlympicChartComponent implements OnInit {
  olympicData: Olympic[] = [];
  chartData: any[] = [];
  view: [number, number] = [700, 400];

  // options for the chart
  showLegend = true;
  showLabels = true;
  animations = true;

  colorScheme: Color = {
    name: 'default',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  totalJOs: number = 0;
  totalCountries: number = 0;

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympicService.loadInitialData().subscribe();
    this.olympicService.getOlympics().subscribe((data: Olympic[]) => {
      this.olympicData = data;
      this.chartData = this.transformDataForChart(data);
      this.totalJOs = this.calculateTotalJOs(data);
      this.totalCountries = data.length;
    });
  }

  transformDataForChart(data: Olympic[]): any[] {
    return data.map(country => ({
      name: country.country,
      value: country.participations.reduce((total, participation) => total + participation.medalsCount, 0),
      extra: {
        id: country.id
      }
    }));
  }

  onSelect(event: any): void {
    this.router.navigate(['/country', event.extra.id]);
  }

  calculateTotalJOs(data: Olympic[]): number {
    const years = new Set<number>();
    data.forEach(country => {
      country.participations.forEach(participation => {
        years.add(participation.year);
      });
    });
    return years.size;
  }
}
