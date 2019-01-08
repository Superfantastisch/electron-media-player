import { Injectable } from '@angular/core';
import { MOVIES, IMovie } from './models/movies';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private _movieUri = 'https://storage.googleapis.com/shaka-demo-assets/';
  private _movies = MOVIES;
  private selectedMovie$ = new Subject<IMovie>();

  constructor(
    private readonly http: HttpClient
  ) { }

  get movies$(): Observable<Array<IMovie>> {
    return of(this._movies);
  }
}
