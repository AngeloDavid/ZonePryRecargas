import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTarjComponent } from './new-tarj.component';

describe('NewTarjComponent', () => {
  let component: NewTarjComponent;
  let fixture: ComponentFixture<NewTarjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTarjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTarjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
