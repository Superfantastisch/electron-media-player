import { Injectable } from '@angular/core';
import { MOVIES, IMovie } from '../models/movies';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


/**
 * Warning: this service could produce inconsistent data, since we are using the movie title as an identifyer
 */
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private _movieUri = 'https://storage.googleapis.com/shaka-demo-assets/';
  private _movies$ = new BehaviorSubject<Array<IMovie>>(MOVIES);

  constructor(
    private readonly http: HttpClient
  ) { }

  get movies$(): Observable<Array<IMovie>> {
    return this._movies$.asObservable();
  }

  addOfflineMovies(movie: any): void {
    // Todo: complete update movie function
  }
  removeOfflineMovies(movie: any): void {
    // Todo: complete update movie function
  }
}
