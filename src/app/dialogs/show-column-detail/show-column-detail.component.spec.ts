import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowColumnDetailComponent } from './show-column-detail.component';

describe('ShowColumnDetailComponent', () => {
  let component: ShowColumnDetailComponent;
  let fixture: ComponentFixture<ShowColumnDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowColumnDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowColumnDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
