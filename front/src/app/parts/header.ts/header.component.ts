import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ProductCard } from '../../interfaces/product-model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
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

  localStorageItems: ProductCard[] = []; // array with items from localstorage

  constructor(private _localStorage: LocalStorageService) { }

  ngOnInit(): void {
    //this.item.push(this._localStorage.getLocal('product'));
    setTimeout(()=>{
      let localStorageProduct = this._localStorage.getLocal('product');
      this.item.map((item: ProductCard, index: number) => {
        console.log(item.quantity, '-item quantity');
        console.log(localStorageProduct.quantity, '-localStorageProduct');
        if(item.id === localStorageProduct.id) item.quantity = localStorageProduct.quantity + 1;
        else this.item.push(localStorageProduct)
      })
      //console.log(this.item,localStorageProduct);
    },1000)

  }
  ngOnChanges(changes: SimpleChanges) {
    //console.log(changes)
  }
  ngDoCheck() {
    
  }
 

  get quantity(): number {
    return this.item.reduce((acc, item)=>{
      //console.log(item)
      return +acc + +item.quantity
    },0);
  }

  updateProdState() {
    this.passItemEvent.emit(this.item);
  }


}
