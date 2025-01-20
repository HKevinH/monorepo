import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseDetailsModalComponent } from './purchase-details-modal.component';

describe('PurchaseDetailsModalComponent', () => {
  let component: PurchaseDetailsModalComponent;
  let fixture: ComponentFixture<PurchaseDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseDetailsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
