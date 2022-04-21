export interface ProductCard {
    id: number;
    name: string;
    description: string;
    defaultPrice: number;
    price: number;
    img: string;
    defaultQuantity: number;
    quantity: number;
    category: Array<number>;
  }