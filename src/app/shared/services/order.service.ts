import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {User} from '../models/user';
import {ProductEntity} from '../classes/product.entity';
import {Product} from '../classes/product';
import {OrderEntity} from '../classes/order.entity';
import {newArray} from '@angular/compiler/src/util';
import {Order} from '../classes/order';

const state = {
  checkoutItems: JSON.parse(localStorage.checkoutItems || '[]')
};
type EntityResponseType = HttpResponse<Order>;

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private router: Router, private http: HttpClient) { }
  public resourceUrl = 'http://localhost:8089/api/ordersUser';

  // Get Checkout Items
  public get checkoutItems(): Observable<any> {
    const itemsStream = new Observable(observer => {
      observer.next(state.checkoutItems);
      observer.complete();
    });
    return itemsStream as Observable<any>;
  }
  public rihem(item: any){
    state.checkoutItems = item;

  }

  // Create order
  public createOrder(product: any, details: any, orderId: any, amount: any) {
    console.log('hajjsahzauh');
    console.log(product);
    const productsEntity : ProductEntity[] = JSON.parse(localStorage.getItem('productsEntity'));
    let selectedIds : number[] = new Array();
    let selectedProductsEntity : ProductEntity[] = new Array();
    let total : number = 0;
    // let created : Date = new Date();
    const products : Product[] = JSON.parse(localStorage.getItem('cartItems'));
    for (let i = 0; i< products.length; i++){
      for (let j = 0; j< products[i].quantity; j++){
        console.log((products[i].id));
        selectedIds.push(products[i].id);
        selectedProductsEntity.push(productsEntity.find(x => x.id === products[i].id));
        total= total + products[i].price;

      }
    }

    // const selectedIds = products.map(({ id }) => id);
    // const selectedProductsEntity = productsEntity.filter((p: ProductEntity) => selectedIds.includes(p.id));
    const currentUser : User = JSON.parse(localStorage.getItem('currentUser'));

    // const order: OrderEntity = {
    //   // panier: OrderEntity.fromProduct(currentUser, selectedProductsEntity),
    //   user : currentUser,
    //   id : orderId,
    //   totalAmount: total
    // };
    const order : OrderEntity = OrderEntity.fromOrder(selectedProductsEntity, currentUser);
    return this.http
        .post<any>('http://localhost:8089/api/orders', order).subscribe(data => {
          console.log(data.id);
          const id = data.id;
          const date = data.created;
          const item = {
            shippingDetails: details,
            product,
            orderId : id,
            totalAmount: total,
            orderDate : date,
            detail: false,
          };
    state.checkoutItems = item;
    localStorage.setItem('checkoutItems', JSON.stringify(item));
    localStorage.removeItem('cartItems');
    this.router.navigate(['/shop/checkout/success', orderId]);
  });
  }

  // Get orders

  getAll(id: number): Observable<HttpResponse<OrderEntity[]>>{
   return  this.http.get<OrderEntity[]>(`${this.resourceUrl}/${id}`, { observe: 'response' });

  }

}
