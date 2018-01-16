import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCliComponent } from './list-cli.component';

describe('ListCliComponent', () => {
  let component: ListCliComponent;
  let fixture: ComponentFixture<ListCliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
