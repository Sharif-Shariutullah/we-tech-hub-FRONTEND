import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalBpoEditComponent } from './global-bpo-edit.component';

describe('GlobalBpoEditComponent', () => {
  let component: GlobalBpoEditComponent;
  let fixture: ComponentFixture<GlobalBpoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalBpoEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalBpoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
