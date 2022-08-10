import {Images, MarkDto, Product, SubCategoryDto, Variants} from './product';
import {User} from '../models/user';
import {ProductEntity} from './product.entity';
import {OrderEntity} from './order.entity';

// Order
export class Order {
    shippingDetails?: any;
    product?: Product;
    orderId?: any;
    totalAmount?: any;


}
