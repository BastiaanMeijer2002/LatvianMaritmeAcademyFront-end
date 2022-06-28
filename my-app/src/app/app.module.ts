import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import {ActivatedRoute, RouterModule} from "@angular/router";
import { LoginComponent } from './login/login.component';
import { StationComponent } from './station/station.component';
import { MyChartComponent } from './my-chart/my-chart.component';
import { ForgotPswComponent } from './forgot-psw/forgot-psw.component';
import { HomeComponent } from './home/home.component';
import { StatisticsComponent } from './statistics/statistics.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {StatisticsService} from "./statistics.service";


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    LoginComponent,
    StationComponent,
    MyChartComponent,
    ForgotPswComponent,
    HomeComponent,
    StatisticsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule.forRoot([
          {path: 'search', component: SearchComponent},
          {path: 'login', component: LoginComponent},
          {path: 'station', component: StationComponent},
          {path: 'my-chart', component: MyChartComponent},
          {path: 'forgot-psw', component: ForgotPswComponent},
          {path: '', component: HomeComponent},
          {path: 'statistics', component: StatisticsComponent}
        ]),
        FormsModule,
        HttpClientModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: environment.production,
          // Register the ServiceWorker as soon as the application is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        })
    ],
  providers: [StatisticsService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private route: ActivatedRoute,
  ) {}
}

