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
import { AboutPage } from "../pages/about/about";
import { ProfilepicPage } from "../pages/profilepic/profilepic";
import { SignupPage } from "../pages/signup/signup";

import firebase from 'firebase';

export interface PageInterface {

}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {


  rootPage: any = TabsPage;



  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private afAuth: AngularFireAuth) {

    if (window.localStorage.getItem('authentication') == 'false') {
      this.rootPage = LoginPage;
    }
    else if (window.localStorage.getItem('authentication') == 'true')
    {
      this.rootPage = SignupPage;
    }
    else{
      this.rootPage = TabsPage;
    }
    
// this.afAuth.authState.subscribe(auth => {
//      if (!auth) {
//         this.rootPage = LoginPage;
//       }
//       else {
//           this.rootPage = TabsPage;
//         }
//       }

    // if (window.localStorage.getItem('signup') == null) {
    //   window.localStorage.setItem('signup', 'false');
    // }
    // this.afAuth.authState.subscribe(auth => {
    //   if (!auth) {
    //     this.rootPage = LoginPage;
    //   }
    //   else {
    //     if (window.localStorage.getItem('signup') == 'false') {
    //       this.rootPage = SignupPage;
    //     }
    //     else {
    //       this.rootPage = TabsPage;
    //     }
    //   }
    // }
  // );

    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  about() {
    this.rootPage = AboutPage;
  }

}
