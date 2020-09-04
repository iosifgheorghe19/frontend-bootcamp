import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/product';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {FavoriteService} from './favorite.service';
import {CartService} from './cart.service';

const serviceHostUrl = 'http://localhost:3000';

export abstract class ProductsService {
  public abstract loadProducts(): Observable<Array<Product>>;
}


@Injectable()
export class ProductsServiceImpl extends ProductsService {

  hostUrl = serviceHostUrl;

  constructor(private httpClient: HttpClient, private favoriteService: FavoriteService, private cartService: CartService) {
    super();
  }

  public loadProducts(): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(`${this.hostUrl}/products`);
  }
}

@Injectable()
export class ProductsServiceLogger extends ProductsService {

  hostUrl = serviceHostUrl;

  constructor(private httpClient: HttpClient, private favoriteService: FavoriteService, private cartService: CartService) {
    super();
  }

  loadProducts(): Observable<Array<Product>> {
    this.favoriteService.getSomething();
    console.log('Calling products endpoint');
    return this.httpClient.get<Array<Product>>(`${this.hostUrl}/products`).pipe(
      tap(response => {
        console.log('Products successfully called ');
        console.log(response);
      })
    );
  }

}



