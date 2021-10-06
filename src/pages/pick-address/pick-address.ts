import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddressDTO } from '../../models/address.dto';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: AddressDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.items = [
      {
        id: "1",
        street: "Rua Jarababa",
        number: "692",
        complement: "Casa com telhas",
        neighborhood: "Jordacity",
        zip: "09298349",
        city: {
            id: "2",
            name: "São Paulo",
            state: {
                id: "2",
                name: "São Paulo"
            }
        }
    },
    {
        id: "2",
        street: "Rua Paveelio",
        number: "963",
        complement: "Portão azul",
        neighborhood: "None",
        zip: "09795321",
        city: {
            id: "2",
            name: "São Paulo",
            state: {
                id: "2",
                name: "São Paulo"
            }
        }
    }
    ]
  }

}
