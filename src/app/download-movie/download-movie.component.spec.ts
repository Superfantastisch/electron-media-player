import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadMovieComponent } from './download-movie.component';

describe('DownloadMovieComponent', () => {
  let component: DownloadMovieComponent;
  let fixture: ComponentFixture<DownloadMovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadMovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
