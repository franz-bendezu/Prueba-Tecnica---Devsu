import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IProduct } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ProductEditFormComponent } from '../../components/product-edit-form/product-edit-form.component';
import { catchError, finalize } from 'rxjs';
import { PARAM_NEW, PRODUCTS_PATH } from '../../constants/routes.contants';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, ProductEditFormComponent],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css',
})
export class ProductEditComponent implements OnInit {
  title: string;
  id?: string;
  product: IProduct | null = null;
  errorSave = '';
  loadingSave = false;
  loading = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.title = 'Formulario de Registro';
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
    this.errorSave = '';
    this.productService
      .getById(id)
      .pipe<IProduct>(
        finalize(() => {
          this.loading = false;
        })
      )
      .pipe<IProduct>(
        catchError((err) => {
          this.errorSave = 'Error al cargar el producto';
          throw err;
        })
      )
      .subscribe((product) => (this.product = product));
  }

  handleSaveProduct(product: IProduct): void {
    this.loadingSave = true;
    const productSave$ = this.id
      ? this.productService.update(product)
      : this.productService.create(product);

    productSave$.subscribe({
      error: (err) => {
        this.loading = false;
        this.errorSave = err;
      },
      complete: () => {
        this.loadingSave = false;
        this.router.navigate([PRODUCTS_PATH]);
      },
    });
  }
}
