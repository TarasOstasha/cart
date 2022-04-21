import { Component, OnInit } from '@angular/core';
import { ProductCard } from '../../interfaces/product-model';

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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  items: ProductCard[] = []; // add here prod objects
  updatedItems: ProductCard[] = []; // add here prod objects from header to products

  addToCart(newItem: ProductCard) {
    //console.log(newItem,this.items)
    if (this.items.length === 0) this.items.push(newItem);
    let existItem = this.items.find(item => item.id === newItem.id);
    //console.log(existItem);
    if(existItem) Number(newItem.quantity)+1
    else this.items.push(newItem)
    //console.log(this.items);
  }

  updateProdState1(newItem: ProductCard) {
    this.updatedItems.push(newItem);
    console.log(newItem);
  }



}
