import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { ProfilepicPage } from "../profilepic/profilepic";
import { ProfileProvider } from "../../providers/profile/profile";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  public userProfile: firebase.database.Reference;
  public currentUser: firebase.User;

  signupData = {
    email: '',
    password: '',
    passwordRetyped: '',
    firstname: '',
    lastname: '',
    mobile: '',
    gender: ''
  };
  error = {
    code: '',
    message: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private afAuth: AngularFireAuth, public profileProvider: ProfileProvider) {
    // this.signupData.email = this.navParams.get('email');
    // firebase.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     this.currentUser = user;
    //     this.userProfile = firebase.database().ref(`/userProfile/${user.uid}/profileData`);
    //   }
    // });


  }

  // getUserProfile(): firebase.database.Reference {
  //   return this.userProfile;
  // }

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
    // this.userProfile = this.profileProvider.getUserProfile()
    // console.log(this.userProfile);

    this.afAuth.auth.createUserWithEmailAndPassword(this.signupData.email, this.signupData.password)
      .then(newUser => {
        // Could do something with the Auth-Response
        firebase.database().ref('/userProfile/').child(newUser.uid).child('/userData/')
        .set({
            email: this.signupData.email,
            firstname: this.signupData.firstname,
            lastname: this.signupData.lastname,
            mobile: this.signupData.mobile,
            gender: this.signupData.gender
          }).then(() => {
            window.localStorage.setItem('signup', 'true');
            window.location.reload();
            // this.navCtrl.setRoot(ProfilepicPage);
          })
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

