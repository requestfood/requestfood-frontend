import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumableInfoComponent } from './consumable-info.component';

describe('ConsumableInfoComponent', () => {
  let component: ConsumableInfoComponent;
  let fixture: ComponentFixture<ConsumableInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumableInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumableInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
