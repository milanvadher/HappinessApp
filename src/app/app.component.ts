import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FeedsPage } from "../pages/feeds/feeds";
import { HappinessPage } from "../pages/happiness/happiness";
import { ProfilePage } from "../pages/profile/profile";
import { UploadPage } from "../pages/upload/upload";
import { TabsPage } from '../pages/tabs/tabs';
import { AngularFireAuth } from "angularfire2/auth";
import { LoginPage } from "../pages/login/login";

import firebase from 'firebase';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

      appPages: PageInterface[] = [
    { title: 'Feeds', name: 'TabsPage', component: TabsPage, tabComponent: FeedsPage, index: 0, icon: 'md-paper' },
    { title: 'Upload', name: 'TabsPage', component: TabsPage, tabComponent: UploadPage, index: 1, icon: 'md-cloud-upload' },
    { title: 'Happiness', name: 'TabsPage', component: TabsPage, tabComponent: HappinessPage, index: 2, icon: 'md-happy' },
    { title: 'Profile', name: 'TabsPage', component: TabsPage, tabComponent: ProfilePage, index: 3, icon: 'md-contact' }
    // { title: 'Account', name: 'AccountPage', component: AccountPage, icon: 'person' },
    // { title: 'Feedback', name: 'SupportPage', component: SupportPage, icon: 'help' },
    // { title: 'Logout', name: 'TabsPage', component: TabsPage, icon: 'log-out', logsOut: true }
  ];

   rootPage:any = TabsPage;
 
  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private afAuth: AngularFireAuth) {

    // firebase.initializeApp({
    //   apiKey: "AIzaSyAC5irF8UKkq1MCbp-FEfV3RJjuexTaETM",
    //   authDomain: "signup-6d42c.firebaseapp.com",
    //   databaseURL: "https://signup-6d42c.firebaseio.com",
    //   projectId: "signup-6d42c",
    //   storageBucket: "signup-6d42c.appspot.com",
    //   messagingSenderId: "414822187127"
    // });

     this.afAuth.authState.subscribe(auth => {
      if(!auth)
        this.rootPage = LoginPage;
      else
        this.rootPage = TabsPage;
    });

    // const unsubscribe = firebase.auth().onAuthStateChanged((user: string) => {
    //   if (!user) {
    //     this.rootPage = LoginPage;
    //     unsubscribe();
    //   } else {
    //     this.rootPage = TabsPage;
    //     unsubscribe();
    //   }
    // });

    platform.ready().then(() => {
      
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  openPage(page: PageInterface) {
    let params = {};

    if (page.index) {
      params = { tabIndex: page.index };
    }

    if (this.nav.getActiveChildNav() && page.index != undefined) {
      this.nav.getActiveChildNav().select(page.index);

    } else {
      this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNav();

    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }

    signOut() {
    this.afAuth.auth.signOut();
  }

}
