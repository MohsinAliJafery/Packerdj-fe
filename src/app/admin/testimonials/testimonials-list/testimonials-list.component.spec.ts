import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialsListComponent } from './testimonials-list.component';

describe('TestimonialsListComponent', () => {
  let component: TestimonialsListComponent;
  let fixture: ComponentFixture<TestimonialsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestimonialsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestimonialsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
