import { Component, OnInit, ViewChild, ElementRef,  Input, Output, EventEmitter } from '@angular/core';
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
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.less']
})


export class ProductCardComponent implements OnInit {
  @Input() updatedItems: ProductCard[] = [];
  @Output() newItemEvent = new EventEmitter<any>(); // The name of the @Output()

  quantity: number = 1; // default quantity value
  cartProducts: Array<ProductCard> = []; // basket items
 
  products: ProductCard[] = []; // default products on a MAIN PAGE
  categories: string[] = []; // for futures categories

  constructor(public _api: ApiService) { }

  async getAllProducts() {
    const productsFromServer: Promise<any> = this._api.getProducts(); // send request for all products
    const products = await productsFromServer;
    this.products = products.products;
    console.log(products)
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  productPrice(product: ProductCard ,index: number, event: any) {
    product.quantity = event.target.value; // products quantity
    product.price = this.products[index].defaultPrice * product.quantity; // generate dynamically price per product
    this.newItemEvent.emit(product); // emit to the parent all product object
  }

 
  // add to cart
  addToCart(product: ProductCard, index: number) {  
    +product.quantity++;
    if(product.quantity > 0) product.defaultQuantity = product.quantity; // set default quantity after 
    product.price = this.products[index].defaultPrice * product.quantity;
    this.newItemEvent.emit(product); // emit to the parent all product object
    let duplicated = this.cartProducts.find(item => item.id === product.id);
    if(duplicated) product.quantity+1 // change quantity if exist product
    else this.cartProducts.push(product); // add product to the cart
    console.log(this.cartProducts);
  }

  // quick view
  quickViewFlag: boolean = false;
  quickViewProd: any = {}; //productCard[] = [];
  quickView(product: ProductCard) {
    this.quickViewFlag = true;
    this.quickViewProd = product;
    //this.quickViewProd.push(product);
    //const found = this.quickViewProd.find(item => item.id === product.id);
    //if(found) !this.quickViewFlag

    console.log(this.quickViewProd, 'works')
  }

}
