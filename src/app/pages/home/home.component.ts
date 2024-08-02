import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from '../../core/models/Olympic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);
  olympicData: Olympic[] = [];

  constructor(private olympicService: OlympicService) {

  }

  ngOnInit(): void {
    this.olympicService.loadInitialData().subscribe();
    this.olympicService.getOlympics().subscribe((data: Olympic[]) => {
      this.olympicData = data;
    });
  }

  totalMedals(country: Olympic): number {
    return country.participations.reduce((sum, participation) => sum + participation.medalsCount, 0);
  }

  totalAthletes(country: Olympic): number {
    return country.participations.reduce((sum, participation) => sum + participation.athleteCount, 0);
  }
}
