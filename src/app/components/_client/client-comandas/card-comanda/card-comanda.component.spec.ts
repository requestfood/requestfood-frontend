/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CardComandaComponent } from './card-comanda.component';

describe('CardComandaComponent', () => {
  let component: CardComandaComponent;
  let fixture: ComponentFixture<CardComandaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardComandaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
