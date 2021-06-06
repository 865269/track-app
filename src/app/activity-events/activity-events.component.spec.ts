import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityEventsComponent } from './activity-events.component';

describe('ActivityEventsComponent', () => {
  let component: ActivityEventsComponent;
  let fixture: ComponentFixture<ActivityEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
