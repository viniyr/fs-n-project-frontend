import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddressDTO } from '../../models/address.dto';
import { CartItem } from '../../models/cart-item';
import { CustomerDTO } from '../../models/customer.dto';
import { OrderDTO } from '../../models/order.dto';
import { CartService } from '../../services/domain/cart.service';
import { CustomerService } from '../../services/domain/customer.service';
import { OrderService } from '../../services/domain/order.service';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  order: OrderDTO;
  cartItems: CartItem[];
  customer: CustomerDTO;
  address: AddressDTO;
  codorder: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public customerService: CustomerService,
    public orderService: OrderService) {

    this.order = this.navParams.get('order');
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;

    this.customerService.findById(this.order.customer.id)
    .subscribe(response => { 
      this.customer = response as CustomerDTO;
      this.address = this.findAddress(this.order.shipAddress.id, response['address']);
    },
    error => {
      this.navCtrl.setRoot('HomePage');
  });
}

  private findAddress(id: string,list: AddressDTO[]) : AddressDTO{
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  total() : number {
    return this.cartService.total();
  }

  back() {
    this.navCtrl.setRoot('CartPage');
  }

  home() {
    this.navCtrl.setRoot('CategoriesPage');
  }

  checkout() { 
    this.orderService.insert(this.order)
    .subscribe(response=>{
      this.cartService.createOrClearCart();
      this.codorder = this.extractId(response.headers.get('location'));
    },
    error=>{
      if (error.status == 403) { 
        this.navCtrl.setRoot('HomePage');
      }
    });
  }

  private extractId(location : string) : string {
    let position = location.lastIndexOf('/');
    return location.substring(position + 1, location.length);
  }

}
