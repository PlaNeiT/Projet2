import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OlympicService } from '../../core/services/olympic.service';
import { Olympic } from '../../core/models/Olympic';
import { Participation } from '../../core/models/Participation';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  standalone: true,
  imports: [
    NgxChartsModule
  ],
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {
  country: Olympic | undefined; // Stores the selected country data
  totalMedals: number = 0; // Stores the total medals count
  totalAthletes: number = 0; // Stores the total athletes count
  lineChartData: any[] = []; // Stores data for the line chart
  minMedals: number = 0; // Minimum medals count
  maxMedals: number = 0; // Maximum medals count

  colorScheme: Color = {
    name: 'default',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(
      private route: ActivatedRoute, // Handles the active route
      private olympicService: OlympicService, // Service to fetch Olympic data
      private router: Router // Router to navigate between pages
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Get country ID from URL
    this.olympicService.getOlympics().subscribe((data: Olympic[]) => {
      this.country = data.find(country => country.id === id); // Find the country by ID
      if (this.country) {
        // Calculate total medals and athletes
        this.totalMedals = this.country.participations.reduce((sum, p) => sum + p.medalsCount, 0);
        this.totalAthletes = this.country.participations.reduce((sum, p) => sum + p.athleteCount, 0);
        this.lineChartData = this.transformDataForChart(this.country); // Transform data for the chart

        const medalCounts = this.country.participations.map(p => p.medalsCount);
        this.minMedals = Math.min(...medalCounts); // Set minimum medals count
        this.maxMedals = Math.max(...medalCounts); // Set maximum medals count
      }
    });
  }

  transformDataForChart(country: Olympic): any[] {
    // Transform country participation data to chart-compatible format
    return [
      {
        name: 'Medals',
        series: country.participations.map((participation: Participation) => ({
          name: participation.year.toString(),
          value: participation.medalsCount
        }))
      }
    ];
  }

  goBack(): void {
    // Reload data and navigate to home
    this.olympicService.loadInitialData().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
