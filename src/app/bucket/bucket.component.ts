import { Trip } from 'src/models/trip';
import { BasketService } from './../../services/basket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.scss']
})
export class BucketComponent implements OnInit {
  products: Trip[];
  constructor(private basketService: BasketService) {}

  ngOnInit() {
    this.products = this.getProcucts();
  }
  getProcucts(): Trip[] {
    return this.basketService.getProducts();
  }
  resign(id) {
    this.basketService.deleteProduct(id);
    this.getProcucts()
  }
  getTotalcost() {
    return this.products.reduce((a,b)=> a+ b.cost,0);
  }
}
