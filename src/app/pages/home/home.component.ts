import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from '../../core/models/Olympic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  olympics$: Observable<Olympic[]>; // Observable of Olympic array (Olympic[])

  constructor(private olympicService: OlympicService) {
    this.olympics$ = this.olympicService.getOlympics(); // Get the observable of Olympic array
  }

  ngOnInit(): void {
  }
}
