import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { SignupPage } from "../signup/signup";
import { AngularFireAuth } from 'angularfire2/auth';
// import { Facebook } from "@ionic-native/facebook";
import firebase from 'firebase';
// import { GooglePlus } from '@ionic-native/google-plus';
import { TabsPage } from "../tabs/tabs";
// import { FacebookService } from "ngx-facebook";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loading: Loading;

  // public recaptchaVerifier: firebase.auth.RecaptchaVerifier;


  loginData = {
    email: '',
    password: ''
  }
  userData: any;
  userProfile: any = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private toastCtrl: ToastController,
    public alertCtrl: AlertController
    // public facebook: Facebook,
    // public googlePlus: GooglePlus,
    // public fb: FacebookService
  ) {

    if (window.localStorage.getItem('authentication') == null) {
      window.localStorage.setItem('authentication', 'false');
    }



    // firebase.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     this.userProfile = user;
    //   } else {
    //     this.userProfile = null;
    //   }
    // });
  }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.loginData.email, this.loginData.password)
      .then(auth => {
        // Do custom things with auth
      })
      .catch(err => {
        // Handle error
        let toast = this.toastCtrl.create({
          message: err.message,
          duration: 1000
        });
        toast.present();
      });
  }


  // signIn(phoneNumber: number){

  //   const appVerifier = this.recaptchaVerifier;
  //   const phoneNumberString = '+91' + phoneNumber;

  //   firebase.auth().signInWithPhoneNumber(phoneNumberString,appVerifier)
  //   .then(confirmationResult =>{
  //       let prompt = this.alertCtrl.create({
  //           title: 'Enter the code',
  //           inputs: [{name: 'confirmationCode', placeholder: 'Confirmation Code'}],
  //           buttons: [
  //               {
  //                   text: 'Cancel',
  //                   handler: data => {
  //                       alert("Cancel clicked");
  //                   }
  //               },
  //               {
  //                   text: 'Send',
  //                   handler: data => {
  //                       confirmationResult.confirm(data.confirmationCode)
  //                       .then(()=>{
  //                           this.navCtrl.push(SignupPage);
  //                       }).catch((err)=>{
  //                           alert("error: "+ JSON.stringify(err));
  //                       })
  //                   }
  //               }

  //           ]
  //       })
  //         prompt.present();
  //   }).catch(err=>{
  //       alert("SMS not send Pleasse try again ...");
  //   })

  // }



  // signIn(phoneNumber: number) {

  //   const appVerifier = this.recaptchaVerifier;
  //   const phoneNumberString = "+91" + phoneNumber;

  //   firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
  //     .then(confirmationResult => {
  //       let prompt = this.alertCtrl.create({
  //         title: 'Enter the Confirmation code',
  //         inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
  //         buttons: [
  //           {
  //             text: 'Cancel',
  //             handler: data => { console.log('Cancel clicked'); }
  //           },
  //           {
  //             text: 'Send',
  //             handler: data => {
  //               confirmationResult.confirm(data.confirmationCode)
  //                 // .then(function (result) {
  //                 //   this.navigate();
  //                 // })

  //                 .then(() => {
  //                   window.localStorage.setItem('signup','false')
  //                 })

  //                 .catch(function (error) {
  //                   // User couldn't sign in (bad verification code?)
  //                   // ...
  //                 });
  //             }
  //           }
  //         ]
  //       });
  //       prompt.present();
  //     })
  //     .catch(function (error) {
  //       console.error("SMS not sent", error);
  //     });


  // }

  navigate() {
    this.navCtrl.setRoot(SignupPage);
  }

  // gpLogin(): void {

  //   let provider = new firebase.auth.GoogleAuthProvider();
  //   firebase.auth().signInWithRedirect(provider)
  //   .then((succ)=>{
  //     alert("Login success !");
  //   })
  //     .catch((err => {
  //       alert("error: " + JSON.stringify(err));
  //     })).catch((err => {
  //       alert("error:" + JSON.stringify(err));
  //     })).catch((err) => {
  //       alert("some error:" + JSON.stringify(err));
  //     })
  // }

  signup() {
    this.navCtrl.push(SignupPage, { email: this.loginData.email });
  }

  ionViewDidLoad() {
    // this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    console.log('ionViewDidLoad LoginPage');
  }

  // fbLogin() {
  //   let provider = new firebase.auth.FacebookAuthProvider();
  //   firebase.auth().signInWithRedirect(provider).then(() => {
  //     firebase.auth().getRedirectResult().then((result) => {
  //       this.fb.api('/me')
  //       .then((res: any)=>{
  //         alert(res);
  //       }).catch(err=>{
  //         alert("error:"+ JSON.stringify(err));
  //       })
  //     }).catch(function (error) {
  //       alert(JSON.stringify(error));
  //     });
  //   });
  // }  //fbLogin close

}
