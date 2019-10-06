import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Web3Service } from '../Services/web3/web3.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private web3service: Web3Service , private route:Router) {}
  canActivate(): Observable<boolean> {
    return this.web3service.Web3Details$.pipe(
      map(
        (n): boolean => {
          if (n.account) {
            return true;
          }
          this.route.navigateByUrl('/Home')
        }
      )
    );
  }
}
