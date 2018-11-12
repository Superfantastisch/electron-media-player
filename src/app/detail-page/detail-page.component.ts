import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { IMovie } from '../models/movies';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {
  movie: IMovie = null;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params) {
        this.movie = (params as IMovie);
      }
    }, err => {
      console.error('can not get movie');
      console.error(err);
    });
  }

}
