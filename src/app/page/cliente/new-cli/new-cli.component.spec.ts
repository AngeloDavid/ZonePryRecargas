import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCliComponent } from './new-cli.component';

describe('NewCliComponent', () => {
  let component: NewCliComponent;
  let fixture: ComponentFixture<NewCliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
