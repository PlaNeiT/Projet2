import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OlympicService } from '../../core/services/olympic.service';
import { Olympic} from '../../core/models/Olympic';
import { Participation } from '../../core/models/Participation';
import {Color, NgxChartsModule, ScaleType} from '@swimlane/ngx-charts';

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
  country: Olympic | undefined;
  totalMedals: number = 0;
  totalAthletes: number = 0;
  lineChartData: any[] = [];
  minMedals: number = 0;
  maxMedals: number = 0;

  colorScheme: Color = {
    name: 'default',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(
      private route: ActivatedRoute,
      private olympicService: OlympicService,
      private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.olympicService.getOlympics().subscribe((data: Olympic[]) => {
      this.country = data.find(country => country.id === id);
      if (this.country) {
        this.totalMedals = this.country.participations.reduce((sum, p) => sum + p.medalsCount, 0);
        this.totalAthletes = this.country.participations.reduce((sum, p) => sum + p.athleteCount, 0);
        this.lineChartData = this.transformDataForChart(this.country);

        const medalCounts = this.country.participations.map(p => p.medalsCount);
        this.minMedals = Math.min(...medalCounts);
        this.maxMedals = Math.max(...medalCounts);
      }
    });
  }

  transformDataForChart(country: Olympic): any[] {
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
    this.router.navigate(['/']);
  }
}
