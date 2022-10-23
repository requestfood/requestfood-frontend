import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroClienteComponent } from 'src/app/components/_client/cadastro/cadastro.component';

import { CadastroEstablishmentComponent } from './cadastro.component';

describe('CadastroComponent', () => {
  let component: CadastroClienteComponent;
  let fixture: ComponentFixture<CadastroClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
