import { Component, OnInit, OnChanges } from '@angular/core';
import { BasketService } from 'src/services/basket.service';
import { Trip } from 'src/models/trip';

@Component({
    selector: 'app-bucketSummary',
    templateUrl: './bucketSummary.component.html',
    styleUrls: ['./bucketSummary.component.scss']
})
export class BucketSummaryComponent implements OnInit, OnChanges {
    products: Trip[];
    constructor(private basketService: BasketService) {}

    ngOnInit() {
      this.products = this.getProcucts();
    }
    ngOnChanges() {
        this.products = this.getProcucts();
    }

    getProcucts(): Trip[] {
        return this.basketService.getProducts();
    }

    getTotalCost() {
        return this.products.reduce((a, b) => a + b.cost * b.capacityUsed, 0);
    }
    getTotalTrips() {
        return this.products.reduce((a, b) => a + b.capacityUsed, 0);
    }
}
