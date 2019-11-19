import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestHistoryComponent } from './invest-history.component';

describe('InvestHistoryComponent', () => {
  let component: InvestHistoryComponent;
  let fixture: ComponentFixture<InvestHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
