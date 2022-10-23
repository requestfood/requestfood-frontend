import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientConsumableComponent } from './client-consumable.component';

describe('ClientConsumableComponent', () => {
  let component: ClientConsumableComponent;
  let fixture: ComponentFixture<ClientConsumableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientConsumableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientConsumableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
