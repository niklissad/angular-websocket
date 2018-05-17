import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";

import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';

import {OrdersRoutingModule} from './orders-routing.module';

import {OrderListComponent} from './order-list/order-list.component';
import {OrderEditComponent} from './order-edit/order-edit.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        OrdersRoutingModule,
        SharedModule,
        FormsModule,

        MatTableModule,
        MatButtonModule,
        MatDialogModule,
        MatToolbarModule,
        MatListModule
    ],
    declarations: [
        OrderListComponent,
        OrderEditComponent
    ]
})
export class OrdersModule {
}
