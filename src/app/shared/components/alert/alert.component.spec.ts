import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import { By } from '@angular/platform-browser';

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

  it('should display the title and message', () => {
    component.title = 'Test Title';
    component.message = 'Test Message';
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('div[header]')).nativeElement;
    const messageElement = fixture.debugElement.query(By.css('p')).nativeElement;

    expect(titleElement.textContent).toContain('Test Title');
    expect(messageElement.textContent).toContain('Test Message');
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
    spyOn(component, 'closeAlert');

    const button = fixture.debugElement.query(By.css('app-button')).nativeElement;
    button.click();

    expect(component.handleChangeOpen).toHaveBeenCalledWith(false);
    expect(component.closeAlert).toHaveBeenCalled();
  });
});
