import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IProduct } from '../../interfaces/product.interface';
import {
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  DESCRIPTION_MIN_LENGTH,
  DESCRIPTION_MAX_LENGTH,
  ID_MIN_LENGTH,
  ID_MAX_LENGTH,
} from '../../constants/validation.constant';
import { maxLength, minLength, required } from '../../common/custom.validators';
import { FormErrorDisplayComponent } from '../form-error-display/form-error-display.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-product-edit-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormErrorDisplayComponent,
    ButtonComponent,
  ],
  templateUrl: './product-edit-form.component.html',
  styleUrl: './product-edit-form.component.css',
})
export class ProductEditFormComponent implements OnChanges {
  @Input()
  title = '';
  @Input()
  product?: IProduct | null = null;
  @Input()
  loading = false;
  @Input()
  loadingSave = false;

  @Output() save = new EventEmitter<IProduct>();

  productForm = new FormGroup({
    id: new FormControl('', {
      nonNullable: true,
      validators: [
        required('Id inválido'),
        minLength(
          ID_MIN_LENGTH,
          `El id debe tener un mínimo de ${ID_MIN_LENGTH} caracteres`
        ),
        maxLength(
          ID_MAX_LENGTH,
          `El id debe tener un máximo de ${ID_MAX_LENGTH} caracteres`
        ),
      ],
    }),
    name: new FormControl('', {
      nonNullable: true,
      validators: [
        required(),
        minLength(
          NAME_MIN_LENGTH,
          `El nombre debe tener un mínimo de ${NAME_MIN_LENGTH} caracteres`
        ),
        maxLength(
          NAME_MAX_LENGTH,
          `El nombre debe tener un máximo de ${NAME_MAX_LENGTH} caracteres`
        ),
      ],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [
        required(),
        minLength(
          DESCRIPTION_MIN_LENGTH,
          `La descripción debe tener un mínimo de ${DESCRIPTION_MIN_LENGTH} caracteres`
        ),
        maxLength(
          DESCRIPTION_MAX_LENGTH,
          `La descripción debe tener un máximo de ${DESCRIPTION_MAX_LENGTH} caracteres`
        ),
      ],
    }),
    logo: new FormControl('', {
      nonNullable: true,
      validators: [required()],
    }),
    date_release: new FormControl('', {
      nonNullable: true,
      validators: [required()],
    }),
    date_revision: new FormControl('', {
      nonNullable: true,
      validators: [required()],
    }),
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']) {
      this.updateForm();
    }
  }

  updateForm(): void {
    if (this.product) {
      this.productForm.patchValue(this.product);
      this.productForm.controls.id.disable();
    } else {
      this.productForm.controls.id.enable();
    }
  }

  onSubmitForm(): void {
    this.save.emit(this.productForm.getRawValue());
  }

  onResetForm(): void {
    this.productForm.reset(this.product ? this.product : {});
  }
}
