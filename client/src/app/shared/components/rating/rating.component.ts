import {Component, OnInit, Input, forwardRef, HostBinding} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RatingComponent),
            multi: true
        }
    ],
})
export class RatingComponent implements OnInit, ControlValueAccessor {

    @HostBinding('class.editable') @Input() editable = true;

    @Input() rate = 0;

    rating = Array(5).fill(0).map((x, i) =>
        ({
            id: i,
            active: false
        })
    );

    constructor() {
    }

    private propagateChange = (_: any) => {
    };

    writeValue(rate) {
        if (rate) {
            this.rate = rate;
            this.rating.forEach((x, i) => {
                    x.active = i < rate;
                }
            );
        }
        this.propagateChange(rate);
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched() {
    }

    setRate(rate) {
        if (this.editable && this.rate !== rate) {
            this.writeValue(rate);
        }
    }

    ngOnInit() {
    }

}
