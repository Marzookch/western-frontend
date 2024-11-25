import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductListingComponent } from './admin-product-listing.component';

describe('AdminProductListingComponent', () => {
  let component: AdminProductListingComponent;
  let fixture: ComponentFixture<AdminProductListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
