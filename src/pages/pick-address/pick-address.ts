import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddressDTO } from '../../models/address.dto';
import { OrderDTO } from '../../models/order.dto';
import { CartService } from '../../services/domain/cart.service';
import { CustomerService } from '../../services/domain/customer.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: AddressDTO[];

  order: OrderDTO;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public storage: StorageService,
     public customerService: CustomerService,
     public cartService: CartService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email) {
      this.customerService.findByEmail(localUser.email)
      .subscribe(response => { 
        this.items = response['address'];

        let cart = this.cartService.getCart();

        this.order = {
          customer: {id: response['id']},
          shipAddress: null,
          payment: null,
          itens : cart.items.map(x => {return {quantity: x.quantity, product: {id: x.product.id}}})
        }
      },
      error => {
        if(error.status == 403) { 
          this.navCtrl.setRoot('HomePage');
        }
      });
    }
    else { 
      this.navCtrl.setRoot('HomePage');
    }
  }

  nextPage(item: AddressDTO) { 
    this.order.shipAddress = {id: item.id};
    console.log(this.order);
  }

}
