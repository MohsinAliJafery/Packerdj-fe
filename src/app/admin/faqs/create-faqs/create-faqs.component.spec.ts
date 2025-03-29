import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFaqsComponent } from './create-faqs.component';

describe('CreateFaqsComponent', () => {
  let component: CreateFaqsComponent;
  let fixture: ComponentFixture<CreateFaqsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFaqsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFaqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
