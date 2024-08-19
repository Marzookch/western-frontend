import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryAddingComponent } from './admin-category-adding.component';

describe('AdminCategoryAddingComponent', () => {
  let component: AdminCategoryAddingComponent;
  let fixture: ComponentFixture<AdminCategoryAddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCategoryAddingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCategoryAddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
