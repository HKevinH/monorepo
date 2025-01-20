import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseCardsComponent } from './purchase-cards.component';

describe('PurchaseCardsComponent', () => {
  let component: PurchaseCardsComponent;
  let fixture: ComponentFixture<PurchaseCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
