import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductCard } from '../interfaces/product-model';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

interface ProductResults{
  message: string;
  products: Array<object>

}

if(location.hostname == 'localhost') var url = 'http://localhost/'; //dev
else var url = '/'; //production

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //selectedProductSource = new Subject<ProductCard | null>(); // set subject
  selectedProductSource = new BehaviorSubject<ProductCard | null>(null); // set BehaviorSubject
  selectedProductChanges$ = this.selectedProductSource.asObservable(); // set as observable

  cartProducts: Array<ProductCard> = []; // basket items

  changeSelectedProduct(selectedProduct: ProductCard | null): void {
    this.selectedProductSource.next(selectedProduct);
  }

  constructor(private _http: HttpClient) { }

  getProducts(): Promise<ProductResults> { // get all products from the server
    return this._http.get<ProductResults>(url + 'products').toPromise();
  }

  getProduct(id: any) {
    console.log(id)
    return this._http.get( url + `product/${id}` );
  }

}
