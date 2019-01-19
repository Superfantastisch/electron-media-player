import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadMovieDialogComponent } from './download-movie-dialog.component';

describe('DownloadMovieDialogComponent', () => {
  let component: DownloadMovieDialogComponent;
  let fixture: ComponentFixture<DownloadMovieDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadMovieDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadMovieDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
