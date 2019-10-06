import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { MainNavComponent } from './Components/other/main-nav/main-nav.component';
import { AboutComponent } from './Components/home/about/about.component';
import { PlayGroundComponent } from './Components/game/harbour/play-ground/play-ground.component';
import { StoreComponent } from './Components/game/harbour/store/store.component';
import { MarketComponent } from './Components/game/harbour/market/market.component';
import { BackgroundAnimationComponent } from './Components/other/background-animation/background-animation.component';
import { HeaderComponent } from './Components/game/harbour/header/header.component';
import { HomeRouteComponent } from './Components/home/home-route/home-route.component';
import { HarbourComponent } from './Components/game/harbour/harbour.component';
import { GameComponent } from './Components/game/game.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './Modules/material/material.module';
import { Web3Service } from './Services/web3/web3.service';
import { AuthGuard } from './Guards/auth.guard';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    AboutComponent,
    PlayGroundComponent,
    StoreComponent,
    MarketComponent,
    BackgroundAnimationComponent,
    HeaderComponent,
    HomeRouteComponent,
    HarbourComponent,
    GameComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, MaterialModule],
  providers: [Web3Service, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
