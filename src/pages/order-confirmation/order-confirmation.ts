import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddressDTO } from '../../models/address.dto';
import { CartItem } from '../../models/cart-item';
import { CustomerDTO } from '../../models/customer.dto';
import { OrderDTO } from '../../models/order.dto';
import { CartService } from '../../services/domain/cart.service';
import { CustomerService } from '../../services/domain/customer.service';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public customerService: CustomerService) {

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

  total() {
    return this.cartService.total();
  }

}
