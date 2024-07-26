import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from '../button/button.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertComponent, ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit openChange event when handleChangeOpen is called', () => {
    spyOn(component.openChange, 'emit');

    component.handleChangeOpen(true);

    expect(component.openChange.emit).toHaveBeenCalledWith(true);
  });

  it('should emit close event when closeAlert is called', () => {
    spyOn(component.close, 'emit');

    component.closeAlert();

    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should call handleChangeOpen and closeAlert on button click', () => {
    spyOn(component, 'handleChangeOpen');
    spyOn(component, 'closeAlert').and.callThrough();

    const button: ButtonComponent = fixture.debugElement.query(
      By.css('app-button')
    ).componentInstance;
    button.click.emit(new MouseEvent('click'));

    fixture.detectChanges();

    expect(component.closeAlert).toHaveBeenCalled();
    expect(component.handleChangeOpen).toHaveBeenCalledWith(false);
  });
});
