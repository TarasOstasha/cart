import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

export interface productCard {
  id: number;
  name: string;
  description: string;
  defaultPrice: number;
  price: number;
  img: string;
  defaultQuantity: number;
  quantity: number;
}

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.less']
})
export class ProductPageComponent implements OnInit {
  
  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this._route.snapshot.paramMap.get('id'); // get link
      console.log(id)
    this._route.queryParams.subscribe((params) => { // get params
      console.log(params.id) // HERE MAKE REQUEST TO THE DATA BASE AND FETCH PRODUCT WITH THE SAME ID
    });
  }

}
