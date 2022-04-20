import { Component, OnInit, ViewChild, ElementRef,  Input, Output, EventEmitter } from '@angular/core';
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
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.less']
})


export class ProductCardComponent implements OnInit {
  @Input() updatedItems: ProductCard[] = [];
  @Output() newItemEvent = new EventEmitter<any>(); // The name of the @Output()

  quantity: number = 1; // default quantity value
  cartProducts: Array<object> = []; // basket items
 
  products: ProductCard[] = [
    { 
      id: 1,
      name: 'Test1',
      description: 'lorem5 ncjdksnc djsnjsn dsk nds',
      defaultPrice: 150,
      price: 150,
      img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d2ViJTIwZGVzaWdufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      defaultQuantity: 1,
      quantity: 0
    },
     { 
      id: 2,
      name: 'Test2',
      description: 'lorem5 ncjdksnc djsnjsn dsk nds',
      defaultPrice: 170,
      price: 170,
      img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d2ViJTIwZGVzaWdufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      defaultQuantity: 1,
      quantity: 0
    },
     { 
      id: 3,
      name: 'Test3',
      description: 'lorem5 ncjdksnc djsnjsn dsk nds',
      defaultPrice: 220,
      price: 220,
      img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d2ViJTIwZGVzaWdufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      defaultQuantity: 1,
      quantity: 0
    },
     { 
      id: 4,
      name: 'Test4',
      description: 'lorem5 ncjdksnc djsnjsn dsk nds',
      defaultPrice: 340,
      price: 340,
      img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d2ViJTIwZGVzaWdufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      defaultQuantity: 1,
      quantity: 0
    },
     { 
      id: 5,
      name: 'Test5',
      description: 'lorem5 ncjdksnc djsnjsn dsk nds',
      defaultPrice: 100,
      price: 100,
      img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d2ViJTIwZGVzaWdufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      defaultQuantity: 1,
      quantity: 0
    },
     { 
      id: 6,
      name: 'Test6',
      description: 'lorem5 ncjdksnc djsnjsn dsk nds',
      defaultPrice: 90,
      price: 90,
      img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d2ViJTIwZGVzaWdufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      defaultQuantity: 1,
      quantity: 0
    }
  ]
  categories: string[] = []; // for futures categories

  constructor() { }

  ngOnInit(): void {
  }

  productPrice(product: ProductCard ,index: number, event: any) {
    product.quantity = event.target.value; // products quantity
    product.price = this.products[index].defaultPrice * product.quantity; // generate dynamically price per product
    //this.cartProducts.push(product); // add product to the cart
    this.newItemEvent.emit(product); // emit to the parent all product object

    console.log(product)
  }

 
  // add to cart
  addToCart(product: ProductCard, index: number) {  
    +product.quantity++;
    if(product.quantity > 0) product.defaultQuantity = product.quantity; // set default quantity after 
    product.price = this.products[index].defaultPrice * product.quantity;
    this.newItemEvent.emit(product); // emit to the parent all product object
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
