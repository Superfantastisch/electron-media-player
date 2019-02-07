import { Injectable } from '@angular/core';
import { MOVIES, IMovie } from '../models/movies';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as shaka from 'shaka-player';
import { OnlineStatusService } from '../online-status.service';

/**
 * Warning: this service could produce inconsistent data, since we are using the movie mpd file as an identifyer
 */
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private _movieUri = 'https://storage.googleapis.com/shaka-demo-assets/';
  private _movies$ = new BehaviorSubject<Array<IMovie>>(MOVIES);

  constructor(
    private readonly http: HttpClient,
    private _isOnline: OnlineStatusService
  ) { }
  // brings the availabel movie list to the components of this application
  get movies$(): Observable<Array<IMovie>> {
    return this._movies$.asObservable();
  }
  /**
   * helper function to map shaka-player offline objects to our IMovie objects
   */
  private _createIMovie(stContent: shaka.shakaExtern.StoredContent): IMovie {
    return {
      name: stContent.appMetadata.title,
      manifestUri: stContent.originalManifestUri,
      offlineUri: stContent.offlineUri,
      imageUrl: stContent.appMetadata.imageUrl
    };
  }
/**
 * this function merges the offline available movies with the movie list from our fake movie services
 * the list is created while comparing the mpd file url's
 * this is not a good solution but what ever works for the demo
 */
  updateMovies(storage: shaka.offline.Storage, isOnline: boolean = true): void {
    try {
      storage.list().then(oList => {
        // current movie list
        const ml = MOVIES;
        // current offline list
        const nol = oList.map(this._createIMovie);
        if (!isOnline) {
          // return only offline list
          this._movies$.next(nol);
        } else {
          const intersection = ml.filter((mlMovie) => {
            return nol.map((nolMovie) => {
              return nolMovie.manifestUri;
            }).indexOf(mlMovie.manifestUri) < 0;
          });
          // remove offlineUris from onlinelist
          intersection.forEach(val => {
            val.offlineUri = '';
          });
         // concat offline and filterd list
          const res = [...nol, ...intersection];
          this._movies$.next(res);
        }
      });
    } catch (error) {
      console.error('could not update movie list');
      console.error(error);
    }
  }
}
