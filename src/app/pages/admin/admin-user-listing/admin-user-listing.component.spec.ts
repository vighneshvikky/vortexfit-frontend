import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserListingComponent } from './admin-user-listing.component';

describe('AdminUserListingComponent', () => {
  let component: AdminUserListingComponent;
  let fixture: ComponentFixture<AdminUserListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUserListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUserListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
