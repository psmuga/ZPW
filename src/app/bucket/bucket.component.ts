import { TripsService } from './../../services/trips-service.service';
import { Trip } from 'src/models/trip';
import { BasketService } from './../../services/basket.service';
import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class BucketComponent implements OnInit {
  products: Trip[];
  displayedColumns: string[] = ['name', 'price', 'country', 'amount'];
  expandedElement: Trip | null;
  constructor(
    private basketService: BasketService,
    private tripsService: TripsService
  ) {}

  ngOnInit() {
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
  }

  getTotalcost() {
    return this.products.reduce((a, b) => a + b.cost * b.capacityUsed, 0);
  }
  getTotalTrips() {
    return this.products.reduce((a, b) => a + b.capacityUsed, 0);
  }
}
