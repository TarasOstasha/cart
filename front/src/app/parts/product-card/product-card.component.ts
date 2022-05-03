import { Component, OnInit, ViewChild, ElementRef,  Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ProductCard } from '../../interfaces/product-model';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { BehaviorSubject, Subscription } from 'rxjs';

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


export class ProductCardComponent implements OnInit, OnDestroy {
  @Input() updatedItems: ProductCard[] = [];
  @Output() newItemEvent = new EventEmitter<any>(); // The name of the @Output()

  quantity: number = 1; // default quantity value
  
 
  products: ProductCard[] = []; // default products on a MAIN PAGE
  categories: string[] = []; // for futures categories

  sub!: Subscription;

  constructor(
    public _api: ApiService,
    private _localStorage: LocalStorageService
    ) { }


  async getAllProducts() {
    const productsFromServer: Promise<any> = this._api.getProducts(); // send request for all products
    const products = await productsFromServer;
    this.products = products.products;
    console.log(products)
  }

  
  ngOnInit(): void {
    this.sub = this._api.selectedProductChanges$.subscribe(selectedProduct => { // update cart product list 
      if(selectedProduct) {
        this._api.cartProducts.push(selectedProduct);
        this._localStorage.setLocal('product', selectedProduct);
        console.log(this._api.cartProducts)
      }
      console.log(this._localStorage.getLocal('product'))
    });
    
    this.getAllProducts();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  productPrice(product: ProductCard ,index: number, event: any) {
    product.quantity = event.target.value; // products quantity
    product.price = this.products[index].defaultPrice * product.quantity; // generate dynamically price per product
    this.newItemEvent.emit(product); // emit to the parent all product object
  }
 
  // add to cart
  addToCart(product: ProductCard, index: number) {  
    // **
      this._api.changeSelectedProduct(product);
    // **
    +product.quantity++;
    if(product.quantity > 0) product.defaultQuantity = product.quantity; // set default quantity after 
    product.price = this.products[index].defaultPrice * product.quantity;
    this.newItemEvent.emit(product); // emit to the parent all product object
    let duplicated = this._api.cartProducts.find(item => item.id === product.id);
    if(duplicated) product.quantity+1 // change quantity if exist product
    else { this._api.cartProducts.push(product); this._localStorage.setLocal('product', product) } // add product to the cart
    //console.log(this._api.cartProducts);
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
