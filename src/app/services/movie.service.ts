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

  addOfflineMovie(offlineContent: any): void {
    // try add offline uri
    try {
      this._movies$.value.forEach((movie) => {
        if (movie.manifestUri === offlineContent.originalManifestUri) {
          movie.offlineUri = offlineContent.offlineUri;
          console.log('success on updating movie list');
          console.log(movie.offlineUri);
        }
      });
      this._movies$.next(this._movies$.value);
    } catch (error) {
      console.error('could not add offline uri');
    }
  }
  async removeOfflineMovie(movie: any): Promise<IMovie> {
    try {
      let returnMovie = null;
      // remove offline uri from list
      this._movies$.value.forEach((m) => {
        if (m.manifestUri === movie.manifestUri) {
          m.offlineUri = null;
          returnMovie = m;
        }
      });
      this._movies$.next(this._movies$.value);
      return returnMovie;
    } catch (error) {
      console.error('could not add offline uri');
    }
  }
}
