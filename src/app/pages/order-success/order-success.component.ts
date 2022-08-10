import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../shared/services/order.service';
import {HttpResponse} from '@angular/common/http';
import {Order} from '../../shared/classes/order';
import {User} from '../../shared/models/user';
import {OrderEntity} from '../../shared/classes/order.entity';
import {Product} from '../../shared/classes/product';
import {ProductEntity} from '../../shared/classes/product.entity';
import {Router} from '@angular/router';
import {ProductService} from '../../shared/services/product.service';
import {of} from 'rxjs';

const state = {
  checkoutItems: JSON.parse(localStorage.checkoutItems || '[]')
};
@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit {
  private id: number;
  // tslint:disable-next-line:variable-name
  public order_list: Order[];
  public order : Order = {};
  constructor(private orderService : OrderService, private router : Router) { }

  ngOnInit() : void {
    this.readOrders();
  }

  readOrder(orderEntity: OrderEntity) {
    console.log(orderEntity);
    let productsEntity : ProductEntity[] = JSON.parse(localStorage.getItem('productsEntity'));
    let product : Product[] = new Array();
    for (let i=0; i < orderEntity.productOrder.length; i++ ){
      console.log(orderEntity.productOrder[i].productOrderPk);
      let productEntity = productsEntity.find(x => x.id === orderEntity.productOrder[i].productOrderPk.productId);
      product.push(Product.fromProductEntityWithQuantity(productEntity, orderEntity.productOrder[i].nbProd));
    }
    const currentUser : User = JSON.parse(localStorage.getItem('currentUser'));
    const item = {
        product,
        orderId : orderEntity.id,
        totalAmount: orderEntity.totalAmount,
        orderDate : orderEntity.created,
    shippingDetails :{
      phone: currentUser.phone,
        address: currentUser.adresse,
    },
      detail: true,
      };
    this.orderService.rihem(item);
      localStorage.setItem('checkoutItems', JSON.stringify(item));
      localStorage.removeItem('cartItems');
    console.log(item);
    this.router.navigate(['/shop/checkout/success', item.orderId]);
    }

  readOrders(): void {
    const currentUser : User = JSON.parse(localStorage.getItem('currentUser'));
    this.orderService.getAll(currentUser.id)
        .subscribe(
            data => {
              this.order_list = data.body;
                console.log('ordeeeeeeeeeeeer');
                console.log(this.order_list);
            },
            error => {
              console.log(error);
            });
  }


}
