import { AuthService } from 'src/services/Auth.service';
import { Star } from './../../models/opinion';
import { Trip } from './../../models/trip';
import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
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
    stars: Star[] = [];
    index = 0;
    opinions: Opinion[] = [];
    constructor(private opinionService: OpinionService, private auth: AuthService) {}

    ngOnInit() {
        this.settings = {
            max: 5,
            value: -1
        };
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
            this.opinionService.getStars(this.trip.id).subscribe(data => {
                this.stars = data;
                if (this.stars[0]) {
                    this.star = this.stars[0].star;
                }
                this.totalS.emit(this.getTotalStars());
            });
        }
    }

    addStar() {
        if(!this.trip){
            return;
        }
        const st: Star = {
            author: this.auth.user.uid,
            tripID: this.trip.id,
            star: this.star
        };
        this.opinionService.addStar(st);
        this.stars.push(st);
        this.totalS.emit(this.getTotalStars());
    }

    getTotalStars() {
        const result = this.stars.reduce((a, b) => a + b.star, 0) / this.stars.length;
        return Number.isNaN(result) ? 0 : result;
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
