import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscherComponent } from './escher.component';

describe('EscherComponent', () => {
  let component: EscherComponent;
  let fixture: ComponentFixture<EscherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
