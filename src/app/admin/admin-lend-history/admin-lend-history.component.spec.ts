import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLendHistoryComponent } from './admin-lend-history.component';

describe('AdminLendHistoryComponent', () => {
  let component: AdminLendHistoryComponent;
  let fixture: ComponentFixture<AdminLendHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLendHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLendHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
