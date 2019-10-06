import { Component, OnInit, DoCheck, Input } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Web3Service } from 'src/app/Services/web3/web3.service';
import { Router } from "@angular/router";

@Component({
  selector: "app-main-nav",
  templateUrl: "./main-nav.component.html",
  styleUrls: ["./main-nav.component.scss"]
})
export class MainNavComponent {
  @Input()
  ContentType: number;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.XSmall)
    .pipe(map(result => result.matches));

    constructor(
      private web3service: Web3Service,
    private breakpointObserver: BreakpointObserver,
    private route: Router
  ) {}

  logOut = async () => {
    this.web3service.web3logout();
    this.route.navigateByUrl('/Home');
  }
}
