import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call handleChangeOpen with false and emit close event when closeAlert is called', () => {
    spyOn(component, 'handleChangeOpen');
    spyOn(component.close, 'emit');

    component.closeAlert();

    expect(component.handleChangeOpen).toHaveBeenCalledWith(false);
    expect(component.close.emit).toHaveBeenCalled();
  });
});
