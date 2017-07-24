import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ModalController, ViewController } from 'ionic-angular';

@Component({
  template: `
    <ion-list>
      <button ion-item (click)="report()">Report</button>
      <button ion-item (click)="favourite()">Favourite</button>
    </ion-list>
  `
})
export class CardPopoverPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public app: App,
    public modalCtrl: ModalController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardPopoverPage');
  }

  report() {
    // this.app.getRootNav().push('AbtPage');
    this.viewCtrl.dismiss();
  }

  favourite() {
     this.viewCtrl.dismiss();
  }

}
