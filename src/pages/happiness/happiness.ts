import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { DatabaseProvider } from "../../providers/database/database";

@Component({
  selector: 'page-happiness',
  templateUrl: 'happiness.html',
})
export class HappinessPage {
  storyModerator: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private DB: DatabaseProvider, public platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HappinessPage');
  }

  ionViewDidEnter() {
    this.platform.ready()
    .then(()=>{
      this.loadStory();
    })
  }

  loadStory() {
    this.storyModerator = this.DB.renderStory();
  }

}
