import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    // load data on app start -> pipe(take(1) = unsubscribe after first emission -> Subscribe = start the observable
    this.olympicService.loadInitialData().pipe(take(1)).subscribe();
  }
}
