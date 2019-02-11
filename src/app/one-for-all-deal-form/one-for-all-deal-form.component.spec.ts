import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneForAllDealFormComponent } from './one-for-all-deal-form.component';

describe('OneForAllDealFormComponent', () => {
  let component: OneForAllDealFormComponent;
  let fixture: ComponentFixture<OneForAllDealFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneForAllDealFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneForAllDealFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
