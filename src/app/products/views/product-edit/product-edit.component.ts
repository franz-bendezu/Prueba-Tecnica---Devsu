import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IProduct } from '../../interfaces/product.interface';
import { IProductService } from '../../services/product.service.interface';
import { PRODUCT_SERVICE_TOKEN } from '../../services/product.service.token';
import { CommonModule } from '@angular/common';
import { ProductEditFormComponent } from '../../components/product-edit-form/product-edit-form.component';
import {
  PARAM_NEW,
  PRODUCTS_PATH,
} from '../../../shared/constants/routes.contants';
import { CodeValidator } from '../../../shared/validators/custom.validators';
import { AlertComponent } from '../../../shared/components/alert/alert.component';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, ProductEditFormComponent, AlertComponent],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css',
})
export class ProductEditComponent implements OnInit {
  title: string;
  id?: string;
  product: IProduct | null = null;
  errorSave:Error | null = null;
  loadingSave = false;
  loading = false;
  error: Error | null = null;
  codeValidator: CodeValidator;

  constructor(
    @Inject(PRODUCT_SERVICE_TOKEN) private productService: IProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.title = 'Formulario de Registro';
    this.codeValidator = (code: string) =>
      this.productService.verificationById(code);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id && id !== PARAM_NEW) {
      this.id = id;
      this.title = 'Formulario de Edición';
      this.getProduct(id);
    }
  }

  getProduct(id: string): void {
    this.loading = true;
    this.errorSave = null
    this.productService.getById(id).subscribe({
      next: (product) => {
        this.product = product;
        this.loading = false;
      },
      error: (err) => {
        this.error = err;
        this.loading = false;
      },
    });
  }

  handleSaveProduct(product: IProduct): void {
    this.loadingSave = true;
    const productSave$ = this.id
      ? this.productService.update(product)
      : this.productService.create(product);

    productSave$.subscribe({
      error: (err) => {
        this.loadingSave = false;
        this.errorSave = err;
      },
      complete: () => {
        this.loadingSave = false;
        this.router.navigate([PRODUCTS_PATH]);
      },
    });
  }
}
