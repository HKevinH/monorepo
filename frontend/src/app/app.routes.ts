import { Routes } from '@angular/router';
import { UserTableComponent } from './components/user-table/user-table.component';
import { PurchaseCardsComponent } from './components/purchase-cards/purchase-cards.component';

export const routes: Routes = [
  { path: '', component: UserTableComponent },
  { path: 'users/:id', component: PurchaseCardsComponent },
];
