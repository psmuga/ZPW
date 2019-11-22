import { DetailTripComponent } from './detailTrip/detailTrip.component';
import { TripsComponent } from './trips/trips.component';
import { BucketComponent } from './bucket/bucket.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'basket', component: BucketComponent },
  { path: 'home', component: TripsComponent },
  { path: 'detail/:id', component: DetailTripComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: TripsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
