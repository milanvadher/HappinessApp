import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Camera } from '@ionic-native/camera';
import { HttpModule } from '@angular/http';
import { Facebook } from "@ionic-native/facebook";

import { FeedsPage } from "../pages/feeds/feeds";
import { UploadPage } from "../pages/upload/upload";
import { HappinessPage } from "../pages/happiness/happiness";
import { ProfilePage } from "../pages/profile/profile";
import { SearchPage } from "../pages/search/search";
import { NotificationsPage } from "../pages/notifications/notifications";
import { LoginPage } from "../pages/login/login";
import { SignupPage } from "../pages/signup/signup";
import { TabsPage } from '../pages/tabs/tabs';
import { CardPopoverPage } from "../pages/card-popover/card-popover";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireModule } from "angularfire2";
import { GooglePlus } from '@ionic-native/google-plus';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ImageProvider } from '../providers/image/image';

var config = {
    apiKey: "AIzaSyAC5irF8UKkq1MCbp-FEfV3RJjuexTaETM",
      authDomain: "signup-6d42c.firebaseapp.com",
      databaseURL: "https://signup-6d42c.firebaseio.com",
      projectId: "signup-6d42c",
      storageBucket: "signup-6d42c.appspot.com",
      messagingSenderId: "414822187127"
  };

@NgModule({
  declarations: [
    MyApp,
    FeedsPage,
    UploadPage,
    HappinessPage,
    ProfilePage,
    TabsPage,
    NotificationsPage,
    SearchPage,
    CardPopoverPage,
    LoginPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FeedsPage,
    UploadPage,
    HappinessPage,
    ProfilePage,
    TabsPage,
    NotificationsPage,
    SearchPage,
    CardPopoverPage,
    LoginPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Facebook,
    GooglePlus,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ImageProvider
  ]
})
export class AppModule {}
