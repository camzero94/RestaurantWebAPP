import Item from './Item';

namespace Order{
  export interface Description {
    orderId: number,
    token: string,
    tax: number,
    subtotal: number,
    total: number,
    email: string,
    globalDiscount: number,
    content?: string, 
    delivered?: boolean,
    createdAtTime?: Date,
    updatedAtTime?: Date,
    items: Item.Description[],
  }


}

export default Order;
