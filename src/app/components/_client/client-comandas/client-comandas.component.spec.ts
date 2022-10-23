import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientComandasComponent } from './client-comandas.component';

describe('ClientComandasComponent', () => {
  let component: ClientComandasComponent;
  let fixture: ComponentFixture<ClientComandasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientComandasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientComandasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
