import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenProcesoComponent } from './orden-proceso.component';

describe('OrdenProcesoComponent', () => {
  let component: OrdenProcesoComponent;
  let fixture: ComponentFixture<OrdenProcesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenProcesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
