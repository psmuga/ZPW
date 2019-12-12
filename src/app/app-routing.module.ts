import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { DetailTripComponent } from './detailTrip/detailTrip.component';
import { TripsComponent } from './trips/trips.component';
import { BucketComponent } from './bucket/bucket.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
    { path: 'basket', component: BucketComponent, canActivate: [AuthGuard] },
    { path: 'home', component: TripsComponent, canActivate: [AuthGuard] },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
    { path: 'detail/:id', component: DetailTripComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', component: LoginComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
