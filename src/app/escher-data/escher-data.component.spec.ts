import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscherDataComponent } from './escher-data.component';

describe('EscherDataComponent', () => {
  let component: EscherDataComponent;
  let fixture: ComponentFixture<EscherDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscherDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscherDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
