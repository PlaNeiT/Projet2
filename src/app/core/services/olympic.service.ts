import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
    providedIn: 'root', // Provides this service at the root level, making it a singleton
})
export class OlympicService {
    private olympicUrl = './assets/mock/olympic.json'; // URL to the JSON file containing // URL to the JSON file cOlympic data
    private olympics$ = new BehaviorSubject<Olympic[]>([]); // Stores and emits the Olympic data

    constructor(private http: HttpClient) {} // Injects HttpClient to make HTTP requests

    // Loads initial data from the JSON file
    loadInitialData() {
        return this.http.get<Olympic[]>(this.olympicUrl).pipe(
            tap((value) => this.olympics$.next(value)), // Updates the BehaviorSubject with the fetched data
            catchError((error) => {
                console.error('An error occurred:', error);
                this.olympics$.next([]); // Emits an empty array in case of an error
                return throwError(error);
            })
        );
    }

    // Returns the observable of the BehaviorSubject
    getOlympics() {
        return this.olympics$.asObservable();
    }
}
