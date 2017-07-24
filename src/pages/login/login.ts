import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { SignupPage } from "../signup/signup";
import { AngularFireAuth } from 'angularfire2/auth';
import { Facebook } from "@ionic-native/facebook";
import firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus';
import { TabsPage } from "../tabs/tabs";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

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
    public facebook: Facebook,
    public googlePlus: GooglePlus
  ) {
    firebase.auth().onAuthStateChanged( user => {
    if (user){
      this.userProfile = user;
    } else { 
        this.userProfile = null;
    }
  });
  }

  // gpLogin() {
  //    this.googlePlus.login({
  //   'webClientId': '414822187127-9n5ik0q094ji8m3b1urau96njtrjbsa3.apps.googleusercontent.com',
  //   'offline': true
  // }).then( res => {
  //   const googleCredential = firebase.auth.GoogleAuthProvider
  //             .credential(res.idToken);
  //         firebase.auth().signInWithCredential(googleCredential)
  //     .then( success => {
  //       this.navCtrl.setRoot(TabsPage);
  //       alert("Sucess");
  //     })
  //     .catch( error => {
  //       alert("Error");
  //     });
  //   })
  // }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.loginData.email, this.loginData.password, )
      .then(auth => {
        // Do custom things with auth
      })
      .catch(err => {
        let toast = this.toastCtrl.create({
          message: err.message,
          duration: 5000
        });
        toast.present();
        // Handle error
      });

  }

  signup() {
    this.navCtrl.push(SignupPage, { email: this.loginData.email });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  fbLogin() {

    // browser login start
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(() => {
      firebase.auth().getRedirectResult().then((result) => {
        this.facebook.api('me?fields=email', [])
          .then((profile) => {
            this.userData = { email: profile['email'] }
            alert(this.userData.email)
            firebase.database().ref('/userProfile').child(profile.uid)
              .set({ email: this.userData.email })
              alert(JSON.stringify(result));
          }) 
      }).catch(function (error) {
        alert(JSON.stringify(error));
      });
    }); //browser login close

    // //native-login start
    // this.facebook.login(['email', 'public_profile']).then((response) => {
    //   this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
    //     this.userData = { email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name'] }
    //     firebase.database().ref('/userProfile').child(profile.uid)
    //       .set({ email: this.userData.email })
    //     alert("Login sucsessfully!");
    //   });
    // }); //native login close

    // this.facebook.login(['email']).then((loginResponse)=>{
    //   let fc = firebase.auth.FacebookAuthProvider.credential(loginResponse.authResponse.accessToken);

    //   firebase.auth().signInWithCredential(fc).then((info)=>{
    //     alert(JSON.stringify(info));
    //   })
    // })
    
  }  //fbLogin close

}
