import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMaqComponent } from './new-maq.component';

describe('NewMaqComponent', () => {
  let component: NewMaqComponent;
  let fixture: ComponentFixture<NewMaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
