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

}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

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

    signOut() {
    this.afAuth.auth.signOut();
  }

}
