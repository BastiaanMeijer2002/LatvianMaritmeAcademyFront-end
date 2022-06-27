import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import {ActivatedRoute, RouterModule} from "@angular/router";
import { LoginComponent } from './login/login.component';
import { StationComponent } from './station/station.component';
import { MyChartComponent } from './my-chart/my-chart.component';
import { ForgotPswComponent } from './forgot-psw/forgot-psw.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    LoginComponent,
    StationComponent,
    MyChartComponent,
    ForgotPswComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: 'search', component: SearchComponent },
      { path: 'login', component: LoginComponent },
      { path: 'station', component: StationComponent },
      { path: 'my-chart', component: MyChartComponent },
      { path: 'forgot-psw', component: ForgotPswComponent },
      { path: '', component: HomeComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private route: ActivatedRoute,
  ) {}
}

