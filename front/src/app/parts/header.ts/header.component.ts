import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  @Input() item: productCard[] = []; // decorate the property with @Input()
  @Output() passItemEvent = new EventEmitter<any>(); // The name of the @Output()


  constructor() { }

  ngOnInit(): void {
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

}
