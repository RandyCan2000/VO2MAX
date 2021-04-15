import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphlineComponent } from './graphline.component';

describe('GraphlineComponent', () => {
  let component: GraphlineComponent;
  let fixture: ComponentFixture<GraphlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
