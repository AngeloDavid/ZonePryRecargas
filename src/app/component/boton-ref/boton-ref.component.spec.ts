import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonRefComponent } from './boton-ref.component';

describe('BotonRefComponent', () => {
  let component: BotonRefComponent;
  let fixture: ComponentFixture<BotonRefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotonRefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotonRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
