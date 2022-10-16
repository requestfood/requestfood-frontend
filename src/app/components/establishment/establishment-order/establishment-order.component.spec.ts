import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentOrderComponent } from './establishment-order.component';

describe('EstablishmentOrderComponent', () => {
  let component: EstablishmentOrderComponent;
  let fixture: ComponentFixture<EstablishmentOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstablishmentOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstablishmentOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
