import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhComponent } from './minh.component';

describe('MinhComponent', () => {
  let component: MinhComponent;
  let fixture: ComponentFixture<MinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
