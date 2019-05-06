import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NepovesloComponent } from './nepoveslo.component';

describe('NepovesloComponent', () => {
  let component: NepovesloComponent;
  let fixture: ComponentFixture<NepovesloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NepovesloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NepovesloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
