import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { BaseApiService } from '../../../../core/service/base-api.service';
import { NgFor } from '@angular/common';
import { IResult } from '../../../../core/interfaces/IResult';
@Component({
  selector: 'app-facturacion-popup',
  standalone: true,
  imports: [
    MatDialogModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    NgFor
  ],
  templateUrl: './facturacion-popup.component.html',
  styleUrl: './facturacion-popup.component.css'
})
export class FacturacionPopupComponent implements OnInit {

  _MatDialgoRef = inject(MatDialogRef<FacturacionPopupComponent>)
  _fb = inject(FormBuilder)
  sBaseApi = inject(BaseApiService)
  fFacturacion: any;
  aDTETypes: any
  ngOnInit(): void {
    this.buildForm()
    this.getDTETypes();
  }

  onSubmit() {
    if (this.fFacturacion.valid && this.fFacturacion.get('dteDetails')?.value.length > 0) {
      const DTE = {
        dtE_type_id: this.fFacturacion.get('dtE_type_id').value,
        receiver_name: this.fFacturacion.get('receiver_name').value,
        receiver_nit: this.fFacturacion.get('receiver_nit').value,
        currency: this.fFacturacion.get('currency').value,
        dteDetails: this.fFacturacion.get('dteDetails').value
      }
      this.sBaseApi.addItem('DTE', DTE).subscribe((data: IResult<any>) => {
        if (data.isSuccess) {
          this._MatDialgoRef.close(true);
        } else {
          this._MatDialgoRef.close(false)
        }
      })
    }
  }

  buildForm() {
    this.fFacturacion = this._fb.group({
      dtE_type_id: ['', [Validators.required]],
      receiver_name: ['', [Validators.required]],
      receiver_nit: ['', Validators.required],
      currency: ['', Validators.required],
      dteDetails: this._fb.array([]),

      item_type: [null],
      item_quantity: [null],
      item_descripcion: [null],
      unit_price: [null],
      discount: ['0']
    });
  }


  addItemToDTE() {
    const itemArray = this.fFacturacion.get('dteDetails') as FormArray;
    const itemToDTE = this._fb.group({
      item_type: [this.fFacturacion.get('item_type').value, [Validators.required]],
      item_quantity: [this.fFacturacion.get('item_quantity').value, [Validators.required]],
      item_descripcion: [this.fFacturacion.get('item_descripcion').value, [Validators.required]],
      unit_price: [this.fFacturacion.get('unit_price').value, [Validators.required]],
      discount: [this.fFacturacion.get('discount').value, [Validators.required]]
    });
    itemArray.push(itemToDTE);
    this.resetProductForm();
  }

  resetProductForm() {
    this.fFacturacion.patchValue({
      item_type: null,
      item_quantity: null,
      item_descripcion: null,
      item_price: null,
      discount: '0'
    });
  }

  removeItem(i: any) {

  }

  editItem(i: any) {

  }

  getDTETypes() {
    this.sBaseApi.getItems('DTE/types').subscribe((data: any) => {
      this.aDTETypes = data.value
      console.log(this.aDTETypes)
    })
  }
  displayedColumns: string[] = ['item_type', 'item_quantity', 'item_descripcion', 'unit_price', 'discount'];
}
