import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, Nav } from 'ionic-angular';
import { TabsPage } from "../tabs/tabs";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  @ViewChild('myNav') nav: NavController

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  done() {
    this.viewCtrl.dismiss();
  }

}
