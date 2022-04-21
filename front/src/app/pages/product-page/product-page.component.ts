import { Component, OnInit, Output,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, from, pipe } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ProductCard } from '../../interfaces/product-model';
import { ApiService } from 'src/app/services/api.service';


// export interface productCard {
//   id: number;
//   name: string;
//   description: string;
//   defaultPrice: number;
//   price: number;
//   img: string;
//   defaultQuantity: number;
//   quantity: number;
// }

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.less']
})
export class ProductPageComponent implements OnInit {
  products: ProductCard[] = []; // default products array when you click add product
  items: ProductCard[] = this.productCart; // set to the header quantity of products via @input in header

  constructor(private _route: ActivatedRoute, private _api: ApiService) { }


  ngOnInit(): void {
    // *** 1 method how to use query params
    //let id = this._route.snapshot.paramMap.get('id'); // get link
    // this._api.getProduct(id) // get single clicked product
    //   .pipe(
    //     map(result => result)
    //   ).subscribe(result => console.log(result))
    // ***

    // *** 2 method how to use query params
    this._route.queryParams.subscribe((params) => { // get params
      console.log(params.id)
      this._api.getProduct(params.id) // get single clicked product
        .pipe(
          map(result => result)
        ).subscribe((result: any) => this.productCart = result.result)
    });
    // ***

  }

  addToCart() {
    //console.log('works', this.items);
    this.productCart.map((item: any) => {
      item.quantity++;
      this.localStorageSetItem = JSON.stringify(item); // set to the localstorage
      //console.log(item)
    });


  }

  set productCart(product: any) { // setter use in line 47
    this.products.push(product);
  }

  get productCart() { // get array of products
    return this.products;
  }

  set localStorageSetItem(product: any) { // set function localstorage
    localStorage.setItem('product', product)
  }

}
