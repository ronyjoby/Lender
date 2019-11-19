import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLoanHistoryComponent } from './admin-loan-history.component';

describe('AdminLoanHistoryComponent', () => {
  let component: AdminLoanHistoryComponent;
  let fixture: ComponentFixture<AdminLoanHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLoanHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLoanHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
