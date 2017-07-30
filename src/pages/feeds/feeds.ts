import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { NotificationsPage } from "../notifications/notifications";
import { SearchPage } from "../search/search";
import { AlertController, PopoverController, Popover , App, FabContainer, ItemSliding, List, ModalController, ToastController, LoadingController, Refresher } from 'ionic-angular';
import { CardPopoverPage } from "../card-popover/card-popover";
import { DatabaseProvider } from "../../providers/database/database";

@Component({
  selector: 'page-feeds',
  templateUrl: 'feeds.html',
})
export class FeedsPage {
  userFeeds: any;



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
    public popoverCtrl: PopoverController,
    public platform: Platform,
    private DB: DatabaseProvider
  ) {
  }



  ionViewDidLoad() {

    this.platform.ready()
    .then(()=>{
      this.loadFeeds();
    });

    console.log('ionViewDidLoad FeedsPage');
  }

  loadFeeds() {
    this.userFeeds = this.DB.renderFeeds();
    console.log(this.DB.renderFeeds());
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
