import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductCard } from '../interfaces/product-model';

if(location.hostname == 'localhost') var url = 'http://localhost/'; //dev
else var url = '/'; //production

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  getProduct(id: any) {
    console.log(id)
    return this._http.get( url + `product/${id}` );
  }

}
