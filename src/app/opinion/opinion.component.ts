import { OrdersService, Order } from './../../services/orders.service';
import { AuthService } from 'src/services/Auth.service';
import { Star } from './../../models/opinion';
import { Trip } from './../../models/trip';
import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { OpinionConfig, Opinion } from 'src/models/opinion';
import { OpinionService } from 'src/services/Opinion.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-opinion',
    templateUrl: './opinion.component.html',
    styleUrls: ['./opinion.component.scss']
})
export class OpinionComponent implements OnInit, OnChanges {
    settings: OpinionConfig;
    @Input() trip: Trip;
    @Output() totalS = new EventEmitter<number>();
    opinionForm = new FormGroup({
        coment: new FormControl('', Validators.required)
    });
    star = 0;
    index = 0;
    opinions: Opinion[] = [];
    isAdmin = false;
    order: Order;
    constructor(private opinionService: OpinionService, private auth: AuthService, private orderService: OrdersService) {}

    ngOnInit() {
        this.settings = {
            max: 5,
            value: -1
        };
        this.auth.isAdmin().then(x => {
            this.isAdmin = x;
        });
    }
    ngOnChanges() {
        this.getOpinions();
        this.getStars();
        this.getTotalStars();
    }

    getOpinions() {
        if (this.trip) {
            this.opinionService.getOpinions(this.trip.id).subscribe(data => {
                this.opinions = data || [];
            });
        }
    }
    getStars() {
        if (this.trip) {
            this.orderService.getOrders(this.auth.user.uid, this.trip.id).subscribe(data => {
                this.order = data[0];
                if (data[0] && data[0].star) {
                    this.star = this.order.star;
                }
            });
        }
    }

    addStar() {
        if (!this.trip) {
            return;
        }
        this.order.star = this.star;
        this.orderService.updateOrder(this.order);
        this.totalS.emit(0);
    }

    getTotalStars() {
        this.orderService.getAllOrders(this.trip.id).subscribe(data => {
            let result = 0;
            let amount = 0;
            for (const index in data) {
                if (data[index].star) {
                    result += data[index].star;
                    amount += 1;
                }
            }
            result = result / amount;
            console.log(result);
            this.totalS.emit(Number.isNaN(result) ? 0 : result);
        });
    }

    onCreateComment() {
        const opinion: Opinion = {
            author: this.auth.user.displayName || 'anonymous',
            time: new Date(),
            comment: this.opinionForm.value.coment,
            tripID: this.trip.id
        };
        this.opinionService.addOpinion(opinion);
        this.opinions.push(opinion);
        this.opinionForm.reset();
    }

    delete(item) {
        this.opinionService.deleteOpinion(item);
    }

    canComment(): boolean {
        if (this.order === undefined || this.order.comment !== undefined) {
            return false;
        }
        return this.opinionForm.valid;
    }
}
