import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CountryDetailComponent } from './pages/country-detail/country-detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

// Définition des routes pour l'application
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'country/:id', component: CountryDetailComponent }, // :id -> dynamic route parameter
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
