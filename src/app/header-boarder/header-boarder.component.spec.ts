import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBoarderComponent } from './header-boarder.component';

describe('HeaderBoarderComponent', () => {
  let component: HeaderBoarderComponent;
  let fixture: ComponentFixture<HeaderBoarderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderBoarderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderBoarderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
