import { Component, OnInit } from '@angular/core';
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
      ).subscribe(result => console.log(result))
    });
    // ***

  }

}
