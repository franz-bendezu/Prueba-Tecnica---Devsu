import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductTableComponent } from './product-table.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('ProductTableComponent', () => {
  let component: ProductTableComponent;
  let fixture: ComponentFixture<ProductTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, ProductTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductTableComponent);
    component = fixture.componentInstance;
    component.products = [
      {
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        date_release: '2021-01-01',
        date_revision: '2021-01-02',
        logo: 'logo1.png',
      },
      {
        id: '2',
        name: 'Product 2',
        description: 'Description 2',
        date_release: '2021-02-01',
        date_revision: '2021-02-02',
        logo: 'logo2.png',
      },
      {
        id: '3',
        name: 'Product 3',
        description: 'Description 3',
        date_release: '2021-03-01',
        date_revision: '2021-03-02',
        logo: 'logo3.png',
      },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly calculate total pages', () => {
    component.pageSize = 1;
    component.calculateTotalPages();
    expect(component.totalPages).toBe(component.products.length);
  });

  it('should refresh displayed products when page size changes', () => {
    component.changePageSize(1);
    expect(component.items.length).toBe(1);
  });

  it('should navigate to the next page correctly', () => {
    component.pageSize = 1;
    component.changePage(2);
    expect(component.items[0]).toEqual(component.products[1]);
  });

  it('should disable the "Previous" button on the first page', () => {
    component.currentPage = 1;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(
      By.css('.table-navigation .prev-button')
    ).nativeElement;
    expect(btn.disabled).toBeTruthy();
  });

  it('should disable the "Next" button on the last page', () => {
    component.currentPage = component.totalPages;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(
      By.css('.table-navigation .next-button')
    ).nativeElement;

    expect(btn.disabled).toBeTruthy();
  });

  it('should display the correct total number of results', () => {
    const totalResultsElement = fixture.debugElement.query(
      By.css('.table-bottom > div')
    ).nativeElement;
    expect(totalResultsElement.textContent).toContain(
      `${component.products.length} Resultados`
    );
  });

  it('should enable or disable buttons correctly based on currentPage', () => {
    component.currentPage = 1;
    component.totalPages = 2;
    fixture.detectChanges();

    const prevButton = fixture.debugElement.query(
      By.css('.table-navigation .prev-button')
    );
    const nextButton = fixture.debugElement.query(
      By.css('.table-navigation .next-button')
    );
    expect(prevButton.nativeElement.disabled).toBeTrue();
    expect(nextButton.nativeElement.disabled).toBeFalse();

    nextButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.currentPage).toBe(2);

    expect(prevButton.nativeElement.disabled).toBeFalse();
    expect(nextButton.nativeElement.disabled).toBeTrue();
  });

  it('should call changePage with correct argument when Previous button is clicked', () => {
    spyOn(component, 'changePage');
    component.currentPage = 2;
    fixture.detectChanges();

    const prevButton = fixture.debugElement.query(
      By.css('.table-navigation .prev-button')
    ).nativeElement;
    prevButton.click();

    expect(component.changePage).toHaveBeenCalledWith(1);
  });

  it('should call changePage with correct argument when Next button is clicked', () => {
    spyOn(component, 'changePage');
    component.currentPage = 1;
    component.totalPages = 2;
    fixture.detectChanges();

    const nextButton = fixture.debugElement.query(
      By.css('.table-navigation .next-button')
    ).nativeElement;
    nextButton.click();

    expect(component.changePage).toHaveBeenCalledWith(2);
  });

  it('should emit edit event with correct product data', () => {
    const productToEdit = component.products[0];
    spyOn(component.edit, 'emit');
  
    component.onEdit(productToEdit);
  
    expect(component.edit.emit).toHaveBeenCalledWith(productToEdit);
  });
  
  it('should emit delete event with correct product data', () => {
    const productToDelete = component.products[1];
    spyOn(component.delete, 'emit');
  
    component.onDelete(productToDelete);
  
    expect(component.delete.emit).toHaveBeenCalledWith(productToDelete);
  });
  
});
