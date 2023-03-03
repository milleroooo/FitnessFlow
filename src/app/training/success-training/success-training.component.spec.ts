import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessTrainingComponent } from './success-training.component';

describe('SuccessTrainingComponent', () => {
  let component: SuccessTrainingComponent;
  let fixture: ComponentFixture<SuccessTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessTrainingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
