import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedListComponentComponent } from './completed-list-component.component';

describe('CompletedListComponentComponent', () => {
  let component: CompletedListComponentComponent;
  let fixture: ComponentFixture<CompletedListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedListComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
