import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  @Input() item: ProductCard[] = []; // decorate the property with @Input()
  @Output() passItemEvent = new EventEmitter<any>(); // The name of the @Output()


  constructor() { }

  ngOnInit(): void {
    //this.total()
    let locst:any = this.itemFromLocalStorage;
    console.log(locst.id)
    setTimeout(() => {
      console.log(this.countTotal, this.item)
    }, 2000);
  }

  get countTotal() {
    //console.log(this.item)
    return this.item.reduce((acc, item)=>{
      return acc + +item.quantity
    },0);
  }

  updateProdState() {
    this.passItemEvent.emit(this.item);
  }

  get itemFromLocalStorage() {
    return localStorage.getItem('product');
  }

  // total() {
  //   if( this.countTotal == null || this.countTotal == 0 ) this.itemFromLocalStorage
  //   else this.countTotal + +this.itemFromLocalStorage.id
  // }

}
