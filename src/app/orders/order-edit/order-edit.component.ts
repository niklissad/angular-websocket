import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-order-edit',
    templateUrl: './order-edit.component.html',
    styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public order: any) {
    }

    ngOnInit() {
    }

}
