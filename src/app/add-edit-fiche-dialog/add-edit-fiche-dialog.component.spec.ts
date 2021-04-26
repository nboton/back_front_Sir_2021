import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFicheDialogComponent } from './add-edit-fiche-dialog.component';

describe('AddEditFicheDialogComponent', () => {
  let component: AddEditFicheDialogComponent;
  let fixture: ComponentFixture<AddEditFicheDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditFicheDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditFicheDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
