import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentConsumableComponent } from './establishment-consumable.component';

describe('EstablishmentConsumableComponent', () => {
  let component: EstablishmentConsumableComponent;
  let fixture: ComponentFixture<EstablishmentConsumableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstablishmentConsumableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstablishmentConsumableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
