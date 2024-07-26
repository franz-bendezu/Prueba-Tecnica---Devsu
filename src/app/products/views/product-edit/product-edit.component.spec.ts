import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ProductEditComponent } from './product-edit.component';
import {
  Router,
  ActivatedRoute,
  provideRouter,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { delay, of } from 'rxjs';
import { provideProductService } from '../../services/product.service';
import { IProduct } from '../../interfaces/product.interface';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { routes } from '../../../app.routes';
import { ProductEditFormComponent } from '../../components/product-edit-form/product-edit-form.component';
import { provideZoneChangeDetection } from '@angular/core';
import { PRODUCTS_PATH } from '../../../shared/constants/routes.contants';
import { IProductService } from '../../services/product.service.interface';
import { PRODUCT_SERVICE_TOKEN } from '../../services/product.service.token';

describe('ProductEditComponent', () => {
  let component: ProductEditComponent;
  let fixture: ComponentFixture<ProductEditComponent>;

  let productService: IProductService;
  let routerMock: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', [
    'navigate',
  ]);
  let route: jasmine.SpyObj<Pick<ActivatedRoute, 'snapshot'>>;

  beforeEach(async () => {
    route = {
      snapshot: new ActivatedRouteSnapshot(),
    };
    route.snapshot.params = {};
    await TestBed.configureTestingModule({
      imports: [ProductEditComponent, ProductEditFormComponent],
      providers: [
        provideZoneChangeDetection({
          eventCoalescing: true,
        }),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter(routes),
        { provide: ActivatedRoute, useValue: route },
        provideProductService(),
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ProductEditComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(PRODUCT_SERVICE_TOKEN);
    spyOn(productService, 'verificationById').and.returnValue(of(true));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load product when id is provided', fakeAsync(() => {
    route.snapshot.params = { id: '1' };
    const product: IProduct = {
      id: '1',
      name: 'Test Product',
      description: '',
      logo: '',
      date_release: '',
      date_revision: '',
    };
    const getByIdSpy = spyOn(productService, 'getById').and.returnValue(
      of(product).pipe(delay(0))
    );
    expect(component.product).toBeNull();
    expect(component.loading).toBe(false);

    // Trigger ngOnInit
    fixture.detectChanges();

    expect(component.id).toBe('1');

    expect(getByIdSpy).toHaveBeenCalledWith('1');
    expect(getByIdSpy).toHaveBeenCalledTimes(1);
    expect(component.loading).toBe(true);

    // Wait for resolve observable of service
    tick();
    fixture.detectChanges();

    expect(component.loading).toBe(false);
    expect(component.title).toBe('Formulario de Edición');
  }));

  it('should not load product when id is not provided', fakeAsync(() => {
    route.snapshot.params = {};
    const product: IProduct = {
      id: '1',
      name: 'Test Product',
      description: '',
      logo: '',
      date_release: '',
      date_revision: '',
    };
    const getByIdSpy = spyOn(productService, 'getById').and.returnValue(
      of(product).pipe(delay(0))
    );
    expect(component.product).toBeNull();
    expect(component.loading).toBe(false);

    // Trigger ngOnInit and execute the service call
    fixture.detectChanges();

    expect(getByIdSpy).not.toHaveBeenCalled();
  }));

  it('should handle save product when id is provided', fakeAsync(() => {
    const product: IProduct = {
      id: '1',
      name: 'Test Product',
      description: '',
      logo: '',
      date_release: '',
      date_revision: '',
    };
    component.id = '1';

    const updateSpy = spyOn(productService, 'update').and.returnValue(
      of({
        data: product,
        message: 'Product updated',
      }).pipe(delay(0))
    );

    routerMock.navigate.and.returnValue(
      new Promise((resolve) => {
        resolve(true);
      })
    );

    expect(component.loadingSave).toBe(false);

    component.handleSaveProduct(product);
    expect(updateSpy).toHaveBeenCalledWith(product);
    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(component.loadingSave).toBe(true);

    fixture.detectChanges();

    // Wait for the promise to resolve
    tick();
    expect(routerMock.navigate).toHaveBeenCalledWith([PRODUCTS_PATH]);
    expect(component.loadingSave).toBe(false);
  }));

  it('should handle save product when id is not provided', fakeAsync(async () => {
    const product: IProduct = {
      name: 'Test Product',
      description: '',
      logo: '',
      date_release: '',
      id: '2',
      date_revision: '',
    };

    const createSpy = spyOn(productService, 'create').and.returnValue(
      of({
        data: product,
        message: 'Product created',
      }).pipe(delay(0))
    );

    routerMock.navigate.and.returnValue(
      new Promise((resolve) => {
        resolve(true);
      })
    );

    expect(component.loadingSave).toBe(false);

    component.handleSaveProduct(product);
    expect(createSpy).toHaveBeenCalledWith(product);
    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(component.loadingSave).toBe(true);

    fixture.detectChanges();

    // Wait for the promise to resolve
    tick();
    expect(routerMock.navigate).toHaveBeenCalledWith([PRODUCTS_PATH]);
    expect(component.loadingSave).toBe(false);
  }));
});
