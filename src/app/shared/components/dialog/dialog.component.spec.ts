import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';
import { SimpleChange } from '@angular/core';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should call showModal when open is true', () => {
    spyOn(component.dialog.nativeElement, 'showModal');
    spyOn(component,'show').and.callThrough();
    component.ngOnChanges({
      open: new SimpleChange(null, true, false),
    });
    expect(component.show).toHaveBeenCalled();
    expect(component.dialog.nativeElement.showModal).toHaveBeenCalled();
  });

  it('should call close when open is false', () => {
    spyOn(component.dialog.nativeElement, 'close');
    spyOn(component,'close').and.callThrough();
    component.ngOnChanges({
      open: new SimpleChange(null, false, false),
    });
    expect(component.close).toHaveBeenCalled();
    expect(component.dialog.nativeElement.close).toHaveBeenCalled();
  });

  it('should emit openChange with false when handleClose is called', () => {
    spyOn(component.openChange, 'emit');
    component.handleClose();
    expect(component.openChange.emit).toHaveBeenCalledWith(false);
  });

  it('should set open to false when handleClose is called', () => {
    component.open = true;
    component.handleClose();
    expect(component.open).toBe(false);
  });
});
