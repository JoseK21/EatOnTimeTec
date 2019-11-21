import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmadasComponent } from './confirmadas.component';

describe('ConfirmadasComponent', () => {
  let component: ConfirmadasComponent;
  let fixture: ComponentFixture<ConfirmadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
