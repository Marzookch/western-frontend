import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProdutAddingComponent } from './admin-produt-adding.component';

describe('AdminProdutAddingComponent', () => {
  let component: AdminProdutAddingComponent;
  let fixture: ComponentFixture<AdminProdutAddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProdutAddingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProdutAddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
