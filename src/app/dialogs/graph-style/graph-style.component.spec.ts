import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphStyleComponent } from './graph-style.component';

describe('GraphStyleComponent', () => {
  let component: GraphStyleComponent;
  let fixture: ComponentFixture<GraphStyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphStyleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
