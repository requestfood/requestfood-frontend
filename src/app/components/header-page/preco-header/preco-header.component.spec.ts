import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecoHeaderComponent } from './preco-header.component';

describe('PrecoHeaderComponent', () => {
  let component: PrecoHeaderComponent;
  let fixture: ComponentFixture<PrecoHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrecoHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrecoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
