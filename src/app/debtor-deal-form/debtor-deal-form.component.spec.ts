import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtorDealFormComponent } from './debtor-deal-form.component';

describe('DebtorDealFormComponent', () => {
  let component: DebtorDealFormComponent;
  let fixture: ComponentFixture<DebtorDealFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebtorDealFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtorDealFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
