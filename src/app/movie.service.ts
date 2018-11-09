import { Injectable } from '@angular/core';
import { MOVIES, IMovie } from './models/movies';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private _movies = MOVIES;

  constructor() { }

  get movies$(): Observable<Array<IMovie>> {
    return of(this._movies);
  }

}
