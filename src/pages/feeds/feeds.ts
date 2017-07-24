import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NotificationsPage } from "../notifications/notifications";
import { SearchPage } from "../search/search";
import { AlertController, PopoverController, Popover , App, FabContainer, ItemSliding, List, ModalController, ToastController, LoadingController, Refresher } from 'ionic-angular';
import { CardPopoverPage } from "../card-popover/card-popover";

@Component({
  selector: 'page-feeds',
  templateUrl: 'feeds.html',
})
export class FeedsPage {

  notificationPage = NotificationsPage;
  searchPage = SearchPage;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    // public confData: ConferenceData,
    public popoverCtrl: PopoverController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedsPage');
  }

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(CardPopoverPage);
    popover.present({ ev: event });
  }

  // doRefresh(refresher: Refresher) {
  //   this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
  //     this.shownSessions = data.shownSessions;
  //     this.groups = data.groups;

  //     // simulate a network request that would take longer
  //     // than just pulling from out local json file
  //     setTimeout(() => {
  //       refresher.complete();

  //       const toast = this.toastCtrl.create({
  //         message: 'Sessions have been updated.',
  //         duration: 3000
  //       });
  //       toast.present();
  //     }, 1000);
  //   });
  // }

}
