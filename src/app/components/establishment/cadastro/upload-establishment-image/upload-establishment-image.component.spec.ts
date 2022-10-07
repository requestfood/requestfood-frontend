import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadEstablishmentImageComponent } from './upload-establishment-image.component';

describe('UploadEstablishmentImageComponent', () => {
  let component: UploadEstablishmentImageComponent;
  let fixture: ComponentFixture<UploadEstablishmentImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadEstablishmentImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadEstablishmentImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
