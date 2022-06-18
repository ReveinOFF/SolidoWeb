import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCatalogsComponent } from './admin-catalogs.component';

describe('AdminCatalogsComponent', () => {
  let component: AdminCatalogsComponent;
  let fixture: ComponentFixture<AdminCatalogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCatalogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCatalogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
