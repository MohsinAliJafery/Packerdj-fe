import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewestJobsComponent } from './newest-jobs.component';

describe('NewestJobsComponent', () => {
  let component: NewestJobsComponent;
  let fixture: ComponentFixture<NewestJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewestJobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewestJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
