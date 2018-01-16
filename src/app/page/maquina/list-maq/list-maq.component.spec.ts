import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMaqComponent } from './list-maq.component';

describe('ListMaqComponent', () => {
  let component: ListMaqComponent;
  let fixture: ComponentFixture<ListMaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
