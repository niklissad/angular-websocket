import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import {Order} from '../order';
import {SocketService} from '../../core/services/socket.service';
import {DbService} from '../../core/services/db.service';
import {Subscription} from 'rxjs';
import {OrderEditComponent} from '../order-edit/order-edit.component';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit, OnDestroy {

    public ordersSource = new MatTableDataSource();

    public displayedColumns = ['orderId', 'driverPhone', 'passPhone', 'rating', 'actions'];

    private connection: Subscription;

    constructor(private router: Router,
                private socket: SocketService,
                public db: DbService,
                public dialog: MatDialog) {
    }

    closeOrder(order) {
        this.db.changeStatus(order);
        this.updateData();
    }

    updateData() {
        this.ordersSource.data = this.db.getOrders();
    }

    editOrder(order) {

        const dialogRef = this.dialog.open(OrderEditComponent, {
            height: '300px',
            width: '600px',
            data: Object.assign({}, order)
        });

        dialogRef.afterClosed()
          .pipe(filter(o => !!o))
          .subscribe(editedOrder => {
            this.db.setRate(order, editedOrder.rating);
            this.updateData();
        });

    }

    ngOnInit() {

        this.updateData();

        this.connection = this.socket.on('new-order').subscribe((data: Order) => {
            // prevent memory leak on a client
            if (this.db.length > 1000) {
                this.db.removeLast();
            }

            this.db.addOrder(Object.assign(data, {status: Order.STATUS_ACTIVE}));
            this.ordersSource.data = this.db.getOrders();
        });

    }

    ngOnDestroy() {
        this.connection.unsubscribe();
    }


}
