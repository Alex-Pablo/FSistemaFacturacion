import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BaseApiService } from '../../../core/service/base-api.service';
import { MatDialogModule, MatDialog } from '@angular/material/dialog'
import { FacturacionPopupComponent } from '../../components/modals/facturacion-popup/facturacion-popup.component';
import { IResult } from '../../../core/interfaces/IResult';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-facturacion',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    DatePipe,
  ],
  templateUrl: './facturacion.component.html',
  styleUrl: './facturacion.component.css'
})
export class FacturacionComponent implements OnInit {
  sBaseApi = inject(BaseApiService);
  dataSource = new MatTableDataSource();
  aDTETypes: any;
  startDate: Date | null = null;
  endDate: Date | null = null;
  numberDTE: string | null = null;

  constructor(private _matDialog: MatDialog) { }
  ngOnInit(): void {
    this.getDTEs();
  }

  createDTE() {
    this._matDialog.open(FacturacionPopupComponent, {
      width: '85vw',
      maxWidth: '85vw',
      disableClose: true,
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.getDTEs();
      }
    });
  }

  resetDTE() {
    this.startDate = null;
    this.endDate = null;
    this.numberDTE = null;
    this.getDTEs();
  }

  searchDTE() {
    this.sBaseApi.filter('DTE', this.numberDTE, this.startDate, this.endDate).subscribe((data: IResult<any>) => {
      this.dataSource = data.value;
    })
  }

  getDTEs() {
    this.sBaseApi.getItems('DTE').subscribe((data: any) => {
      this.dataSource = data.value
    })
  }

  displayedColumns: string[] = ['dtE_number', 'dtE_date', 'issuer_name', 'receiver_name', 'receiver_nit', 'total_amount'];
}
