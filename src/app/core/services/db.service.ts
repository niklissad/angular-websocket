import { Injectable } from '@angular/core';
import {Order} from '../../orders/order';

@Injectable({
  providedIn: 'root'
})
export class DbService {

    private orders = new Map([]);

    constructor() { }

    get length() {
        return this.orders.size;
    }

    getOrders() {
        return Array.from(this.orders.values())
            .reverse()
            .filter( (o: Order) => o.status === Order.STATUS_ACTIVE)
            .slice(0, 10);
    }

    setRate(order: Order, rating: number) {
        order.rating = rating;
        this.orders.set(order.orderId, order);
    }

    changeStatus(order: Order) {
        order.status = Order.STATUS_COMPLETED;
        this.orders.set(order.orderId, order);
    }

    removeLast() {
        this.orders.delete(this.orders.values().next().value);
    }

    addOrder(order: Order) {
        order = Object.assign(order, {status: Order.STATUS_ACTIVE});
        this.orders.set(order.orderId, order);
    }

}
