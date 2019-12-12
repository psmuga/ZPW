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
        //const result = this.stars.reduce((a, b) => a + b.star, 0) / this.stars.length;
        //return Number.isNaN(result) ? 0 : result;
        return 0;
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
}
