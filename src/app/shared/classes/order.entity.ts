import {ItemEntity, MarkEntity, ProductEntity, SubCategoryEntity} from './product.entity';
import {User} from '../models/user';
import {Product} from './product';
import {Order} from './order';

export class OrderEntity {
    productOrder: ProductOrderEntity[];
    id: number;
    totalAmount: number;
    user: User;
    created: Date;

    static fromOrder(product: ProductEntity[], user: User) {
        const result = product.reduce((accumulator, obj) => {
            return accumulator + obj.price;
        }, 0);
        const dto = new OrderEntity();
        dto.totalAmount = result;
        dto.user = user;
        // dto.panier = this.fromProduct(order.product, this.user);
        dto.productOrder = this.fromProduct(dto, product);
        // dto.created = created;
        return dto;
    }

    static fromProduct( order: OrderEntity, productEntity: ProductEntity[]) {
        let pos : ProductOrderEntity[] = new Array();
        const unique = [...new Set(productEntity.map(item => item.id))];
        console.log('unique :' + unique);
        for(let i = 0; i < unique.length; i++) {
            const dto = new ProductOrderEntity();
            dto.product = productEntity.find(x => x.id === unique[i]);
            // dto.order = order;
            dto.price = productEntity[i].price;
            dto.nbProd = productEntity.filter((v) => (v.id === unique[i])).length;
            pos.push(dto);
        }
        // dto.product = orderEntity.id;
        console.log('pos:' + pos);
        return pos;
    }
     getOccurrence(array, value) {
        return ;
    }
}


export class ProductOrderEntity {
    id: number;
    price: number;
    nbProd : number;
    productOrderPk : ProductOrderPk;
    product: ProductEntity;
}
export class ProductOrderPk {
    productId: number;
    orderId: number;
}
