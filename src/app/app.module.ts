import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { OlympicChartComponent } from './components/olympic-chart/olympic-chart.component';
import { CountryDetailComponent } from './pages/country-detail/country-detail.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, OlympicChartComponent, CountryDetailComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
