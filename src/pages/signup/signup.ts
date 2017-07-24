import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupData = {
    email: '',
    password: '',
    passwordRetyped: ''
  };
  error = {
    code: '',
    message: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private afAuth: AngularFireAuth) {
    this.signupData.email = this.navParams.get('email');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup() {
    if (this.signupData.password !== this.signupData.passwordRetyped) {
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: 'Your password and your re-entered password does not match each other.',
        buttons: ['OK']
      });
      alert.present();
      return;
    }
    this.afAuth.auth.createUserWithEmailAndPassword(this.signupData.email, this.signupData.password)
      .then(newUser => {
        // Could do something with the Auth-Response
        firebase.database().ref('/userProfile').child(newUser.uid)
        .set({email: this.signupData.email});
      })
      .catch(err => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          message: err.message,
          buttons: ['OK']
        });
        alert.present();
        // Handle error
      });
  }
    
  // signupUser(email: string, password: string): firebase.Promise<any> {
  //   return firebase.auth().createUserWithEmailAndPassword(email, password)
  //     .then(newUser => {
  //       firebase.database().ref('/userProfile').child(newUser.uid)
  //         .set({ email: email});
  //     });
  // }

}

