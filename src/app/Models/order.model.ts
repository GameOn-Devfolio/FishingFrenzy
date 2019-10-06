
export interface OrderModel {
    orderid: number;
    fish: string;
    rarity: string;
    weight: number;
    price: number;
    seller: string;
    ownerFishPosition: number;
    isFilled: boolean;
  }