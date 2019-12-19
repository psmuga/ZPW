import { AuthService } from './../../services/Auth.service';
import { OrdersService, Order } from './../../services/orders.service';
import { TripsService } from './../../services/trips-service.service';
import { Trip } from 'src/models/trip';
import { BasketService } from './../../services/basket.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-bucket',
    templateUrl: './bucket.component.html',
    styleUrls: ['./bucket.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
        ])
    ]
})
export class BucketComponent implements OnInit, OnChanges {
    products: Trip[];
    displayedColumns: string[] = ['name', 'price', 'country', 'amount'];
    expandedElement: Trip | null;
    constructor(
        private basketService: BasketService,
        private tripsService: TripsService,
        private snackBar: MatSnackBar,
        private ordersService: OrdersService,
        private auth: AuthService
    ) {}

    ngOnInit() {
        this.products = this.getProcucts();
    }
    ngOnChanges() {
        this.products = this.getProcucts();
    }

    getProcucts(): Trip[] {
        return this.basketService.getProducts();
    }
    resign(product: Trip) {
        this.basketService.deleteProduct(product.id);
        product.capacityUsed = 0;
        this.tripsService.updateTrip(product);
        this.products = this.products.filter(item => item !== product);
    }
    removeOne(product: Trip) {
        product.capacityUsed--;
        if (product.capacityUsed === 0) {
            this.resign(product);
        } else {
            this.tripsService.updateTrip(product);
        }
    }
    addOne(product: Trip) {
        product.capacityUsed++;
        this.tripsService.updateTrip(product);
        this.snackBar.open('Added 1 more product!', 'OK', { duration: 2000 });
    }

    getTotalcost() {
        return this.products.reduce((a, b) => a + b.cost * b.capacityUsed, 0);
    }
    getTotalTrips() {
        return this.products.reduce((a, b) => a + b.capacityUsed, 0);
    }

    buy() {
        this.products.forEach(product => {
            product.capacity = product.capacity - product.capacityUsed;
            product.capacityUsed = 0;
            this.tripsService.updateTrip(product);
            const order: Order = {
                tripID: product.id,
                userID: this.auth.user.uid
            };
            this.ordersService.addOrder(order);
        });
        this.basketService.clear();
        this.snackBar.open('You rock!', 'OK', { duration: 2000 });
    }

    clear() {
        this.products.forEach(product => {
            this.resign(product);
            product.capacityUsed = 0;
            this.tripsService.updateTrip(product);
        });
        this.basketService.clear();
    }
}
