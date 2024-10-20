import { Routes } from '@angular/router';
import { FacturacionComponent } from './feature/pages/facturacion/facturacion.component';

export const routes: Routes = [
  {
    path: 'facturacion', component: FacturacionComponent
  },
  {
    path: '', redirectTo: 'facturacion', pathMatch: 'full'
  }
];
