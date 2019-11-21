import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigSistemaComponent } from './config-sistema.component';

describe('ConfigSistemaComponent', () => {
  let component: ConfigSistemaComponent;
  let fixture: ComponentFixture<ConfigSistemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigSistemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
