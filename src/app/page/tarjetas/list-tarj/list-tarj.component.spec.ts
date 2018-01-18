import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTarjComponent } from './list-tarj.component';

describe('ListTarjComponent', () => {
  let component: ListTarjComponent;
  let fixture: ComponentFixture<ListTarjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTarjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTarjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
