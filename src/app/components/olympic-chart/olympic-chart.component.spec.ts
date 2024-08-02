import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlympicChartComponent } from './olympic-chart.component';

describe('OlympicChartComponent', () => {
  let component: OlympicChartComponent;
  let fixture: ComponentFixture<OlympicChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OlympicChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OlympicChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
