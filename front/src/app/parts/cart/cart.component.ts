import { Component, OnInit } from '@angular/core';
import { ProductCard } from '../../interfaces/product-model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less']
})
export class CartComponent implements OnInit {
  products: ProductCard[] = [];
  items: ProductCard[] = this.products; // set to the header quantity of products via @input in header
  total: number = 0;
  shippingPrice: number = 50;
  constructor() { }

  ngOnInit(): void {
    let product: any = localStorage.getItem('product');
    this.products.push(JSON.parse(product));
    console.log(this.totalPrice)
  }

  get totalPrice() {
    return this.products.reduce((acc, item: any) => {
      return (acc + item.price) * item.quantity
    },0)
  }

  get productTax() {
    return this.totalPrice * 0.05;
  }

  get grandSubTotal() {
    return this.totalPrice + this.productTax + this.shippingPrice;
  }

  productPrice(product: ProductCard ,index: number, event: any) {
    product.quantity = event.target.value; // products quantity
    //product.price = this.products[index].defaultPrice * product.quantity; // generate dynamically price per product
    //this.newItemEvent.emit(product); // emit to the parent all product object

    console.log(this.totalPrice)
  }

}
