import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineStatusComponent } from './online-status.component';

describe('OnlineStatusComponent', () => {
  let component: OnlineStatusComponent;
  let fixture: ComponentFixture<OnlineStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
